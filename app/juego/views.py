from http import HTTPStatus
from flask import Blueprint, request, render_template, session, redirect, url_for
from app.cliente.models import ranking,agregar_puntaje, mis_puntajes
import copy
RESPONSE_BODY_DEFAULT = {"message": "", "data": [], "errors": []}

juego = Blueprint("juego", __name__, url_prefix="/")


@juego.route("/", methods=["GET"])
def index():
    ranking_p = ranking()
    return render_template('welcome.html', ranking=ranking_p)



@juego.route("/menu", methods=["GET"])
def menu():
    return render_template('menu.html')

@juego.route("/maximos-puntajes", methods=["GET"])
def maximos_puntajes():

    puntajes = mis_puntajes(session['username'])



    return render_template('maximosPuntajes.html', puntajes=puntajes)



@juego.route("/jugar", methods=["GET"])
def jugar():
    return render_template('game.html')


@juego.route("/agregar_puntajes", methods=["POST"])
def agregar_puntajes():
    response_body = copy.deepcopy(RESPONSE_BODY_DEFAULT)
    status_code = HTTPStatus.OK


    puntaje = agregar_puntaje(request.json["puntaje"], session['username'])

    response_body["message"] = "Puntaje actualizado correctamente"
    response_body["data"] = puntaje

    return response_body, status_code




@juego.route("/salir", methods=["GET"])
def salir():
    session.pop('username', None)
    return redirect(url_for('juego.index'))
