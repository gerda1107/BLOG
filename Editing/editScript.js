const slider = document.getElementById('slider')
let cardData
let postId

let editedImg
let editedTitle
let editedDesc

let registerAlert

//SLIDER

slider.addEventListener('click', openNav)

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

cardData = JSON.parse(window.localStorage.getItem('innerInfo'))
postId = JSON.parse(window.localStorage.getItem('userPost'))

addCard()
function addCard() {
    editDiv.innerHTML += `
          <input type="text" id="editImg" value="${cardData.image}" oninput="editImg(event)">
          <input type="text" id="editTitle" value="${cardData.title}" oninput="editTitle(event)"><br>
          <input type="text" id="editDesc" value="${cardData.description}" oninput="editDesc(event)"><br>

      <button id="edit-submit" onclick="showAll()">SUBMIT</button>

    <div id="modalWin">
        <div id="modalCont">
            <span class="clsBtn" onclick="closeModal()">x</span>
            <p id="modalText"></p>
            <span id="warning"></span>
            <button id="modalVerify" onclick="editPost()">Yes</button>
            <button onclick="closeModal()">Go Back</button>
        </div>
    </div>`
}

//MODAL

function showAll() {
    modalWin.style.display = "flex";
    modalText.innerHTML = 'Are you sure you want to update this post?'
}

function closeModal() {
    modalWin.style.display = "none";
}

function editImg(event) {
    editedImg = event.target.value
}

function editTitle(event) {
    editedTitle = event.target.value
}

function editDesc(event) {
    editedDesc = event.target.value
}

function validation() {
    if(editedImg && editedTitle && editedDesc) {
        warning.innerHTML = registerAlert
    } else {
        warning.innerHTML = registerAlert
    }
}

function editPost() {

    secretUserKey = window.localStorage.getItem('secret')

    let save = {
        secretKey: secretUserKey,
        title: editedTitle,
        image: editedImg,
        id: postId.id,
        description: editedDesc
    }

    fetch("http://167.99.138.67:1111/updatepost", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(save)
    }).then(res => res.json()).then(data => {
        registerAlert = data.message
        console.log(save)
        validation()
    })
}
