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
const pokeImage = document.createElement('img');
const hiddenAb = document.createElement('div');
const pokeball = document.createElement('img');
pokeball.src = "Pokeball-1.gif";
const pokeAbility = document.createElement('div')
function removeElements() {
    dexDisplay.removeChild(pokeName);
    dexDisplay.removeChild(pokeImage);
    pokeAbility.innerText = " ";
}
for (let i = 1; i < 899; i++) {
    const optionNumber = document.createElement('option');
    optionNumber.value = i;
    optionNumber.text = i;
    dexSelector.appendChild(optionNumber);
};

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
                    if (child === false){
                       removeElements();
                    }
                    
                    const abRes = response.data.abilities
                    console.log(abRes)
                    pokeName.innerText = `Name: ${response.data.name}`;
                    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexSelector.value}.png`
                    pokeImage.className = 'pokeImage'
                    dexDisplay.appendChild(pokeName);
                    dexDisplay.appendChild(pokeImage);
                    child = false;
                    for (i=0; i< abRes.length; i++){
                        const ability = document.createElement('div')
                        ability.innerText = `Ability: ${abRes[i].ability.name}`
                        pokeAbility.appendChild(ability)
                        if(abRes[i].is_hidden === true){
                            hiddenAb.innerText = 'hidden ability'
                            ability.appendChild(hiddenAb);
                        }
                        dexDisplay.appendChild(pokeAbility)
                    }
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
