from app.db import db, ma
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class Cliente(db.Model):
    cli_v_usuario = db.Column(db.String(50), primary_key=True)
    cli_v_contrasena = db.Column(db.String(50), nullable=False)
    cli_i_puntaje = db.Column(db.Integer, nullable=True)

class Puntaje(db.Model):
    pun_i_id = db.Column(db.Integer, primary_key=True)
    pun_i_puntaje = db.Column(db.Integer, nullable=True)
    pun_v_cli_usuario = db.Column(db.String(50), db.ForeignKey('cliente.cli_v_usuario'))
    pun_d_date_created = db.Column(db.DateTime, default=datetime.now())

class ClienteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cliente
        fields = ["cli_v_usuario", "cli_v_contrasena", "cli_i_puntaje"]


class PuntajeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Puntaje
        fields = ["pun_i_id", "pun_i_puntaje", "pun_v_cli_usuario", "pun_d_date_created"]


def get_clientes():
    clientes = Cliente.query.all()
    cliente_schema = ClienteSchema()
    clientes = [cliente_schema.dump(cliente) for cliente in clientes]
    return clientes

def obtener_cliente(usuario, contrasena):
    cliente = Cliente.query.filter_by(cli_v_usuario=usuario).first()
    if cliente != None:
        if not check_password_hash(cliente.cli_v_contrasena, contrasena):
            return None
        cliente_schema = ClienteSchema()
        return cliente_schema.dump(cliente)
    return None

def crear_cliente(usuario,contrasena):
    try:
        cliente = Cliente( cli_v_usuario=usuario,cli_v_contrasena= generate_password_hash(contrasena, method="sha256"))
        db.session.add(cliente)
        db.session.commit()
        cliente_schema = ClienteSchema()
        return cliente_schema.dump(cliente)
    except:
        return None


def eliminar_cliente(usuario):
    cliente = Cliente.query.filter_by(cli_v_usuario=usuario).first()
    if cliente != None:
        Cliente.query.filter_by(cli_v_usuario=usuario).delete()
        db.session.commit()
        return True
    else:
        return False


def modificar_cliente(usuario, contrasena, puntaje):
    cliente = Cliente.query.filter_by(cli_v_usuario=usuario).first()
    if cliente != None:
        cliente.cli_v_contrasena = contrasena
        cliente.cli_i_puntaje = puntaje
        db.session.commit()
        cliente_schema = ClienteSchema()
        return cliente_schema.dump(cliente)
    return None


def obtener_cliente_usuario(usuario):
    cliente = Cliente.query.filter_by(
            cli_v_usuario=usuario
        ).first()
    return cliente

def agregar_puntaje(puntaje,cliente):

    puntaje_bd = Puntaje(pun_i_puntaje=puntaje,pun_v_cli_usuario= cliente)
    cliente = Cliente.query.filter_by(cli_v_usuario=cliente).first()

    if(cliente.cli_i_puntaje is None or cliente.cli_i_puntaje < puntaje):
        cliente.cli_i_puntaje = puntaje
        db.session.add(cliente)
    db.session.add(puntaje_bd)
    db.session.commit()
    puntaje_schema = PuntajeSchema()
    return puntaje_schema.dump(puntaje_bd)


def mis_puntajes(cliente):
    puntajes = Puntaje.query.filter_by(pun_v_cli_usuario=cliente).order_by(Puntaje.pun_i_puntaje.desc()).limit(10).all()
    puntaje_schema = PuntajeSchema()
    puntajes = [puntaje_schema.dump(puntaje) for puntaje in puntajes]
    return puntajes

def ranking():
    rs = db.engine.execute('SELECT cli_v_usuario,cli_i_puntaje FROM cliente WHERE cli_i_puntaje > 0 order by cli_i_puntaje desc')
    cliente_schema = ClienteSchema()
    clientes = [cliente_schema.dump(row) for row in rs]
    return clientes

