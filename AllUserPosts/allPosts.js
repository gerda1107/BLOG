const slider = document.getElementById('slider')
let cardData = []

//SLIDER

slider.addEventListener('click', openNav)

function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//ALL USER POSTS

getInfo()
function getInfo() {

    let name = window.localStorage.getItem('userName')

    fetch(`http://167.99.138.67:1111/getuserposts/${name}`)
        .then(res => res.json())
        .then(data => {
            cardData.push(data.data)
            displayPosts()
            console.log(data)
        })
}

function displayPosts() {


    cardData[0].map(item => {
        author.innerHTML = `Posts by ${item.username}`
        let date = new Date(item.timestamp)

        userPosts.innerHTML += `
        <div class="blogCard" id="${item.id}">
            <img src="${item.image}" width="325" height="245">
            <div class="fs-12"><span class="cardTime">${date.toDateString()}</span> / <span class="cardPath">ARTWORKS, TIPS</span></div>
            <h3 class="fs-18">${item.title}</h3>
            <p class="fs-14">${item.description}</p>
            <div class="d-flex jc-between ai-center">
                <span class="fs-12 readMore">READ MORE</span>
                <span class="fs-14"><i class="fab fa-facebook-f m-5"></i><i class="fab fa-twitter"></i><i class="fab fa-pinterest m-5"></i></span>
            </div>
        </div>`
    })
}