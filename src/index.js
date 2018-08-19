document.addEventListener("DOMContentLoaded", function() {



  fetch('http://localhost:3000/pups').then(text => text.json()).then(d=>(addToBar(d)))


  function addToBar(dogData) {
    let dogBar = document.getElementById('dog-bar')

    Array.from(dogData).forEach(dog => {
      let newDiv = document.createElement('span')
      newDiv.setAttribute("class", 'dog-div')
      let nameNode = document.createTextNode(dog.name)
      newDiv.appendChild(nameNode)
      dogBar.appendChild(newDiv)

      newDiv.addEventListener('click', function(e) {
        showDogImageAndInfo(e.target.innerText)
      })
    })

    function showDogImageAndInfo(dogName) {
      fetch('http://localhost:3000/pups').then(text => text.json()).then(d=>(getInfo(d)))
        function getInfo(data) {

          Array.from(data).forEach(dog=>{
            if (dog.name == dogName){
              let dogInfo = document.getElementById('dog-info')
              dogInfo.setAttribute('data-id', dog.id)
              dogInfo.innerHTML = `<img src=${dog.image}>
              <h2>${dog.name}</h2>`

              if (dog.isGoodDog == false){
                dogInfo.innerHTML += "<div id=good-dog-button><button>Good Dog!</button></div>"
              }else{
                  dogInfo.innerHTML += "<div id=good-dog-button><button>Bad Dog!</button></div>"
              }

              let button = document.getElementById('good-dog-button')

              button.addEventListener('click', function(e) {
                id = e.target.parentElement.parentElement.dataset.id
                if (e.target.innerHTML == "Bad Dog!"){

                  
                  e.target.innerHTML = "Good Dog!"
                  fetch(`http://localhost:3000/pups/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                      {
                        isGoodDog: false,
                      }
                    )
                  })
                  console.log("THEY ARE A BAD DOGGO!")
                }
                else{
                  e.target.innerHTML = "Bad Dog!"
                  fetch(`http://localhost:3000/pups/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                      {
                        isGoodDog: true,
                      }
                    )
                  })
                  console.log("THEY ARE A GOOD DOGGO!")
                }
              })
            }
          })
        }
    }






  }
})
