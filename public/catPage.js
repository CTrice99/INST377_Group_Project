async function populateCatPage() {
    const catApi = await fetch('https://api.thecatapi.com/v1/breeds')
        .then((res) => res.json())
        .then((res) => {
            var i = 0
            arr = []
            while (i < 10) {
                i++
                var result = Object.entries(res)
                var number = Math.floor(Math.random() * 20) + 1;
                var div = document.createElement("div")
                div.id = "div" + i
                var catBreed = result[number]
                var catBreedDescription = (catBreed[1].description)
                var imageID = catBreed[1].reference_image_id
                console.log(catBreedDescription)
                document.getElementById("catBody").appendChild(div)
                var breedInfo = document.createElement("h3")
                breedInfo.id = "breedInfo" + i
                breedInfo.innerHTML = catBreedDescription
                console.log(imageID)
                var image = document.createElement("img")
                div.appendChild(breedInfo)


            }



        })
}





    window.onload = populateCatPage()
