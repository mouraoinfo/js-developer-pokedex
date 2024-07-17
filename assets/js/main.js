const pokemonList = document.getElementById('pokemonList')
const detalhado = document.getElementById('detalhado')


const loadMoreButton = document.getElementById('loadMoreButton')
const detalhadoButton = document.getElementsByClassName('detalhadoButton')
let showListButton = document.getElementById('showListButton')

const maxRecords = 151
const limit = 8
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <button class="btn" onclick='loadSelectedPokemon(${JSON.stringify(pokemon)})'>Ver em 3D</button>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        
    })
}

function showListbutton() {
   
   
    detalhado.style.display = "none";
    pokemonList.style.display = "grid";
   loadMoreButton.style.display = "block";
    
}

loadPokemonItens(offset, limit)


function loadSelectedPokemon(pokemon) {
    detalhado.innerHTML = `
    <h1>DETALHAMENTO</h1>
        <div class="pokemon pokemonDetalhe ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

           
                <img class="detailImage" src="${pokemon.img}"
                     alt="${pokemon.name}">
            

           <button class="btn" id="showListButton" onclick="showListbutton()" type="button">  Mostrar Lista     </button>
        </div>
    `
    detalhado.style.display = "block";
    pokemonList.style.display = "none";
      loadMoreButton.style.display = "none";
}



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

