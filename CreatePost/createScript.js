const slider = document.getElementById('slider')

let secretUserKey
let imgUrl
let createTitle
let desc
let dataMessage

//SLIDER
slider.addEventListener('click', openNav)

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//CREATE POST

function getImageURL(event) {
    imgUrl = event.target.value
}

function getTitle(event) {
    createTitle = event.target.value
}

function getDescription(event) {
    desc = event.target.value
}

function validation() {
    if(imgUrl && createTitle && desc) {
        warning.innerHTML = dataMessage
    } else {
        warning.innerHTML = dataMessage
    }
}

function createPost() {

    secretUserKey = window.localStorage.getItem('secret')

    let post = {
        secretKey: secretUserKey,
        image: `${imgUrl}`,
        title: createTitle,
        description: desc
    }

    fetch("http://167.99.138.67:1111/createpost", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json()).then(data => {
        dataMessage = data.message
        validation()
    })
}