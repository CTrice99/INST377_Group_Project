async function populateCatPage() {
    const catApi = await fetch('https://api.thecatapi.com/v1/breeds')
    .then((res) => res.json())
    .then((res) => {
        var i = 0
        while (i < 10) {
        i++
        var result = Object.entries(res)
        var number = Math.floor(Math.random() * 20) + 1;
        var div = document.createElement("div")
        div.id = "div" + i
        var catBreed = result[number]
        var catBreedDescription = (catBreed[1].description)
        var catID = (catBreed[1].id)
        var imageID = catBreed[1].reference_image_id
        console.log(imageID)
        const searchImageByID = fetch(`https://api.thecatapi.com/v1/images/${imageID}`)
        .then((res) => res.json())
        .then((res) => {
            var result = Object.entries(res)
            var result1 = (result[1][1])
            var picture = document.createElement("img")
            picture.src = result1
            
            
        })
        console.log(searchImageByID)
        console.log(catID)
        console.log(catBreedDescription)
        document.getElementById("catBody").appendChild(div)
        var breedInfo = document.createElement("h3")
        
        div.appendChild(breedInfo)
        breedInfo.id = "breedInfo" + i
        breedInfo.innerHTML = catBreedDescription
        }
    })

}


window.onload = populateCatPage()
