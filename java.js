
let podcastArray = []

let selectedPodcast = {}

let imageExamine = document.getElementById("podcastModal1")

let allPodcasts = []

let allImgs = []

////////////// < SEARCH PODCASTS > /////////////////////////
//gets search string
let podcastString = document.getElementById("podcastInput")

//listens for the button click to find podcasts with that string
document.getElementById("searchPodcast").onclick = function() {podcastSearch()};



document.getElementById("modalSave").onclick = function() {podcastSave()};

document.getElementById("showAll").onclick = function() {showAll()};

document.getElementById("updateModal").onclick = function() {updateOne()};


document.getElementById("deleteButton").onclick = function() {deletePodcast()};


function podcastSearch() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");   
    let term = document.getElementById("podcastInput").value
    let raw = JSON.stringify({
        "term": term
      });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };    

        
fetch("https://podcastingnode.herokuapp.com/podcasts", requestOptions)
//converts text response to json
.then(response => response.json())
//sends data to a function
.then(data => setData(data))
.catch(error => console.log('error', error));
    
    }

function setData(data){
    podcastArray = data.feeds
    if (podcastArray.length === 0) {
        alert("No Results Found")
    } else {
    let childArray = ["podcastCard1"]
    for (let i = 1; i < podcastArray.length  ; i++) {
        let card = document.getElementById("podcastCell1")

        document.getElementById("podcastCard1").style.visibility = "visible"
        let cloneCard = card.cloneNode(true)
        cloneCard.childNodes[1].id = (`podcastCard${i + 1}`)
        cloneCard.id = (`podcastCell${i + 1}`)
        childArray.push(`podcastCard${i + 1}`)

            document.getElementById("cardRow").appendChild(cloneCard)

        }
      putPictures(podcastArray, childArray)  
    }
}

function putPictures(podcastArray, childArray) {
    let imgs = [] 
    podcastArray.forEach(podcast => {
        imgs.push(podcast.image)
    })

    let j =0
    console.log(podcastArray)
     childArray.forEach(podcast => {
         let currentCell = document.getElementById(podcast)
        currentCell.childNodes[1].src = podcastArray[j].image
        currentCell.dataset.podcastid = podcastArray[j].id
        
        
        currentCell.getElementsByTagName("p")[0].innerHTML = podcastArray[j].title
        j++
     })
}

    

    //////////////  </ SEARCH PODCASTS >  /////////////////////////

    //pass id of podcast through URL param when navigating to next pag


//////////////////< EXAMINE PODCAST > ////////////////////////////////////
function examine(podcast) {
    console.log(podcast)
    let found = {}
    // let modalP = document.getElementById("modalP")
    let podcastId = podcast.dataset.podcastid
    podcastId = Number(podcastId)
    // found = podcastArray.findIndex(e => e.id = podcastId);
    populateModal(podcastId)
}

function populateModal(found) {
    let feed_id = document.getElementById("modal_id")
    let feed_title = document.getElementById("modal_title")
    let feed_author = document.getElementById("modal_author")
    podcastObj = podcastArray.findIndex(podcastArray => podcastArray.id === found);
    imageExamine.childNodes[1].src = podcastArray[podcastObj].image
    feed_id.innerText = podcastArray[podcastObj].id
    feed_title.innerText = podcastArray[podcastObj].title
    feed_author.innerText = podcastArray[podcastObj].author
    modalP.innerText = podcastArray[podcastObj].description
}


///////////////// </ EXAMINE PODCAST > //////////////////////////////////


//////////////////< Save New > ////////////////////////////////////

