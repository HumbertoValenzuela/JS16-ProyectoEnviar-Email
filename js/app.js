// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListeners();
function eventListeners() {
    // Cuando la app Arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    
    // Campos del Formulario
    email.addEventListener('blur', validarFormulario);// blur Al estar en el input, y luego salir del input. Por medio de teclado o mouse
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);
    // Enviar Email
    formulario.addEventListener('submit', enviarEmail);
}

// Funciones
function iniciarApp() {//Función deshabilitar botón enviar
    // console.log('iniciando');
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log('validando');
    //console.log(e.target); //muestra el elemento, sería el input en donde escribo
    //console.log(e.target.value); // muestra lo que escribe al salir del input

    // para validar los input es necesario saber el tipo
    //console.log(e.target.type);//email, text, textarea

    if(e.target.value.length > 0) {
        const error = document.querySelector('p.error');
        if(error) {//revisa si existe
            error.remove();
        }        
        //  console.log(`Si, hay algo: ${e.target.value}`);
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        // e.target.style.borderBottomColor = 'red';
        // agregar clases de tailwind
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        // llamar a la función MostrarError
        console.log(`No, no hay : ${e.target.value}`);
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        
        
        if(er.test(e.target.value)) {

            const error = document.querySelector('p.error');
            if(error){// revisa si existe
                error.remove();
            }
            
            // console.log(`Si, hay algo: ${e.target.value}`);
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            // llamar a la función MostrarError            
            mostrarError('Email no Valido');
        }
    }
// er.test(e.target.value)  no va, porque se esta validando por er.test(email.value)
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        // console.log('pasasste la validacion');
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } 
}

function mostrarError(mensaje) {
     console.log(mensaje);
    
    const mensajeError = document.createElement('p');
    // Agregar un Texto
    mensajeError.innerHTML = mensaje;
    // agregar clases
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    // clase error verificar si existe. Para no crear más
    // .length existe en querySelectorAll, no existe en querySelector
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        // agregar parrafo al formulario. al usar el evento se crea multiples veces
        console.log('crear parrafo');
        formulario.appendChild(mensajeError);
        // insertar el mensaje de error arriba
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }
}

// eNVIAR el Email
function enviarEmail(e) {
    e.preventDefault();
    // console.log('enviando');
    // Mostrar el Spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex'; 

    // Después de 3 segundos ocultar el spinner y mostrar mensaje
    setTimeout( () => {
        console.log('Esta función se ejecuta después de 3 segundos');
        spinner.style.display ='none';
        // Mensaje que dice, se envió correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió Correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-1', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Inserta el parrafo antes de la clase spinner
        formulario.insertBefore(parrafo, spinner);

        // Eliminar el parrafo después de 5 segundos
        setTimeout(() => {
            parrafo.remove();// Eliminar el mensaje de éxito
            resetearFormulario(e);
            
        }, 5000);

    }, 3000);
    // setInterval( () => {
    //     console.log('Esta función se ejecuta cada 3 segundos');
    // }, 3000);
}

// Función que resetea el formulario
function resetearFormulario(e) {
    e.preventDefault();
    formulario.reset();
    iniciarApp();
}