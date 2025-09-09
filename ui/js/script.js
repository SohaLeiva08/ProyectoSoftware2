let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");
let successNotification = document.getElementById("success-notification");
let errorNotification = document.getElementById("error-notification");

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

// Función para mostrar notificaciones
function showNotification(element, timeout = 3000) {
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, timeout);
}

// Función para validar email
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Función para manejar el inicio de sesión
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        errorNotification.querySelector('span').textContent = 'Por favor, complete todos los campos';
        showNotification(errorNotification);
        return;
    }
    
    if (!isValidEmail(email)) {
        errorNotification.querySelector('span').textContent = 'Por favor, ingrese un email válido';
        showNotification(errorNotification);
        return;
    }
    
    // Guardar datos de usuario en localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', email.split('@')[0]);
    
    // Mostrar mensaje de éxito
    successNotification.querySelector('span').textContent = '¡Inicio de sesión exitoso!';
    showNotification(successNotification);
    
    // Redirigir después de un breve delay
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 1500);
}

// Función para manejar el registro
function handleSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (!name || !email || !password) {
        errorNotification.querySelector('span').textContent = 'Por favor, complete todos los campos';
        showNotification(errorNotification);
        return;
    }
    
    if (!isValidEmail(email)) {
        errorNotification.querySelector('span').textContent = 'Por favor, ingrese un email válido';
        showNotification(errorNotification);
        return;
    }
    
    // Guardar datos de usuario en localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    
    // Mostrar mensaje de éxito
    successNotification.querySelector('span').textContent = '¡Registro exitoso!';
    showNotification(successNotification);
    
    // Redirigir después de un breve delay
    setTimeout(() => {
        window.location.href = 'app.html';
    }, 1500);
}

window.addEventListener("load", function() {
    mainF();
    
    // Agregar event listeners a los botones
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('signup-btn').addEventListener('click', handleSignup);
    
    // Agregar funcionalidad para la tecla Enter
    document.getElementById('login-email').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    document.getElementById('login-password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    document.getElementById('signup-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSignup();
    });
    
    document.getElementById('signup-email').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSignup();
    });
    
    document.getElementById('signup-password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSignup();
    });
});