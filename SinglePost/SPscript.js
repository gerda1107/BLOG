const slider = document.getElementById('slider')
const slider2 = document.getElementById('slider2')

let cardData = []
let secretUserKey = window.localStorage.getItem('secret')
let cardId

let img
let mainTitle
let desc

let registerAlert

let loginUser = window.localStorage.getItem('loggedUser')

//SLIDER

slider.addEventListener('click', openNav)
slider2.addEventListener('click', openNav)

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


getInfo()

function getInfo() {

    let selectInfo = JSON.parse(window.localStorage.getItem('userPost'))
    console.log(selectInfo)

    fetch(`http://167.99.138.67:1111/getsinglepost/${selectInfo.name}/${selectInfo.id}`)
        .then(res => res.json())
        .then(data => {
            cardData.push(data.data)
            displayInfo()
            console.log(cardData)
        })

}

function displayInfo() {

    let date = new Date(cardData[0].timestamp)

    specificPost.innerHTML = ''
    specificPost.innerHTML += `
            <img src="${cardData[0].image}">
            <div class="fs-14"><span class="cardTime">${date.toDateString()}</span> / <span class="cardPath">${cardData[0].username}</span></div>
            <h3 class="fs-18">${cardData[0].title}</h3>
            <p class="fs-14">${cardData[0].description}</p>
            <div class="d-flex jc-between ai-center">
                <span class="fs-14"> SHARE: <i class="fab fa-facebook-f m-10"></i><i class="fab fa-twitter"></i><i class="fab fa-pinterest m-10"></i></span>
            </div>
            `

    if(loginUser === cardData[0].username) {
        specificPost.innerHTML +=
        `<button onclick="showAll()">DELETE</button>
        <a href="../Editing/edit.html"><button onclick="clickEdit(event)">EDIT</button></a>

        <div id="modalWin">
            <div id="modalCont" class="d-flex f-direction ai-center">
                <p id="modalText" class="fs-18"></p>
                <span id="warning"></span>
                <button id="modalVerify" onclick="clickDelete()">Yes</button>
                <button onclick="closeModal()">No</button>
            </div>
        </div>`
    }

}

//MODAL WINDOW

function showAll() {
    modalWin.style.display = "flex";
    modalText.innerHTML = 'Are you sure you want to delete this post?'
}

function closeModal() {
    modalWin.style.display = "none";
}

function validation() {
    if(secretUserKey && cardId) {
        warning.innerHTML = registerAlert
    } else {
        warning.innerHTML = registerAlert
    }
}

function clickDelete() {
    console.log(localStorage)

    cardId = cardData[0].id
    secretUserKey = window.localStorage.getItem('secret')

    let deletePost = {
        secretKey: secretUserKey,
        id: cardId
    }

    fetch("http://167.99.138.67:1111/deletepost", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deletePost)
    }).then(res => res.json()).then(data => {
        console.log(data)
        registerAlert = data.message
        validation()
    })
}

function clickEdit(event) {
    img = event.path[2].children[0].src
    mainTitle = event.path[2].children[2].innerHTML
    desc = event.path[2].children[3].innerHTML

    let postText = {
        image: img,
        title: mainTitle,
        description: desc
    }

    window.localStorage.setItem('innerInfo', JSON.stringify(postText))
    console.log(event)
}