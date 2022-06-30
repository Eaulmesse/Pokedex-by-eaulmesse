const searchInput = document.querySelector("#input-text");
const searchSubmit = document.querySelector("#input-submit");

const searchImg = document.querySelector("#search-img-background");
const searchName = document.querySelector("#search-name-text");
const searchType = document.querySelector("#search-type-text");
const searchNumber = document.querySelector("#search-number-text");
const searchHP = document.querySelector("#search-hp");




let url = "https://pokebuildapi.fr/api/v1/pokemon/25";

searchSubmit.addEventListener('click', (e)=> {
    e.preventDefault();

    if (searchInput.value !== "") {
        url = `https://pokebuildapi.fr/api/v1/pokemon/${searchInput.value}`;
        getPokemon();
    } else {
        searchName.textContent = "Error";
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

const globalSection = document.querySelector('.card-list');
let globalCard;
let globalCardImg;
let globalCardBackground;
let globalCardDesc;
let globalCardName

let btnTest = document.getElementById('test');

function createCard(ImgBackground,name,type,number) {
   


    globalCard = document.createElement('div');
    globalCard.classList.add("card-all-generate");
    globalSection.appendChild(globalCard);
    


    globalCardImg = document.createElement('div');
    globalCardImg.classList.add("card-all-img");
    globalCard.appendChild(globalCardImg);

    globalCardBackground = document.createElement('div');
    globalCardBackground.classList.add("card-all-background");
    globalCardBackground.style.backgroundImage = `url(${ImgBackground})`;
    globalCardImg.appendChild(globalCardBackground);

    globalCardDesc = document.createElement('div');
    globalCardDesc.classList.add("card-all-desc");
    globalCard.appendChild(globalCardDesc);

    globalCardName = document.createElement('div');
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


    globalCardName.addEventListener("click", (e)=> {
        console.log(e);
        url = `https://pokebuildapi.fr/api/v1/pokemon/${e.target.textContent}`;
        getPokemon();


    });

}

const selectGen = document.getElementById('gen-select');
let urlGen = "https://pokebuildapi.fr/api/v1/pokemon/generation/1" ;

selectGen.addEventListener("change", ()=> {
    
    urlGen = `https://pokebuildapi.fr/api/v1/pokemon/generation/${selectGen.value}`
    globalSection.innerHTML = '';
    getList();
   
})



function getList() {
    fetch(urlGen)
    .then(response =>
        response.json()
        
    ).then(data => {
        console.log(data);

        for (let pokemon of data) {
            createCard(pokemon.image,pokemon.name,pokemon.apiTypes[0].name,pokemon.id)
        }
    })
}

getPokemon();
getList();




