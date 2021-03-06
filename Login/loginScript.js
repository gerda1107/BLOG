const slider = document.getElementById('slider')
const slider2 = document.getElementById('slider2')

let loginPsw
let loginUser
let secretUserKey
let dataMessage

//SLIDER

slider.addEventListener('click', openNav)
slider2.addEventListener('click', openNav)

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//LOGIN

function loginUsername(event) {
    loginUser = event.target.value
    window.localStorage.setItem('loggedUser', loginUser)
}

function loginPassword(event) {
    loginPsw = event.target.value
}

function validation() {
    if(loginUser && loginPsw) {
        warning.innerHTML = dataMessage
    } else {
        warning.innerHTML = dataMessage
    }
}

function login() {
    let user = {
        name: loginUser,
        password: loginPsw
    }

    fetch("http://167.99.138.67:1111/login", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json()).then(data => {
        secretUserKey = data.secretKey
        dataMessage = data.message
        console.log(dataMessage)
        validation()
        window.localStorage.setItem('secret', secretUserKey)
    })
}