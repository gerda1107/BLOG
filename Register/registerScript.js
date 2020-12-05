const slider = document.getElementById('slider')
const slider2 = document.getElementById('slider2')

let newPassword
let repeatPassword
let newUser

let registerAlert

//SLIDER

slider.addEventListener('click', openNav)
slider2.addEventListener('click', openNav)

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//REGISTER

function getUsername(event) {
    newUser = event.target.value
}

function getNewPassword(event) {
    newPassword = event.target.value
}

function getRepeatPassword(event) {
    repeatPassword = event.target.value
}

function validation() {
    if(newUser && newPassword && repeatPassword) {
        warning.innerHTML = registerAlert
    } else {
        warning.innerHTML = registerAlert
    }
}

function createUser() {
    let user = {
        name: newUser,
        passwordOne: newPassword,
        passwordTwo: repeatPassword
    }

    console.log(user)

    fetch("http://167.99.138.67:1111/createaccount", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json()).then(data => {
        registerAlert = data.message
        validation()
        console.log(data)
    })
}