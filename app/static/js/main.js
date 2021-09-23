let ctx, width, height, ultimo_tiempo, delta, segundos;

let imgs = [];

let niveles = [];
let nivel_actual;
let puntaje;
let vidas;
let carros_actuales = [];
let bicis_actuales = [];

let jugador;
let estado_juego;

let colision_obj = [];
let intervalo;

const init = () => {
	const canvas = document.getElementById("main");
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");
        ctx.font = "35px Audiowide";

		width = canvas.width;
		height = canvas.height;
		ultimo_tiempo = new Date().getTime();
        segundos = 0;
        imgs = [];
		imgs.push(
			document.getElementById("img_arbol"),       //0
			document.getElementById("img_carretera"),   //1
            document.getElementById("img_camion"),      //2
			document.getElementById("img_carro1"),      //3
			document.getElementById("img_carro2"),      //4
			document.getElementById("img_carro3"),      //5
			document.getElementById("img_carro4"),      //6
			document.getElementById("img_pasto"),       //7
			document.getElementById("img_rana_duerme"), //8
			document.getElementById("img_piedra"),      //9
			document.getElementById("img_puente"),      //10
			document.getElementById("img_rios"),        //11
			document.getElementById("img_salida"),      //12
            document.getElementById("img_jugador1"),    //13
            document.getElementById("img_jugador2"),    //14
            document.getElementById("img_jugador3"),    //15
            document.getElementById("img_jugador4"),    //16
            document.getElementById("img_bici1"),       //17
            document.getElementById("img_bici2"),       //18
            document.getElementById("img_bici3"),       //19
            document.getElementById("img_vidas"),       //20
            document.getElementById("img_reloj"),       //21
            document.getElementById("img_pop"),         //22
            document.getElementById("img_pop_final")    //23

		);


        colision_obj[2] = {width: 194, height: 64, padding_x: 4, padding_y: 20};
        colision_obj[3] = {width: 94, height: 44, padding_x: 3, padding_y: 27};
        colision_obj[4] = {width: 94, height: 47, padding_x: 3, padding_y: 27};
        colision_obj[5] = {width: 94, height: 41, padding_x: 3, padding_y: 30};
        colision_obj[6] = {width: 82, height: 46, padding_x: 9, padding_y: 27};



        colision_obj[17] = {width: 100, height: 50, padding_x: 0, padding_y: 24};
        colision_obj[18] = {width: 61, height: 63, padding_x: 24, padding_y: 24};
        colision_obj[19] = {width: 54, height: 44, padding_x: 25, padding_y: 40};



        nivel_actual = 0;
        niveles = [];
        niveles.push(
            {
            matriz_imgs: [
                [12,8,8,12,8,12,8,12,8,8],
                [11,11,11,11,11,11,11,11,11,11],
                [9,9,9,9,9,9,9,9,9,9],
                [7,7,7,7,7,7,7,7,7,7],
                [1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1],
                [7,7,7,7,7,7,7,7,7,7],
                [9,9,9,9,9,9,9,9,9,9],
                [11,11,11,11,11,11,11,11,11,11],
                [12,12,12,12,12,12,12,12,12,12]
            ],
            matriz_bloqueos: [
                [false,true,true,false,true,false,true,false,true,true],
                [false,true,true,false,true,false,true,false,true,true],
                [false,false,false,false,false,false,false,false,false,false],
                [true,false,true,false,true,false,false,true,false,true],
                [false,false,false,false,false,false,false,false,false,false],
                [false,false,false,false,false,false,false,false,false,false],
                [true,true,false,false,false,false,false,true,false,true],
                [false,false,false,false,false,false,false,false,false,false],
                [true,false,true,true,true,true,true,true,false,true],
                [false,false,false,false,false,false,false,false,false,false]
            ],
            matriz_objetos_img: [
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [10,-1,-1,10,-1,10,-1,10,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [0,-1,0,-1,0,-1,-1,0,-1,0],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [0,0,-1,-1,-1,-1,-1,0,-1,0],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,10,-1,-1,-1,-1,-1,-1,10,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
            ],
            dict_carros: {
                filas: [4,5], velocidad_min: 5, velocidad_max: 11
            },
            dict_bici: {
                filas: [2,7], velocidad_min: 3, velocidad_max: 7
            }
            },
            {
                matriz_imgs: [
                    [12,8,8,12,8,12,8,12,8,8],
                    [11,11,11,11,11,11,11,11,11,11],
                    [1,1,1,1,1,1,1,1,1,1],
                    [7,7,7,7,7,7,7,7,7,7],
                    [9,9,9,9,9,9,9,9,9,9],
                    [9,9,9,9,9,9,9,9,9,9],
                    [7,7,7,7,7,7,7,7,7,7],
                    [1,1,1,1,1,1,1,1,1,1],
                    [11,11,11,11,11,11,11,11,11,11],
                    [12,12,12,12,12,12,12,12,12,12]
                ],
                matriz_bloqueos: [
                    [false,true,true,false,true,false,true,false,true,true],
                    [true,false,true,false,true,false,true,true,true,false],
                    [false,false,false,false,false,false,false,false,false,false],
                    [false,false,false,false,true,true,true,false,false,false],
                    [false,false,false,false,false,false,false,false,false,false],
                    [false,false,false,false,false,false,false,false,false,false],
                    [true,true,false,false,true,true,false,false,true,true],
                    [false,false,false,false,false,false,false,false,false,false],
                    [true,false,true,true,true,true,true,true,false,true],
                    [false,false,false,false,false,false,false,false,false,false]
                ],
                matriz_objetos_img: [
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,10,-1,10,-1,10,-1,-1,-1,10],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,0,0,0,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [0,0,-1,-1,0,0,-1,-1,0,0],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                    [-1,10,-1,-1,-1,-1,-1,-1,10,-1],
                    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
                ],
                dict_carros: {
                    filas: [2,7], velocidad_min: 5, velocidad_max: 11
                },
                dict_bici: {
                    filas: [4,5], velocidad_min: 3, velocidad_max: 7
                }
            },
            {
                matriz_imgs: [
                    [12, 8, 8, 12, 8, 12, 8, 12, 8, 8],
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
                    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
                    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
                    [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
                ],
                matriz_bloqueos: [
                    [false, true, true, false, true, false, true, false, true, true],
                    [false, false, false, false, false, false, false, false, false, false],
                    [true, false, true, true, false, false, true, false, true, true],
                    [false, false, false, false, false, false, false, false, false, false],
                    [false, true, false, false, true, true, false, true, false, false],
                    [false, false, false, false, false, false, false, false, false, false],
                    [false, true, false, false, true, false, true, true, false, false],
                    [false, false, false, false, false, false, false, false, false, false],
                    [true, false, true, true, true, true, true, true, false, true],
                    [false, false, false, false, false, false, false, false, false, false]
                ],
                matriz_objetos_img: [
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, 10, -1, -1, 10, 10, -1, 10, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, 0, -1, -1, 0, 0, -1, 0, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, 0, -1, -1, 0, -1, 0, 0, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, 10, -1, -1, -1, -1, -1, -1, 10, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
                ],
                dict_carros: {
                    filas: [3, 5], velocidad_min: 5, velocidad_max: 11
                },
                dict_bici: {
                    filas: [1, 7], velocidad_min: 3, velocidad_max: 7
                }
            });


        jugador = {
            puntaje: 0,
            img: 13,
            pos_matriz: {
                x: 0, y: 9
            },
            pos_graf: {
                x: 0, y: (width / 10)*9
            },
            colision: {width: 50, height: 55, padding_x: 28, padding_y: 24},
            moviendose: false,
            hacia: null,
            velocidad: 5,
            vidas: 3
        };

        estado_juego = 1;

        carros_actuales = [];
        bicis_actuales = [];
        delta = 0;




        document.addEventListener('keydown', mover_rana);
        intervalo = setInterval(actualizar, 10);

	}
};

