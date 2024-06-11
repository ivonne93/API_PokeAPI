
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

// URL base para obtener datos de Pokémon desde la API.
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Itera desde el número 1 hasta el 151 para obtener datos de cada Pokémon.
for (let i = 1; i <= 151; i++) {
    // Realiza una solicitud fetch a la API de Pokémon para obtener los datos del Pokémon con el número actual.
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
}

// Función para mostrar la información de un Pokémon en el HTML.
function mostrarPokemon(poke) {
    // Crea una cadena de HTML con los tipos de Pokémon y los convierte en una cadena única.
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // Convierte el ID del Pokémon a una cadena y ajusta el formato para asegurarse de que siempre tenga tres dígitos.
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Crea un nuevo elemento 'div' para mostrar la información del Pokémon.
    const div = document.createElement("div");
    div.classList.add("pokemon");
    // Inserta el HTML con la información del Pokémon en el 'div' creado.
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;

    listaPokemon.append(div);
}

// Evento que se activa cada vez que se hace clic en un botón.
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {

    const botonId = event.currentTarget.id;

    // Limpia el contenido del elemento 'listaPokemon'.
    listaPokemon.innerHTML = "";

    // Itera desde el número 1 hasta el 151 para obtener datos de cada Pokémon.
    for (let i = 1; i <= 151; i++) {

        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                // Si el ID del botón es "ver-todos", muestra todos los Pokémon.
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    // Si el ID del botón no es "ver-todos", filtra los Pokémon por tipo y muestra solo los que coinciden.
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            });
    }
}));
