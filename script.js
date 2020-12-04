// CREATE BLOG WEBSITE

// ALL BLOG POSTS PAGE - page where all blog posts are visible (could be main page - index page) +
// index page should look like - https://coney.qodeinteractive.com/pinterest-home/ +
// whole website styles should also be as close to example as possible
// please notice - only index page is required to look exact as example
// other pages has to have similar style but structure is up to you creative minds
// semantic tags should be used in html
// code should be pushed to github and exported as static web page
// there should be possibility to filter posts by date
// SINGLE POST PAGE - page which opens when single post is selected
// REGISTER USER PAGE - page when user has to register
// USER LOGIN PAGE - page where user logs in and gets secret key (for further operations)
// PARTICULAR USER POSTS PAGE - page which opens when you choose to see particular user posts
// Website should have these pages:
// PAGE FOR POST EDITING - page which opens when i click edit button on post i own
// when registering new user inputs should be validated in front-end (try sending random stuff to test api)
// when logging in there should also be validations depending on errors received from back-end
// when creating new post
// Website should have these validations:
// when updating post


// website should have these additional functions:
// some kind of modal pops up and asks for confirmation when user tries to delete own post
// modal pops up and asks for confirmation when user edits existing post


// API DOCUMENTATION

// GET - REQUESTS

// get all posts
// http://167.99.138.67:1111/getallposts

// get particular user posts
// http://167.99.138.67:1111/getuserposts/:name
// put user name instead of ":name"

// get particular post
// http://167.99.138.67:1111/getsinglepost/:name/:id'
// put user name instead of ":name" and post id instead of ":id"

// POST - REQUESTS

// create new user
// http://167.99.138.67:1111/createaccount
// send JSON object with these keys:
// name, passwordOne, passwordTwo

// login to get your secret key
// http://167.99.138.67:1111/login
// send JSON object with these keys:
// name, password

// create new post (have to have secret key)
// http://167.99.138.67:1111/createpost
// send object JSON object with these keys:
// secretKey, title, image, description

// update existing post (have to have secret key)
// http://167.99.138.67:1111/updatepost
// send JSON object with these keys:
// secretKey, title, image, description, id (id stands for post id)

// delete existing post (have to have secret key)
// http://167.99.138.67:1111/deletepost
// send JSON object with these keys:
// secretKey, id (id stands for post id)

const slider = document.getElementById('slider')
let cardData = []
let usernames = []
let userTrigger = true

//SLIDER

slider.addEventListener('click', openNav)

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
                <span class="fs-14"><i class="fab fa-facebook-f m-5"></i><i class="fab fa-twitter"></i><i class="fab fa-pinterest m-5"></i></span>
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