const actualizar = () => {
    delta++;
    ctx.clearRect(0, 0, width, height);
    dibujar_fondo();
    if(estado_juego == 1){
        actualizar_pos_carros();
        actualizar_pos_bicis();
        actualizar_pos_jugador();
        verificar_colision();
        verificar_meta();
    }
    dibujar_jugador();
    dibujar_carros();
    dibujar_bicis();
    if(estado_juego == 2){
        dibujar_pop();
    }
    if(estado_juego == 3){
        dibujar_pop_gano();
    }



}

const actualizar_pos_jugador = () => {
    if(jugador.moviendose){
        let tam = (width/10);
        let x_estimado = jugador.pos_matriz.x * tam;
        let y_estimado = jugador.pos_matriz.y * tam;
        if(jugador.img<=14){
            jugador.img = 15;
        }




        if(jugador.hacia == "izq"){
            jugador.pos_graf.x -= jugador.velocidad;
            if(jugador.pos_graf.x < x_estimado){
                jugador.pos_graf.x = x_estimado;
                jugador.moviendose = false;
            }
        }
        if(jugador.hacia == "der"){
            jugador.pos_graf.x += jugador.velocidad;
            if(jugador.pos_graf.x > x_estimado){
                jugador.pos_graf.x = x_estimado;
                jugador.moviendose = false;
            }
        }
        if(jugador.hacia == "arriba"){
            jugador.pos_graf.y -= jugador.velocidad;
            if(jugador.pos_graf.y < y_estimado){
                jugador.pos_graf.y = y_estimado;
                jugador.moviendose = false;
            }
        }
        if(jugador.hacia == "abajo"){
            jugador.pos_graf.y += jugador.velocidad;
            if(jugador.pos_graf.y > y_estimado){
                jugador.pos_graf.y = y_estimado;
                jugador.moviendose = false;
            }
        }



        if(jugador.pos_graf.x < 0){
            jugador.pos_graf.x = 0;
            jugador.moviendose = false;
        }
        if(jugador.pos_graf.y < 0){
            jugador.pos_graf.y = 0;
            jugador.moviendose = false;
        }
        if(jugador.pos_graf.x > ((width / 10)*9)){
            jugador.pos_graf.x = ((width / 10)*9);
            jugador.moviendose = false;
        }

        if(jugador.pos_graf.y > ((width / 10)*9)){
            jugador.pos_graf.y = ((width / 10)*9);
            jugador.moviendose = false;
        }

    }
    else{
        if(delta % 23 == 0){
            jugador.img = (jugador.img == 13 ? 14 : 13);
        }
    }
}

