const animaisGif = document.getElementById("pokemon-ul");
const animaisTexto = document.querySelectorAll(".animal-texto span");
const controle = document.querySelectorAll(".controle-button");
const somar = document.querySelector("#somar");
const subtrair = document.querySelector("#subtrair");
let index = 0;

$("#somar").click(() => mudarAnimal("somar"));

// somar.addEventListener("click", () => {
//   mudarAnimal("somar");
// });

subtrair.addEventListener("click", () => {
  mudarAnimal("subtrair");
});

function animalEscolhido(index) {
  animaisGif.children[index].classList.add("ativo");
}

function mudarAnimal(operacao) {
  if (operacao === "somar" && index < animaisGif.children.length - 1) {
    animaisGif.children[index].classList.remove("ativo");
    animalEscolhido((index += 1));
  }
  if (operacao === "subtrair" && index > 0) {
    animaisGif.children[index].classList.remove("ativo");
    animalEscolhido((index -= 1));
  }
}

fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151").then((resp) => {
  resp.json().then((json) => {
    console.log(json);
    const pokeResult = json;
    pokeResult.results.forEach((element, i) => {
      fetch(element.url).then((resppoke) => {
        resppoke.json().then((jsonpoke) => {
          const li = document.createElement("li");
          const img = document.createElement("img");
          const spanDiv = document.createElement("span");
          const div = document.createElement("div");
          div.setAttribute("class", "animal-texto");
          spanDiv.setAttribute("class", "ativo");

          img.setAttribute("src", jsonpoke.sprites.front_default);
          spanDiv.innerHTML = element.name;
          div.appendChild(spanDiv);
          li.appendChild(img);
          li.appendChild(div);
          animaisGif.appendChild(li);
          if (i === 0) {
            li.setAttribute("class", "ativo");
          }
        });
      });
    });
  });
});
