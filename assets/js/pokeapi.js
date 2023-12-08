
const pokeApi = {}

function convertPokeApiToPkm(pkDetail){
    const pkm = new Pokemon()
    pkm.number = pkDetail.id
    pkm.name   = pkDetail.name
    const types  = pkDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pkm.types = types
    pkm.type   = type
    pkm.photo  = pkDetail.sprites.other.dream_world.front_default
    return pkm
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiToPkm)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)

        .catch((error) => console.log(`[ERROR]: ${error}`))
}