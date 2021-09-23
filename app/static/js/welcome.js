const d = document;

d.addEventListener('click',(e)=>{
    if(e.target.matches('.btns')){
        e.preventDefault();
        const $menu = d.querySelector(`.${e.target.value}`);
        const $isNull = d.querySelector(e.target.value==='main_login'?'.main_register':'.main_login');

        if($menu.classList.contains('null')){
            $menu.classList.remove('null');
        }else{

            return;
        }

        $isNull.classList.add('null');
    }
    else if(e.target.matches('.cerrar_pop')){
        d.querySelector('.popup').classList.remove('activo');
    }
});



window.addEventListener("load", (e)=>{
    document.getElementById("formLogin").addEventListener("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(e.srcElement);
        let data = JSON.stringify(Object.fromEntries(formData));
        console.log(data);
        fetch(e.srcElement.action,
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
          if(data.errors.length > 0){
                document.getElementById("errors").classList.add('activo');
                let listErrors = document.getElementById("listErrors");
                while (listErrors.firstChild) {
                  listErrors.removeChild(listErrors.firstChild);
                }

                for(err in data.errors){
                    let liError = document.createElement("li");
                    liError.append(data.errors[err]);
                    listErrors.append(liError);
                }

          }else{
               window.open("/menu","_self");
          }

        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });

    document.getElementById("formRegistro").addEventListener("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(e.srcElement);
        let data = JSON.stringify(Object.fromEntries(formData));
        console.log(data);
        fetch(e.srcElement.action,
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
          if(data.errors.length > 0){
                document.getElementById("errors").classList.add('activo');
                let listErrors = document.getElementById("listErrors");
                while (listErrors.firstChild) {
                  listErrors.removeChild(listErrors.firstChild);
                }

                for(err in data.errors){
                    let liError = document.createElement("li");
                    liError.append(data.errors[err]);
                    listErrors.append(liError);
                }

          }else{
                window.open("/menu","_self");
          }

        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
})

