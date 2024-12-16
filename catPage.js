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
                arr.push(imageID)
                document.getElementById("catBody").appendChild(div)
                
                
                const api = fetch(`https://api.thecatapi.com/v1/images/${imageID}`)
                .then((res) => res.json())
                .then((res) => {
                    var result = Object.entries(res)
                    result = (result[1][1])
                    console.log(result)
                    return result
                })
                var image = document.createElement("img")
                image.id = "image" + i
                image.src = api
                var breedInfo = document.createElement("h3")
                div.appendChild(breedInfo)
                div.appendChild(image)
                breedInfo.id = "breedInfo" + i
                breedInfo.innerHTML = catBreedDescription

            }



        })

    }




window.onload = populateCatPage()
