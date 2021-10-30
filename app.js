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
const pokeName = document.createElement('div');
const pokeAbility = document.createElement('div');
const pokeImage = document.createElement('img');
const pokeball = document.createElement('img');
pokeball.src = "Pokeball-1.gif";
function removeElements() {
    dexDisplay.removeChild(pokeName);
    dexDisplay.removeChild(pokeImage);
    dexDisplay.removeChild(pokeAbility);
}

form.addEventListener('submit', async function getPokemon(e) {
    e.preventDefault();
    if (dexSelector.value  === 'Select a number') {
        removeElements();
        dexDisplay.appendChild(pokeball);
        child = true;
    } else {
        try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${dexSelector.value}/`);
                    if(child === true){
                        dexDisplay.removeChild(pokeball);
                    }
                    let currentDexEtntry = dexSelector.value;
                    if (dexSelector.value !== currentDexEtntry){
                       removeElements();
                    }
                    console.log(response.data.abilities[0].ability.name);
                    console.log(response.data.abilities[1].ability.name);
                    pokeName.innerText = `Name: ${response.data.name}`;
                    pokeAbility.innerText = `Ability: ${response.data.abilities[0].ability.name}`;
                    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexSelector.value}.png`
                    dexDisplay.appendChild(pokeName);
                    dexDisplay.appendChild(pokeAbility);
                    dexDisplay.appendChild(pokeImage);
                    child = false;
                    console.log(child);

            } catch (error) {
                console.error(error);
  }
}})

if (dexSelector.value  === 'Select a number') {
    dexDisplay.appendChild(pokeball);
    child = true;
    console.log(child)
} else { 
    getPokemon();
}