function podcastSave() {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let titleSend = document.getElementById("modal_title").textContent
let descriptionSend = document.getElementById("modalP").textContent
let imgSend = document.getElementById("modalThumbnail").src
let feed_id = document.getElementById("modal_id").textContent
let authorSend = document.getElementById("modal_author").textContent
let commentSend = document.getElementById("commentBox").value


var raw = JSON.stringify({
  "title": titleSend,
  "description": descriptionSend,
  "img": imgSend,
  "feed_id": feed_id,
  "author": authorSend,
  "comment": commentSend
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://podcastingnode.herokuapp.com/podcasts/save", requestOptions)
  .then(response =>  response.text())
  .then(result => console.log(result))    
  .catch(error => console.log('error', error));
    

}


//////////////////</ Save New > ////////////////////////////////////


//////////////////< view all > ////////////////////////////////////

function showAll() {
    
    document.getElementById("podcastCard1").setAttribute( "onclick", "showAllModal(this);" );

    document.getElementById('searchPodcast').setAttribute("id", "homeButton")

     document.getElementById("homeButton").setAttribute("onClick", "window.location.href='./index.html'")

    document.getElementById("homeButton").innerText = "Home"

    document.getElementById("deleteButton").style.visibility = "visible"
  
    document.getElementById("modalSave").setAttribute("id", "updateModal")

    document.getElementById("updateModal").innerText = "Update Comment"

    document.getElementById("updateModal").onclick = function() {updateOne()};

    document.getElementById("deleteButton").onclick = function() {deletePodcast()};

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://podcastingnode.herokuapp.com/showall", requestOptions)
        .then(response => response.json())
        .then(result => populateAll(result))
        .catch(error => console.log('error', error));

}

function populateAll(data) {
    console.log(data)
    allPodcasts = data.reverse()
    
    if (allPodcasts.length === 0) {
        alert("No Results Found")
    } else {
    let childArrayAll = ["podcastCard1"]
    for (let i = 1; i < allPodcasts.length  ; i++) {
        let card = document.getElementById("podcastCell1")

        document.getElementById("podcastCard1").style.visibility = "visible"
        let cloneCard = card.cloneNode(true)
        cloneCard.childNodes[1].id = (`podcastCard${i + 1}`)
        cloneCard.id = (`podcastCell${i + 1}`)
        childArrayAll.push(`podcastCard${i + 1}`)

            document.getElementById("cardRow").appendChild(cloneCard)

        }
      putAllPictures(allPodcasts, childArrayAll)  
    }
}

function putAllPictures(allPodcasts, childArrayAll) {
    let imgs = [] 
    allPodcasts.forEach(podcast => {
        imgs.push(podcast.img)
    })

    let j =0
    console.log(allPodcasts)
     childArrayAll.forEach(podcast => {
         let currentCell = document.getElementById(podcast)
        currentCell.childNodes[1].src = allPodcasts[j].img
        currentCell.dataset.podcastid = allPodcasts[j].feed_id
        
        
        currentCell.getElementsByTagName("p")[0].innerHTML = allPodcasts[j].title
        j++
     })
}

function showAllModal(podcast) {
    
    let found = {}
    
    let podcastId = podcast.dataset.podcastid
    podcastId = Number(podcastId)

    populateAllModal(podcastId)
}

function populateAllModal(found) {
    let feed_id = document.getElementById("modal_id")
    let feed_title = document.getElementById("modal_title")
    let feed_author = document.getElementById("modal_author")
    let feed_comments = document.getElementById("commentBox")
    let feed_mongoId = document.getElementById("modal_mongoId")
    podcastObj = allPodcasts.findIndex(allPodcasts => allPodcasts.feed_id === found);
    imageExamine.childNodes[1].src = allPodcasts[podcastObj].img
    feed_id.innerText = allPodcasts[podcastObj].feed_id
    feed_title.innerText = allPodcasts[podcastObj].title
    feed_author.innerText = allPodcasts[podcastObj].author
    feed_comments.innerText = allPodcasts[podcastObj].comment
    modalP.innerText = allPodcasts[podcastObj].description
    feed_mongoId.innerText = allPodcasts[podcastObj]._id
    
  
}


//////////////////</ view all > ////////////////////////////////////


//////////////////< udpate one > ////////////////////////////////////

function updateOne() {




let mongoId = document.getElementById("modal_mongoId").textContent

console.log(mongoId)

console.log(`https://podcastingnode.herokuapp.com/podcasts/${mongoId}`)

let newComment = document.getElementById("commentBox").value



let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
  "comment": newComment
});

let requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};



fetch(`https://podcastingnode.herokuapp.com/podcasts/${mongoId}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


}




//////////////////</ udpate one > ////////////////////////////////////


//////////////////< delete one > ////////////////////////////////////
function deletePodcast() {

    let mongoId = document.getElementById("modal_mongoId").textContent




// let mongoIdIso = mongoId.dataset.mongoid

console.log(`https://podcastingnode.herokuapp.com/podcasts/${mongoId}`)


let urlDelete= `https://podcastingnode.herokuapp.com/podcasts/${mongoId}`
console.log(urlDelete)

let requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch(urlDelete, requestOptions)
    .then(response => response.text())
    .then(result => showAll(result))
    .catch(error => console.log('error', error));
    location.href="/index.html"

    showAll()
}


//////////////////</ delete one > ////////////////////////////////////