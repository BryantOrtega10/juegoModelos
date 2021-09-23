const d = document;

d.addEventListener('click',(e)=>{
    if(e.target.matches('#btnInstrucciones')){
        document.getElementById("instrucciones").classList.add('activo');
    }
    else if(e.target.matches('.cerrar_pop')){
        d.querySelector('.popup').classList.remove('activo');
    }
});
