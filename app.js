const searchInput = document.querySelector("#input-text");
const searchSubmit = document.querySelector("#input-submit");

const searchImg = document.querySelector("#search-img-background");
const searchName = document.querySelector("#search-name-text");
const searchType = document.querySelector("#search-type-text");
const searchNumber = document.querySelector("#search-number-text");
const searchHP = document.querySelector("#search-hp");




let url;

searchSubmit.addEventListener('click', (e)=> {
    e.preventDefault();

    if (searchInput.value !== "") {
        url = `https://pokebuildapi.fr/api/v1/pokemon/${searchInput.value}`;
        getPokemon();
        console.log("1");
    } else {
        searchName.textContent = "Error";
        console.log("2");
    }
    
})

function getPokemon() {
    fetch(url)
    .then(response =>
        response.json()
        
    ).then(data => {
        console.log(data);

        searchImg.style.backgroundImage = `url('${data.image}')`;
        searchName.textContent = data.name;


        let apiTypes = data.apiTypes[0];
        searchType.textContent = apiTypes.name;  
        searchNumber.textContent = "n°" + data.id;

    })
}

