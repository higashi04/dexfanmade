const dexSelector = document.querySelector('.dexNumber');
const dexDisplay = document.querySelector('.dexDisplay');
const form = document.querySelector('#form');
let child = true;

for (let i = 1; i < 899; i++) {
    const optionNumber = document.createElement('option');
    optionNumber.value = i;
    optionNumber.text = i;
    dexSelector.appendChild(optionNumber);
};

const pokeball = document.createElement('img');
pokeball.src = "Pokeball-1.gif";

form.addEventListener('submit', async function getPokemon(e) {
    e.preventDefault();
        try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${dexSelector.value}/`);
                console.log(response);
                console.log(response.data.name);
                if (child === true) {
                    dexDisplay.removeChild(pokeball);
                    const pokeName = document.createElement('div');
                    pokeName.innerText = response.data.name;
                    dexDisplay.appendChild(pokeName);
                    child = false;
                }

            } catch (error) {
                console.error(error);
  }
})

if (dexSelector.value  === 'Select a number') {
    dexDisplay.appendChild(pokeball);
    child = true;
} else { 
    getPokemon();
}
