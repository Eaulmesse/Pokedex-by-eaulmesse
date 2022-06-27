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


let btnTest = document.getElementById('test');

function createCard(ImgBackground,name,type,number) {
    let globalSection = document.querySelector('.card-list');


    let globalCard = document.createElement('div');
    globalCard.classList.add("card-all-generate");
    globalSection.appendChild(globalCard);
    


    let globalCardImg = document.createElement('div');
    globalCardImg.classList.add("search-img");
    globalCard.appendChild(globalCardImg);

    let globalCardBackground = document.createElement('div');
    globalCardBackground.classList.add("card-all-background");
    globalCardBackground.style.backgroundImage = `url(${ImgBackground})`;
    globalCardImg.appendChild(globalCardBackground);

    let globalCardDesc = document.createElement('div');
    globalCardDesc.classList.add("card-all-desc");
    globalCard.appendChild(globalCardDesc);

    let globalCardName = document.createElement('div');
    globalCardName.classList.add("card-all-name");
    globalCardName.textContent = name;
    globalCardDesc.appendChild(globalCardName);

    globalCardTypeNumber = document.createElement('div');
    globalCardTypeNumber.classList.add("card-all-type-number");
    globalCardDesc.appendChild(globalCardTypeNumber);
    
    globalCardType = document.createElement('div');
    globalCardType.classList.add("card-all-type");
    globalCardType.textContent = type
    globalCardTypeNumber.appendChild(globalCardType);

    globalCardNumber = document.createElement('div');
    globalCardNumber.classList.add("card-all-number");
    globalCardNumber.textContent = "n° " + number;
    globalCardTypeNumber.appendChild(globalCardNumber);
}

const selectGen = document.getElementById('gen-select');
let urlGen;

selectGen.addEventListener("change", ()=> {
    urlGen = `https://pokebuildapi.fr/api/v1/pokemon/generation/${selectGen.value}`
    getList();
})


function getList() {
    fetch(urlGen)
    .then(response =>
        response.json()
        
    ).then(data => {
        console.log(data);


        for (let pokemon of data) {
            console.log(pokemon.apiTypes[0].name);
            createCard(pokemon.image,pokemon.name,pokemon.apiTypes[0].name,pokemon.id)
            
        }
    })
}

