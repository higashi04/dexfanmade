const dexSelector = document.querySelector('.dexNumber');
const dexDisplayTwo = document.querySelector('.dexDisplayTwo')
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
const typeBox = document.createElement('div');
const typing = document.createElement('ul');
const statsUl = document.createElement('ul');
const statsUlBox = document.createElement('div');
pokeball.src = "Pokeball-1.gif";
const pokeAbility = document.createElement('div')
function removeElements() {
    dexDisplay.removeChild(pokeName);
    dexDisplay.removeChild(pokeImage);
    typeBox.innerText = " ";
    typing.innerHTML = " ";
    pokeAbility.innerText = " ";
    statsUlBox.innerText = " ";
    statsUl.innerHTML = " ";
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
                    console.log(response)
                    const abRes = response.data.abilities;
                    const types = response.data.types;
                    const statName = response.data.stats;
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
                    for (i=0; i<types.length; i++){
                        const type = document.createElement('li');
                        type.innerText = types[i].type.name;
                        typing.appendChild(type);
                    }
                    typeBox.innerText = 'Type(s): ';
                    typeBox.appendChild(typing);
                    dexDisplayTwo.appendChild(typeBox);
                    for(i=0;i<statName.length;i++){
                        const statNameLi = document.createElement('li');
                        const statsValue = document.createElement('span');
                        statsValue.innerText = ` ${statName[i].base_stat}`
                        statNameLi.innerText = statName[i].stat.name;
                        statNameLi.appendChild(statsValue);
                        statsUl.appendChild(statNameLi);
                    }
                    statsUlBox.innerText = "Stats: "
                    statsUlBox.appendChild(statsUl);
                    dexDisplayTwo.appendChild(statsUlBox);

            } catch (error) {
                console.error(error);
  }
}})

if (dexSelector.value  === 'Select a number') {
    dexDisplay.appendChild(pokeball);
    child = true;
} else { 
    getPokemon();
}
