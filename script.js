/*
		Designed by: SELECTO
		Original image: https://dribbble.com/shots/5311359-Diprella-Login
*/

let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {

    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

// Función para manejar el inicio de sesión
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (email && password) {
        // Guardar datos de usuario en localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]); // Usar parte del email como nombre
        
        // Mostrar mensaje de bienvenida
        localStorage.setItem('showWelcome', 'true');
        
        // Redirigir a la aplicación
        window.location.href = 'app.html';
    } else {
        alert('Por favor, complete todos los campos');
    }
}

// Función para manejar el registro
function handleSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (name && email && password) {
        // Guardar datos de usuario en localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        
        // Mostrar mensaje de bienvenida
        localStorage.setItem('showWelcome', 'true');
        
        // Redirigir a la aplicación
        window.location.href = 'app.html';
    } else {
        alert('Por favor, complete todos los campos');
    }
}

window.addEventListener("load", function() {
    mainF();
    
    // Agregar event listeners a los botones
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('signup-btn').addEventListener('click', handleSignup);
});