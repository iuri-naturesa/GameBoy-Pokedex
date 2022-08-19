const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonNumero = document.querySelector(".pokemon-numero");
const pokemonImg = document.querySelector(".pokemon-img");

const form = document.querySelector(".form");
const input = document.querySelector(".input-search");

const esquerda = document.querySelector(".esquerda");
const direita = document.querySelector(".direita");

let procurar = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNome.innerHTML = "Carregando...";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImg.style.display = "block";
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImg.src =
      data.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ];
    procurar = data.id;
  } else {
    pokemonImg.style.display = "none";
    pokemonNome.innerHTML = "Não existe";
    pokemonNumero.innerHTML = "";
  }
};
form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
  input.value = "";
});

esquerda.addEventListener("click", () => {
  if (procurar > 1) {
    procurar -= 1;
    renderPokemon(procurar);
  }
});
direita.addEventListener("click", () => {
  procurar += 1;
  renderPokemon(procurar);
});
renderPokemon("1");
