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

const pokeName = document.createElement('h2');
const pokeImage = document.createElement('img');
const hiddenAb = document.createElement('div');
const pokeball = document.createElement('img');
const typeBox = document.createElement('div');
const typing = document.createElement('ul');
const statsUl = document.createElement('ul');
const statsUlBox = document.createElement('div');
pokeball.src = "Pokeball-1.gif";
const pokeAbility = document.createElement('ol')
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
function nameH2(response){
    pokeName.innerText = `Name: ${response.data.name}`;
    dexDisplay.appendChild(pokeName);
}
function imgDisplay(){
    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexSelector.value}.png`
    pokeImage.className = 'pokeImage'
    dexDisplay.appendChild(pokeImage);

}
function abilitiesResponse(response){
    const abRes = response.data.abilities;
    const abilityHeader = document.createElement('h3')
    abilityHeader.innerText = 'Abilities: '
    pokeAbility.appendChild(abilityHeader);
    for (i=0; i< abRes.length; i++){
        const ability = document.createElement('li')
        ability.innerText = `${abRes[i].ability.name}`
        pokeAbility.appendChild(ability)
        if(abRes[i].is_hidden === true){
            hiddenAb.innerText = '(hidden ability)'
            ability.appendChild(hiddenAb);
        }
        dexDisplay.appendChild(pokeAbility)
    }
}
function typesRes(response){
    const types = response.data.types;
    for (i=0; i<types.length; i++){
        const type = document.createElement('li');
        type.innerText = types[i].type.name;
        typing.appendChild(type);
    }
    typeBox.innerText = 'Type(s): ';
    typeBox.appendChild(typing);
    dexDisplayTwo.appendChild(typeBox);
}
function statsResponse(response){
    const statName = response.data.stats;
    for(i=0;i<statName.length;i++){
        const statNameLi = document.createElement('li');
        statNameLi.innerText =`${statName[i].stat.name} ${statName[i].base_stat}` ;
        statsUl.appendChild(statNameLi);
    }
    statsUlBox.innerText = "Stats: "
    statsUlBox.appendChild(statsUl);
    dexDisplayTwo.appendChild(statsUlBox);
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
                    if (child === false){
                       removeElements();
                    }
                    console.log(response)
                    nameH2(response);
                    imgDisplay();
                    abilitiesResponse(response);
                    typesRes(response);
                    statsResponse(response);
                    child = false;
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
