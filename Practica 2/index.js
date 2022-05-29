let notas = [
    {
        titulo: {
            contenido: "Tu título",
            color: "#C32828"
        },
        nota: {
            contenido: "Escribe una nota y elige el color del contenido.\n" +
            "Puedes asignar un color diferente al contenido y al título.\n" +
            "Puedes colapsar o mostrar el contenido de la nota con el botón izquierdo.\n" +
            "Si una nota no te gusta o ya no la necesitas, eliminala con el " +
            "botón que se encuentra del lado derecho.\n",
            color: "#4c5bd2",
        },
        status: true
    }
];


let titulo = null;
let contenido = null;

let colorTitulo = null;
let colorContenido = null;

const agregaNota = (tituloNota,tituloColor,contenidoNota,contenidoColor) => {
    notas = [...notas,{
        titulo: {
            contenido: tituloNota,
            color: tituloColor
        },
        nota: {
            contenido: contenidoNota,
            color: contenidoColor
        },
        status: false
    }];
    muestraNotas();
};


const eliminaNota = (idNota) => {
    notas.splice(idNota,1);
    muestraNotas();
};



const cargaNota = () => {
    
    if(titulo.value == "" || contenido.value == "")
    {
        alert("No se han introducido datos en alguno de los campos. Verificar tÍtulo o el contenido de la nota.")
    }
    else{
        agregaNota(titulo.value,colorTitulo.value,contenido.value,colorContenido.value);
        colorContenido.style.maxHeight = "0px";
        colorTitulo.style.maxHeight = "0px";
    }
    

};

const limpiaCampos = () => {

    titulo.value = '';
    contenido.value = '';
    colorContenido.style.maxHeight = "0px";
    colorTitulo.style.maxHeight = "0px";
};



const muestraNotas = () => {
    
    const contenedorNotas = document.querySelector("#notes-container");
    contenedorNotas.innerHTML = '';

    if(notas.length > 0)
    {
        notas.forEach((nota,index) => {

            let propiedades = [];
            if(nota.status)
            {
                propiedades.push("90deg");
                propiedades.push("100vh;");
            }
            else
            {
                propiedades.push("0deg");
                propiedades.push("0px;");
            }

            let notaCaja = '<div class="nota-cont round" id="nota-id-' + index + '">'+
                '   <span   class="display-nota" onclick="despliegaContenido(' + index + ')"' +
                '           style="transform: rotate(' + propiedades[0] + ');"></span>'+
                '   <div class="nota-titulo" >'+
                '       <h3 style="color: ' + nota.titulo.color + '">' + nota.titulo.contenido + '</h3>'+
                '   </div>'+
                '   <div class="nota-texto" style="max-height: ' + propiedades[1] + ';">'+
                '       <p style="color: ' + nota.nota.color + '">' + nota.nota.contenido.split("\n").join("<br />").replace('\'','\\\'').replace('\"','\\\"') + '</p>'+
                '   </div>'+
                '   <span class="elimina-nota" onclick="eliminaNota(' + index + ')">' +
                '       <div class="elimina-cruz"></div>' + 
                '   </span>'+
                '</div>';

            contenedorNotas.innerHTML += notaCaja;  
            
        });
    }
    else
        contenedorNotas.innerHTML = "";
};


const despliegaContenido = (id) => {

    if(!notas[id].status)
    {
        notas[id].status = true;
        document.querySelector("#nota-id-"+id+" .display-nota").style.transform = "rotate(90deg)";
        document.querySelector("#nota-id-"+id+" .nota-texto").style.maxHeight = "100vh";
    }
    else
    {
        notas[id].status = false;
        document.querySelector("#nota-id-"+id+" .display-nota").style.transform = "rotate(0deg)";
        document.querySelector("#nota-id-"+id+" .nota-texto").style.maxHeight = "0px";
    }
    
};

const despliegaColor = (id) => {

    if(id== 'titulo-color')
    {
        const status = colorTitulo.style.maxHeight;
        colorTitulo.style.maxHeight = (status == "0px" || status == "" ? "100vh" : "0px");
    }
    else
    {
        const status = colorContenido.style.maxHeight;
        colorContenido.style.maxHeight = (status == "0px" || status == "" ? "100vh" : "0px");
    }
    
};

document.addEventListener("DOMContentLoaded", function(event) { 
    muestraNotas();

    titulo = document.querySelector("#titulo-nota");
    contenido = document.querySelector("#contenido-nota");

    colorTitulo = document.querySelector("#titulo-color");
    colorContenido = document.querySelector("#contenido-color");

    colorTitulo.addEventListener("input", function(event) { 
        titulo.style.color = this.value;
    });

    colorContenido.addEventListener("input", function(event) { 
        contenido.style.color = this.value;
    });

});