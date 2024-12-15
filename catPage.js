async function populateCatPage() {
    const catApi = await fetch('https://api.thecatapi.com/v1/breeds')
    .then((res) => res.json())
    .then((res) => {
        var i = 0
        while (i < 10) {
        i++
        var result = Object.entries(res)
        var number = Math.floor(Math.random() * 20) + 1;
        var catBreed = result[number]
        console.log(catBreed)
        var catBreedDescription = (catBreed[1].description)
        var catID = (catBreed[1].id)
        console.log(catID)
        console.log(catBreedDescription)
        var breedInfo = document.createElement("h3")
        breedInfo.id = "breedInfo" + i
        breedInfo.innerHTML = catBreedDescription
        document.getElementById("breedInfo").appendChild(breedInfo)
        }
    })
}

window.onload = populateCatPage()