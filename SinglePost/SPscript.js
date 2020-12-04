const slider = document.getElementById('slider')
// const modal = document.getElementById('modalWin')
// const modalInfo = document.getElementById('modalText')

let cardData = []
let secretUserKey
let cardId

let img
let mainTitle
let desc

//SLIDER
slider.addEventListener('click', openNav)

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
        })

}

function displayInfo() {
    specificPost.innerHTML = ''
    specificPost.innerHTML += `
        <div>
            <img src="${cardData[0].image}" width="325" height="245">
            <div class="fs-12"><span class="cardPath">${cardData[0].username}</span></div>
            <h3 class="fs-18">${cardData[0].title}</h3>
            <p class="fs-14">${cardData[0].description}</p>
            <div class="d-flex jc-between ai-center">
                <span class="fs-14"><i class="fab fa-facebook-f m-5"></i><i class="fab fa-twitter"></i><i class="fab fa-pinterest m-5"></i></span>
            </div>
            <button onclick="showAll()">DELETE</button>
            <a href="../Editing/edit.html"><button onclick="clickEdit(event)">EDIT</button></a> 
        </div>


    <div id="modalWin">
        <div id="modalCont">
            <span class="clsBtn" onclick="closeModal()">x</span>
            <p id="modalText"></p>
            <button id="modalVerify" onclick="clickDelete()">Yes</button>
            <button onclick="closeModal()">No</button>
        </div>
    </div>`
}

//MODAL WINDOW

function showAll() {
    modalWin.style.display = "flex";
    modalText.innerHTML = 'Are you sure you want to delete this post?'
}

function closeModal() {
    modalWin.style.display = "none";
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
    })
}

function clickEdit(event) {
    img = event.path[1].children[0].src
    mainTitle = event.path[1].children[2].innerHTML
    desc = event.path[1].children[3].innerHTML

    let postText = {
        image: img,
        title: mainTitle,
        description: desc
    }

    window.localStorage.setItem('innerInfo', JSON.stringify(postText))
    console.log(localStorage)
}