const actualizar_pos_carros = () => {
    for (let i = 0; i < niveles[nivel_actual].dict_carros.filas.length; i++) {
        const filaCarro = niveles[nivel_actual].dict_carros.filas[i];
        let agregar_carro = true;

        for (let j = 0; j < carros_actuales.length; j++) {
            if(carros_actuales[j].fila == filaCarro){
                carros_actuales[j].pos_x -= carros_actuales[j].velocidad;

                if(carros_actuales[j].pos_x < ((width/10)*-1)  && carros_actuales[j].img != 2 ||
                    carros_actuales[j].pos_x < ((width/10)*-2)  && carros_actuales[j].img == 2
                ){
                    carros_actuales.splice(j, 1);
                }
                else{
                    agregar_carro = false;
                }
            }
        }
        if(agregar_carro){
            carros_actuales.push({
                pos_x: (width/10) + width,
                img: getRandomInt(2,7),
                fila: filaCarro,
                velocidad: getRandom(niveles[nivel_actual].dict_carros.velocidad_min,niveles[nivel_actual].dict_carros.velocidad_max)
            });
        }
    }
}

const actualizar_pos_bicis = () => {

    for (let i = 0; i < niveles[nivel_actual].dict_bici.filas.length; i++) {
        const filaBici = niveles[nivel_actual].dict_bici.filas[i];
        let agregar_bici = true;

        for (let j = 0; j < bicis_actuales.length; j++) {
            if(bicis_actuales[j].fila == filaBici){
                bicis_actuales[j].pos_x += bicis_actuales[j].velocidad;

                if(bicis_actuales[j].pos_x > (width + (width/10))){
                    bicis_actuales.splice(j, 1);
                }
                else{
                    agregar_bici = false;
                }
            }
        }

        if(agregar_bici){
            bicis_actuales.push({
                pos_x: 0,
                img: getRandomInt(17,20),
                fila: filaBici,
                velocidad: getRandom(niveles[nivel_actual].dict_bici.velocidad_min,niveles[nivel_actual].dict_bici.velocidad_max)
            });
        }

    }

}

