'use strict'


const application = document.getElementById('application');

function auth(username, email, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth', true);
    xhr.withCredentials = true;

    const user = {username, email};
    const body = JSON.stringify(user);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (+xhr.status !== 200) {
            return callback(xhr, null);
        }
        const response = JSON.parse(xhr.responseText);
        return callback(null, response);
    };

    xhr.send(body);
}

function WhoAmI(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/me', true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (+xhr.status !== 200) {
            return callback(xhr, null);
        }
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    }
    xhr.send();
}



function createSignUp() {
    application.innerHTML = '';
    const form = document.createElement('form');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'Емайл';

    const username = document.createElement('input');
    username.type = 'username';
    username.name = 'username';
    username.placeholder = 'username';

    // const passwordInput = document.createElement('input');
    // passwordInput.type = 'password';
    // passwordInput.name = 'password';
    // passwordInput.placeholder = 'Пароль';

    // const ageInput = document.createElement('input');
    // ageInput.type = 'number';
    // ageInput.name = 'age';
    // ageInput.placeholder = 'Возраст';

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегистрироваться!';

    form.appendChild(emailInput);
    form.appendChild(username);
    // form.appendChild(passwordInput);
    // form.appendChild(ageInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log(form.elements);
        const email = form.elements['email'].value
        const username = form.elements['username'].value

        auth(username, email, function (err, resp) {
            console.log(err, resp)
            if (err) {
                return alert(`AUTH Error: ${err.status}`);
            }

            form.reset();
        })
    })

    application.innerHTML = '';
    application.appendChild(form);
}

WhoAmI(function (err, resp) {
    if (err) {
        return createSignUp();
        alert('OOps')
    }
    alert('OOps2')
    const emailDiv = document.createElement('div');
    const usernameDiv = document.createElement('div');
    const countDiv = document.createElement('div');

    emailDiv.innerHTML = resp.email;
    usernameDiv.innerHTML = resp.username;
    countDiv.innerHTML = resp.count;
    application.innerHTML = '';
    application.appendChild(emailDiv)
    application.appendChild(usernameDiv)
    application.appendChild(countDiv)
});