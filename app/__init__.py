from flask import Flask, redirect,url_for
from app.cliente.views import cliente
from app.cliente.models import Cliente
from app.db import db, ma
from flask_migrate import Migrate
from conf.config import DevelpmentConfig
from app.juego.views import juego
from flask_cors import CORS

SERVICIOS = [('/cliente', cliente),('/', juego)]

def create_app(config=DevelpmentConfig):
    app = Flask(__name__)
    migrate = Migrate(app, db)
    app.config.from_object(config)
    CORS(app)
    app.secret_key = 'm26QLWq2Bd4UIX84'



    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)


    @app.route("/test", methods=["POST"])
    def test():
        data = {"nombre":"hola"}
        return data


    with app.app_context():
        db.create_all()


    for url, blueprint in SERVICIOS:
        app.register_blueprint(blueprint, url_prefix=url)

    @app.template_filter("format_date")
    def formato_fecha(fecha):
        return fecha[0:10]

    @app.template_filter("format_hour")
    def formato_fecha_hora(fecha):
        return fecha[11:16]

    return app

if __name__ == "__main__":
    app_flask = create_app()
    app_flask.run()