const verificar_meta = () => {
    let jug_pos_x = jugador.pos_matriz.x;
    let jug_pos_y = jugador.pos_matriz.y;
    if(jug_pos_y == 0){
        let nuevo_lv = nivel_actual + 1;
        jugador.pos_matriz = {x: 0, y: 9};
        jugador.pos_graf = {x: 0, y: (width / 10)*9};

        carros_actuales = [];
        bicis_actuales = [];
        if(typeof niveles[nuevo_lv] == "undefined" ){
            terminar_juego();
        }
        else{
            nivel_actual++;
        }
    }
}


const verificar_colision = () => {
    bicis_actuales
    carros_actuales
    let tam = width / 10;
    let pixel = (tam/100);

    let jug_pos_x = jugador.pos_graf.x;
    let jug_pos_y = jugador.pos_graf.y;
    jug_pos_x += (jugador.colision.padding_x)*pixel;
    jug_pos_y += (jugador.colision.padding_y)*pixel;
    let jug_width =  jugador.colision.width * pixel;
    let jug_height =  jugador.colision.height * pixel;
    let rect2 = {x: jug_pos_x, y: jug_pos_y, width: jug_width, height: jug_height};

    for(i_bici in bicis_actuales){


        if (bicis_actuales[i_bici].img in colision_obj){
            let colision = colision_obj[bicis_actuales[i_bici].img];
            let bici_pos_x = bicis_actuales[i_bici].pos_x;
            let bici_pos_y = bicis_actuales[i_bici].fila*tam;
            const bici_width = colision.width * pixel;
            const bici_height = colision.height * pixel;

            bici_pos_x += (colision.padding_x)*pixel;
            bici_pos_y += (colision.padding_y)*pixel;
            let rect1 = {x: bici_pos_x, y: bici_pos_y, width: bici_width, height: bici_height};
            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y) {
                    perder_vida();
            }
        }
    }


    for(i_carro in carros_actuales){
        if (carros_actuales[i_carro].img in colision_obj){

            let colision = colision_obj[carros_actuales[i_carro].img];
            let carro_pos_x = carros_actuales[i_carro].pos_x;
            let carro_pos_y = carros_actuales[i_carro].fila*tam;
            const carro_width = colision.width * pixel;
            const carro_height = colision.height * pixel;

            carro_pos_x += (colision.padding_x)*pixel;
            carro_pos_y += (colision.padding_y)*pixel;


            let rect1 = {x: carro_pos_x, y: carro_pos_y, width: carro_width, height: carro_height};
            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y) {
                    perder_vida();
            }
        }
    }


}


const perder_vida = () => {
    jugador.vidas -= 1;
    jugador.moviendose = false;
    jugador.pos_matriz = {x: 0, y: 9};
    jugador.pos_graf = {x: 0, y: (width / 10)*9};
    if(jugador.vidas == 0){
        estado_juego = 2;

        let puntaje = (nivel_actual + 1)*100 - segundos;
        jugador.puntaje = puntaje;
        enviar_puntajes();
        clearInterval(intervalo);
        //servicio llenando datos
    }
}

