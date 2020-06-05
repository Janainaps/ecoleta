//PUXA DADOS DE LOCALIZAÇÃO COM API E MODIFICAÇÃO DOS DADOS NA URL
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    const url1 = ("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    fetch (url1)
    .then(res => res.json())
    .then( states => {
        for (const state of states){
        ufSelect.innerHTML =  ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

//Função que puxa a cidade
function getCities (event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    //Troca nome do estado através do indice da lista de estados em array
    const indexOfselectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfselectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = ""; //apaga nome da cidade para depois incluir o texto dinâmico
    citySelect.disabled = true;

    fetch (url)
    .then(res => res.json())
    .then( cities => {
        
        for (const city of cities){
        citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
        //Só permite selecionar cidade quando o estado é selecionado previamente
        citySelect.disabled = false
    })

}

//Dinamismo: muda a listagem de cidades toda vez que estado é selecionado/modificado
document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


//Itens de coleta
const itemsCollected = document.querySelectorAll(".items-grid li")
for (const item of itemsCollected){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector["input[name=items"]

let selectedItems = []

function handleSelectedItem(event) {
    //adicionar ou remover classe com JS (toggle)
    const itemLi = event.target
    itemLi.classList.toggle("selected") 
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //valor boolean, será true or false
        return itemFound
    })

    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}