//VARIABLES del formulario
const nombreInput = document.querySelector('#nombre');
const tutorInput = document.querySelector('#tutor');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const motivoInput = document.querySelector('#motivo');

//INTERFAZ DE USUARIO UI
const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');

let editando;

//CLASES

class Citas {
    constructor(){
        this.citas = [];
    }
    //metodo
    agregarCita(cita){
        //selecciono una copia de this.citas y la nueva cita
        this.citas = [...this.citas, cita]
        console.log(this.citas)
    }

    //metodo
    eliminarCita(id){
        //filtramos todas las citas y traemos todos los id menos el seleccionado
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    //metodo
    editarCita(citaActualizada){
        //.map crea un nuevo arreglo, itera en cada una de las citas
        //verifica que el id de cita y citaactualizada sean el mismo
        //si es el mismo, ? se reescribe todo el objeto por citaactualizada
        //y si no : se mantiene la cita original
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada :cita);
    }
}

class UI {
    //metodo
    imprimirAlerta(mensaje, tipo){
        //creo un div
        const divMensaje = document.createElement('div');
        //añado clases css bootstrap
        divMensaje.classList.add('text-center',  'alert', 'd-block', 'col-12');
        //agregar clase de bootstrap según tipo de error para color
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }
        //agregar el mensaje al div
        divMensaje.textContent = mensaje;
        //agregar mensaje al DOM/documento
        //selecciono el id de contenido, y le insert el divmensaje before la clase agregarcita
        if(!document.querySelector('.alert')){
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        }
        //quitar la alerta tras 5s
        setTimeout( () =>{
            divMensaje.remove();
        }, 5000);
    }
    
    //metodo
    //aplico destructuring desde el parentesis para los parametros delas funciones
    //seria lo mismo que poner {const {citas} = citas}
    imprimirCitas({citas}){
        //utilizo this porque es un metodo de clase dentro de la misma clase
        //limpiarhtml tendria que ser una funcion separada para usarla sin this
        this.limpiarHTML();

        //accedo al arreglo de las citas con foreach
        citas.forEach(cita =>{
            const {nombre, tutor, telefono, fecha, hora, motivo, id} = cita;
            //creo un div para la cita
            const divCita = document.createElement('div');
            //le añado clases de css cita y de bootstrap p3
            divCita.classList.add('cita', 'p-3' );
            //le asignamos como dataset el id
            divCita.dataset.id = id;

            //scripting de los elementos de la cita
            const nombreParrafo = document.createElement('h2');
            nombreParrafo.classList.add('card-title', 'font-weight-bolder');
            nombreParrafo.textContent = nombre;

            const tutorParrafo = document.createElement('p');
            //le doy estilos de css
            tutorParrafo.innerHTML = `
            <span clas="font-weight-bolder">Tutor: </span>${tutor}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span>${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span>${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span>${hora}`;

            const motivoParrafo = document.createElement('p');
            motivoParrafo.innerHTML = `
            <span class="font-weight-bolder">Motivo: </span>${motivo}`;

            //boton para eliminar cita
            const btnEliminar = document.createElement('button');
            //agregar clases de bootstrap
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            //btnEliminar.innerHTML = 'Eliminar';
            btnEliminar.innerHTML = `Eliminar  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`;
            //funcionalidad al dar click
            btnEliminar.onclick = () => eliminarCita(id);

            //boton para editar cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>`;
            btnEditar.onclick = () => cargarEdicion(cita);

            //agregar los parrafos a divCita
            divCita.appendChild(nombreParrafo);
            divCita.appendChild(tutorParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(motivoParrafo);
            divCita.appendChild(btnEditar);
            divCita.appendChild(btnEliminar);

            //agregar el divcita al html
            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML(){
        //while haya un firstchild en contenedorcitas, borra el firstchild
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

//INSTANCIAR LAS CLASES (lo convierto en objeto para poder hacer uso de sus metodos)
const ui = new UI();
const administrarCitas = new Citas();


//EVENT LISTENERS
eventListeners();
function eventListeners(){
    nombreInput.addEventListener('input', datosCita);
    tutorInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    motivoInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit',nuevaCita)
}

//OBJETO CON LA INFO DE LA CITA
const citaObj = {
    nombre: '',
    tutor: '',
    telefono: '',
    fecha: '',
    hora: '',
    motivo: ''

}

//FUNCIONES
//agrega datos al objeto citaObj
function datosCita(e){
    citaObj [e.target.name] = e.target.value;
}

//valida y agrega nueva cita a la clase citas
function nuevaCita(e) {
    e.preventDefault();
    
    //extraer info de citaobj
    const {nombre, tutor, telefono, fecha, hora, motivo} = citaObj;

    //validar  
    if (nombre === '', tutor === '', telefono === '', fecha === '', hora === '', motivo === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        //pasar objeto cita a edicion
        administrarCitas.editarCita({...citaObj});

        //volver el txt del boton al original 
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        
        //quitar modo edicion
        editando = false;
    }else{
    //generar un id unico por cita
    citaObj.id = Date.now();

    //crear nueva cita
    //con spread ... tomo una copia de citaobj para que 
    //no me la reescriba cada vez que introduzco una cita
    //si le paso solo citaobj y no una copia, le estoy pasando el objeto y la referencia
    //juntos, por lo que se reescribiria siempre, si lo separo, la nueva cita se crea 
    //aparte de cita obj con una copia de citaobj
    administrarCitas.agregarCita({...citaObj});

    //mensaje de agregado correctamente
    ui.imprimirAlerta('Agregado correctamente')
    }

    

    //reiniciar el objeto citaobj
    reiniciarObjeto();

    //reiniciar el formulario en blanco
    formulario.reset(); 

    //mostrar citas en el html
    ui.imprimirCitas(administrarCitas);
}

//reiniciar el objeto
function reiniciarObjeto(){
    citaObj.nombre = '',
    citaObj.tutor = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.motivo = ''
}

//para eliminar una cita
function eliminarCita(id){
    //eliminar la cita
    administrarCitas.eliminarCita(id);

    //mostrar un mensaje
    ui.imprimirAlerta('La cita ha sido eliminada');

    //refrescar citas
    ui.imprimirCitas(administrarCitas)
}

//para cargar los datos y modo editar
function cargarEdicion(cita){
    const {nombre, tutor, telefono, fecha, hora, motivo, id } = cita;

    //llenar los inputs
    nombreInput.value = nombre;
    tutorInput.value = tutor;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    motivoInput.value = motivo;

    //llenar el objeto
    citaObj.nombre = nombre;
    citaObj.tutor = tutor;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.motivo = motivo;
    citaObj.id = id;

    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}