const terminar_juego = () => {

    jugador.moviendose = false;
    jugador.pos_matriz = {x: 0, y: 9};
    jugador.pos_graf = {x: 0, y: (width / 10)*9};
    estado_juego = 3;
    let puntaje = (nivel_actual + 1)*100 - segundos;
    jugador.puntaje = puntaje;
    enviar_puntajes();
    clearInterval(intervalo);

}



const dibujar_pop = () => {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0,0,0,1)";
    let pixel = (width / 1000);
    let pos_x = (width/2) - 300*pixel;
    let pos_y = (width/2) - 166*pixel;


    ctx.fillRect(pos_x - 50, pos_y - 10, 600*pixel + 100, 331*pixel + 10);
    ctx.fillStyle = "rgb(255,225,255)";

    ctx.drawImage(imgs[22], pos_x, pos_y, 600*pixel, 331*pixel);

    let x_info = pos_x;
    let y_info = pos_y + 50*pixel;
    ctx.font = "27px Audiowide";
    ctx.fillText("No lograste cruzar el camino", x_info, y_info);

    y_info += 100 *pixel;
    ctx.font = "20px Audiowide";
    ctx.fillText("Tu puntaje fue", x_info, y_info);
    y_info += 50*pixel;
    ctx.font = "35px Audiowide";


    ctx.fillText(jugador.puntaje, x_info, y_info);
    ctx.font = "15px sans-serif";
    y_info += 100*pixel;
    x_info += 60*pixel;
    ctx.fillText("Oprime enter para iniciar una nueva partida", x_info, y_info);


    ctx.font = "35px Audiowide";
    ctx.fillStyle = "rgba(0,0,0,1)";
}

const dibujar_pop_gano = () => {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#095ca3";
    let pixel = (width / 1000);
    let pos_x = (width/2) - 142*pixel;
    let pos_y = (width/2) - 40*pixel;


    ctx.fillRect(pos_x - 150*pixel, pos_y -180*pixel, 285*pixel + 300*pixel, 80*pixel + 220*pixel);
    ctx.fillStyle = "rgb(255,225,255)";

    ctx.drawImage(imgs[23], pos_x, pos_y, 285*pixel, 80*pixel);

    let x_info = pos_x - 15*pixel;
    let y_info = pos_y - 120*pixel;
    ctx.font = "35px Audiowide";
    ctx.fillText("¡Felicidades!", x_info, y_info);
    x_info -= 15*pixel;
    y_info += 40*pixel;
    ctx.font = "18px Audiowide";
    ctx.fillText("Lograste cruzar el camino", x_info, y_info);

    y_info += 50 *pixel;
    ctx.fillText("Tu puntaje fue", x_info, y_info);
    ctx.font = "35px Audiowide";
    x_info += 230*pixel;
    y_info += 5 *pixel;
    ctx.fillText(jugador.puntaje, x_info, y_info);
    ctx.font = "15px sans-serif";
    y_info += 120*pixel;
    x_info -= 250*pixel;
    ctx.fillText("Oprime enter para iniciar una nueva partida", x_info, y_info);


    ctx.font = "35px Audiowide";
    ctx.fillStyle = "rgba(0,0,0,1)";
}



const dibujar_carros = () => {
    const tam = width / 10;
    for (let i = 0; i < carros_actuales.length; i++) {
        const carro = carros_actuales[i];
        let tamCarro = tam;
        if(carro.img == 2){
            tamCarro = tam*2;
        }

        ctx.drawImage(imgs[carro.img], carro.pos_x, tam*carro.fila, tamCarro, tam);

    }
}


const dibujar_bicis = () => {
    const tam = width / 10;
    for (let i = 0; i < bicis_actuales.length; i++) {
        const bici = bicis_actuales[i];

        ctx.drawImage(imgs[bici.img], bici.pos_x, tam*bici.fila, tam, tam);

    }
}

