from http import HTTPStatus
from flask import Blueprint, request, session
from flask_cors import CORS
from app.cliente.models import crear_cliente, get_clientes, eliminar_cliente, modificar_cliente, obtener_cliente
import copy

RESPONSE_BODY_DEFAULT = {"message": "", "data": [], "errors": []}
cliente = Blueprint("cliente", __name__, url_prefix="/cliente")

@cliente.route("/", methods=["GET"])
def index():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK
    clientes = get_clientes()
    response_body["message"] = "Clientes consultados correctamente"
    response_body["data"] = clientes
    return response_body, status_code

@cliente.route("/obtenerUsuario", methods = ["POST"])
def consultar():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK
    cli_v_usuario = request.json["usuario"]
    cli_v_contrasena = request.json["contrasena"]
    if cli_v_usuario != "" and cli_v_usuario != None :
        if cli_v_contrasena != "" and cli_v_contrasena != None :
            cliente = obtener_cliente(cli_v_usuario, cli_v_contrasena)
            if cliente != None:
                response_body["message"] = "Credenciales correctas!"
                response_body["data"] = cliente
                session["username"] = cli_v_usuario
            else:
                response_body["errors"].append("Credenciales incorrectas")
                status_code = HTTPStatus.BAD_REQUEST
        else:
            response_body["errors"].append("Contraseña vacía")
            status_code = HTTPStatus.BAD_REQUEST
    else:
        response_body["errors"].append("Usuario vacío")
        status_code = HTTPStatus.BAD_REQUEST
    return response_body, status_code


@cliente.route("/crear", methods=["POST"])
def crear():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK
    cli_v_usuario = request.json["usuario"]
    cli_v_contrasena = request.json["contrasena"]
    r_contrasena = request.json["r_contrasena"]

    if cli_v_usuario != "" and cli_v_usuario != None :
        if cli_v_contrasena != "" and cli_v_contrasena != None :
            if r_contrasena != cli_v_contrasena :
                response_body["errors"].append("Las contraseñas no coinciden")
                status_code = HTTPStatus.BAD_REQUEST
        
            cliente = crear_cliente(cli_v_usuario, cli_v_contrasena)
            if cliente != None:
                response_body["message"] = "Cliente creado correctamente!"
                response_body["data"] = cliente
                session["username"] = cli_v_usuario

            else:
                response_body["errors"].append("Usuario repetido")
                status_code = HTTPStatus.BAD_REQUEST
        else:
            response_body["errors"].append("Contraseña vacía")
            status_code = HTTPStatus.BAD_REQUEST
    else:
        response_body["errors"].append("Usuario vacío")
        status_code = HTTPStatus.BAD_REQUEST

    return response_body, status_code

@cliente.route("/modificar", methods=["PUT"])
def modificar():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK

    cli_v_usuario = request.json["cli_v_usuario"]
    cli_v_contrasena = request.json["cli_v_contrasena"]
    cli_i_puntaje = request.json["cli_i_puntaje"]

    if cli_v_usuario != "" and cli_v_usuario != None: 
        if  cli_v_contrasena != "" and cli_v_contrasena != None: 
            if cli_i_puntaje != "" and cli_i_puntaje != None: 
                cliente_mod = modificar_cliente(cli_v_usuario, cli_v_contrasena, cli_i_puntaje)
                if cliente_mod != None:
                    response_body["message"] = "Cliente modificado correctamente!"
                    response_body["data"] = cliente_mod
                else:
                    response_body["message"] = "No se encontro el cliente"
                    response_body["errors"].append("No se encontro el cliente")
                    status_code = HTTPStatus.BAD_REQUEST
            else:
                response_body["message"] = "Debe ingresar un puntaje"
                response_body["errors"].append("Debe ingresar un puntaje")
                status_code = HTTPStatus.BAD_REQUEST
        else:
            response_body["message"] = "Debe ingresar una contraseña"
            response_body["errors"].append("Debe ingresar una contraseña")
            status_code = HTTPStatus.BAD_REQUEST
    else:
        response_body["message"] = "Debe ingresar un usuario"
        response_body["errors"].append("Debe ingresar un usuario")
        status_code = HTTPStatus.BAD_REQUEST

    return response_body, status_code

@cliente.route("/eliminar", methods=["DELETE"])
def eliminar():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK
    
    cli_v_usuario = request.json["cli_v_usuario"]

    if cli_v_usuario != None and cli_v_usuario != "":
        if eliminar_cliente(cli_v_usuario):
            response_body["message"] = "Cliente eliminado correctamente!"
        else:
            response_body["message"] = "Error no se encuentra el cliente"
            response_body["errors"].append("Error no se encuentra el cliente")
            status_code = HTTPStatus.BAD_REQUEST
    else:
        response_body["message"] = "Debe ingresar un usuario"
        response_body["errors"].append("Debe ingresar un usuario")
        status_code = HTTPStatus.BAD_REQUEST

    return response_body, status_code
