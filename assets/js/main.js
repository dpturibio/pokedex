const ol = document.getElementById('pkmList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 15
let offset = 0
maxRecords = 151

function loadPokemonItens(offset , limit){
    function convertPkmToHtml(pokemon){
        return 
    }

    pokeApi.getPokemons(offset , limit).then((pokemonList = []) => {
            console.log(`Resposta da requisição: ${pokemonList}`)
            ol.innerHTML += pokemonList.map((pokemon => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}" srcset="">
                    </div>
                </li>
            `)).join('')
        })
        .catch((error) => console.log(`Erro na requisição da api: url:${url}, erro:${error}`))
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset+= limit
    const qtdRecord = offset + limit
    if (qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})