const dibujar_jugador = () => {
    const tam = width / 10;
    const pixel = tam / 100;
    ctx.drawImage(imgs[jugador.img], jugador.pos_graf.x,  jugador.pos_graf.y, tam, tam);

    let x_info = 0;
    let y_info = ((width / 10) * 10) + 20*pixel;
    ctx.fillStyle = "rgba(255,255,255,1)";

    ctx.drawImage(imgs[21], x_info,  y_info, 30*pixel, 45*pixel);
    x_info += 35*pixel;
    y_info += 38*pixel;

    let ahora = new Date().getTime();
    if((ahora - ultimo_tiempo) > 1000 && estado_juego == 1 ){
        segundos++;
        ultimo_tiempo = ahora;
    }
    ctx.fillText(segundos, x_info, y_info);

    ctx.fillText("Lv "+(nivel_actual + 1), width/2 - 50*pixel, y_info);


    x_info = width - 62*pixel*jugador.vidas;
    y_info = ((width / 10) * 10) + 20*pixel;
    for (let i = 0; i < jugador.vidas; i++) {
        ctx.drawImage(imgs[20], x_info,  y_info, 42*pixel, 42*pixel);
        x_info += 50;
    }
    ctx.fillStyle = "rgba(0,0,0,1)";
}

const dibujar_fondo = () => {
	const tam = width / 10;
	let pos_x = 0;
	let pos_y = 0;
	let i;
	for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            ctx.drawImage(imgs[niveles[nivel_actual].matriz_imgs[i][j]], pos_x, pos_y, tam, tam);
            pos_x += tam;
        }
        pos_x = 0;
        pos_y += tam;
	}

    pos_x = 0;
	pos_y = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let pos_img = niveles[nivel_actual].matriz_objetos_img[i][j];
            if(pos_img != -1){
                let tam_int = tam;
                if(pos_img == 1) tam_int = 2*tam;
                ctx.drawImage(imgs[pos_img], pos_x, pos_y, tam, tam);
            }
            pos_x += tam;
        }
        pos_x = 0;
        pos_y += tam;
	}



};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
const getRandom = (min, max) => {
    return (Math.random() * (max - min)) + min;
}

const mover_rana = (event) => {

    if(estado_juego == 1 && !jugador.moviendose){
        if(event.keyCode == 37){
            const prox_pos = jugador.pos_matriz.x - 1;
            if(prox_pos >= 0 && !niveles[nivel_actual].matriz_bloqueos[jugador.pos_matriz.y][prox_pos]  ){
                jugador.hacia = "izq";
                jugador.moviendose = true;
                jugador.pos_matriz.x--;

            }

        }
        if(event.keyCode == 38){
            const prox_pos = jugador.pos_matriz.y - 1;
            if(prox_pos >= 0 && !niveles[nivel_actual].matriz_bloqueos[prox_pos][jugador.pos_matriz.x]  ){
                jugador.hacia = "arriba";
                jugador.moviendose = true;
                jugador.pos_matriz.y--;

            }

        }
        if(event.keyCode == 39){
            const prox_pos = jugador.pos_matriz.x + 1;
            if(prox_pos <= 9 && !niveles[nivel_actual].matriz_bloqueos[jugador.pos_matriz.y][prox_pos]){
                jugador.hacia = "der";
                jugador.moviendose = true;
                jugador.pos_matriz.x++;
            }
        }
        if(event.keyCode == 40){

            const prox_pos = jugador.pos_matriz.y + 1;
            if(prox_pos <= 9 && !niveles[nivel_actual].matriz_bloqueos[prox_pos][jugador.pos_matriz.x]){
                jugador.hacia = "abajo";
                jugador.moviendose = true;
                jugador.pos_matriz.y++;
            }
        }






    }
    else if(estado_juego == 2 || estado_juego == 3){
        if(event.keyCode == 13){
            init();
        }
    }


}

const enviar_puntajes = () => {
        let data = JSON.stringify({puntaje: jugador.puntaje});
        console.log(data);
        fetch('/agregar_puntajes',
            {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                'Content-Type': 'application/json',
                },
                body: data
           }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}

window.addEventListener("load", init);
