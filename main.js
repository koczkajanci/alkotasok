const array = [] //Letrehozzuk az arrayt ami egy ures tomb
/**
 * 
 * @param {string} className Az osztaly neve ami stringet var
 * @returns {HTMLDivElement} Maga a div elem
 */
const divMaker = (className) => {  //Letrehozzuk a divMaker fuggvenyt ami a classNamet varja
    const div = document.createElement('div'); //Letrehoz egy div elemet
    div.className = className//Beallitja a div osztalynevet a classNamere
    return div; //Visszater a div elemmel
}

const containerDiv = divMaker('container'); //containerDiv letrehozasa a divMakerrel
document.body.appendChild(containerDiv);//Hozzaadjuk a bodyhoz a containerDivet
const tableDiv = divMaker('table');//tableDiv letrehozasa a divMakerrel
const tableElement = document.createElement('table') // Letrehozunk egy table elemet
 tableDiv.appendChild(tableElement) // Hozzaadjuk a tableDivhez
 const tableHeader = document.createElement('thead') // Letrehozunk egy thead elemet
 tableElement.appendChild(tableHeader) // Hozzaadjuk a tablehez
 const headerRow = document.createElement('tr') // Letrehozunk egy tr elemet
 tableHeader.appendChild(headerRow) // Hozzaadjuk a theadhez
 const headerCells = ['Szerzo', 'mufaj', 'cim'] // A fejlec cellainak tartalma
 for (const cellText of headerCells) { //Vegigmegyunk a headerCells tombon
     const headerCell = document.createElement('th') // Letrehozunk egy th elemet
    headerCell.innerText = cellText // Beallitjuk a cella szoveget
    headerRow.appendChild(headerCell) // Hozzaadjuk a sorhoz
 }
 const tableBody = document.createElement('tbody') // Letrehozunk egy tbody elemet
 tableElement.appendChild(tableBody) // Hozzaadjuk a tablehez

const formDiv = divMaker('form');//formDiv letrehozasa a divMakerrel



const formElement = document.createElement('form') // Letrehozunk egy form elemet
formDiv.appendChild(formElement) // Hozzaadjuk a formDivhez
const fieldElements = [{//Letrehozzuk a fieldElements tombot
    id: 'writer', // Elso mezo idje
    label: 'Szerzo', // Elso mezo labelje
},
{
    id: 'genre', // Masodik mezo idje
    label: 'mufaj', // Masodik mezo labelje
}, 
{
    id: 'title', // Harmadik mezo idje
    label: 'cim', // Harmadik mezo labelje
}] 

for(const element of fieldElements){ //Vegigmegyunk a fieldElements tombon az element valtozoval
    const field = divMaker('field'); //Letrehozzuk a field valtozot ami a divMakerrel keszul
    formElement.appendChild(field); //Hozzaadjuk a formhoz a fieldet
    const label = document.createElement('label'); //Letrehozzuk egy label elemet
    label.htmlFor =  element.id; //Beallitjuk a label htmlForjat az element idjere
    label.textContent = element.label; //Beallitjuk a label szoveget az element labeljere
    field.appendChild(label); //Hozzaadjuk a fieldhez a labelt
    const input = document.createElement('input'); //Letrehozzuk egy input elemet
    input.id = element.id; //Beallitjuk az input idjet az element idjere
    field.appendChild(document.createElement('br')) //Hozzaadunk egy sortorest a fieldhez
    field.appendChild(input); //Hozzaadjuk a fieldhez az inputot
}   

const formButtonElement = document.createElement('button') //Letrehozzuk a formButtonElementet ami egy button
formButtonElement.textContent = 'hozzáadás'; //Beallitjuk a gomb szoveget
formElement.appendChild(formButtonElement) //Hozzaadjuk a formhoz a gombot

formElement.addEventListener('submit', (e)=> { //Hozzaadunk egy addEventListenert a formhoz ami a submit esemenyre figyel
    e.preventDefault(); //Megakadalyozzuk az alapertelmezett viselkedest
    const valueObject = {}; //Letrehozzuk a valueObjectet ami egy ures objektum 
    const inputFields = e.target.querySelectorAll('input'); //Kivalasztjuk az osszes input elemet a formban
    for(const inputField of inputFields) { //Vegigmegyunk az input elemeket tartalmazo tombon
        valueObject[inputField.id] = inputField.value; //Beallitjuk az objektum kulcsait es ertekeit
    }
    array.push(valueObject); //Hozzaadjuk az arrayhoz az objektumot
    const tbodyRow = document.createElement('tr'); //Letrehozzuk a tbodyRowt ami egy tr
    tableBody.appendChild(tbodyRow); //Hozzaadjuk a tbodyhoz a tbodyRowt

    const writerCell = document.createElement('td'); //Letrehozzuk a writerCellt ami egy td
    writerCell.textContent = valueObject.writer; //Beallitjuk a cella szoveget
    tbodyRow.appendChild(writerCell); //Hozzaadjuk a tbodyRowhoz a writerCellt
    
    const genreCell = document.createElement('td'); //Letrehozzuk a genreCellt ami egy td
    genreCell.textContent = valueObject.genre; //Beallitjuk a cella szoveget
    tbodyRow.appendChild(genreCell); //Hozzaadjuk a tbodyRowhoz a genreCellt

    const titleCell = document.createElement('td'); //Letrehozzuk a titleCellt ami egy td
    titleCell.textContent = valueObject.title; //Beallitjuk a cella szoveget
    tbodyRow.appendChild(titleCell); //Hozzaadjuk a tbodyRowhoz a titleCellt

})

containerDiv.appendChild(tableDiv);//Hozzaadjuk a containerDivhez a tableDivet
containerDiv.appendChild(formDiv);//Hozzaadjuk a containerDivhez a formDivet