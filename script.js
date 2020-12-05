const slider = document.getElementById('slider')
const slider2 = document.getElementById('slider2')

let cardData = []
let usernames = []
let userTrigger = true

//SLIDER

slider.addEventListener('click', openNav)
slider2.addEventListener('click', openNav)

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//FETCH ALL

function getAll() {
    fetch("http://167.99.138.67:1111/getallposts")
        .then(res => res.json())
        .then(data => {
            cardData.push(data.data)
            addCard()
            console.log(cardData)
        })
}

// BLOG POSTS

function addCard() {
    cardsDiv.innerHTML = ''
    cardData[0].map(item => {

        let date = new Date(item.timestamp)

        cardsDiv.innerHTML += `
        <div class="blogCard" id="${item.id}">
            <img src="${item.image}" width="325" height="245">
            <div class="fs-12"><span class="cardTime">${date.toDateString()}</span> / <span class="cardPath">${item.username}</span></div>
            <h3 class="fs-18">${item.title}</h3>
            <p class="fs-14">${item.description}</p>
            <div class="d-flex jc-between ai-center">
                <a href="SinglePost/singlepost.html" class="fs-12 readMore" onclick="showPost(event)">READ MORE</a>
                <span class="fs-14"><i class="fab fa-facebook-f m-10"></i><i class="fab fa-twitter"></i><i class="fab fa-pinterest m-10"></i></span>
            </div>
        </div>`
    })
}
function showPost(event) {
    let user = {
        id: event.path[2].id,
        name: event.path[2].children[1].children[1].innerHTML
    }
    window.localStorage.setItem('userPost', JSON.stringify(user))
}

//DATE FILTERS

function filterNew() {
    cardData[0] = cardData[0].sort((a, b) => b.timestamp - a.timestamp)
    addCard()
}
function filterOld() {
    cardData[0] = cardData[0].sort((a, b) => a.timestamp - b.timestamp)
    addCard()
}

//USER FILTER

function filterUser() {
    cardData[0].map(item => {
        usernames.push(item.username)
    })

    usernames = usernames.filter((item, index) => usernames[index] !== usernames[index + 1])
    console.log(usernames)

    if(userTrigger) {
        for (let i = 0; i < usernames.length - 1; i++) {
            user.innerHTML += `
         <div onclick="clickedUser(event)"><a href="AllUserPosts/userPosts.html">${usernames[i]}</a></div>`
        }
    }
    userTrigger = !userTrigger
}
function clickedUser(event) {
    let name = event.target.innerHTML
    window.localStorage.setItem('userName', name)
    console.log(localStorage)
}

getAll()