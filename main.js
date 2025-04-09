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
 for (const cellText of headerCells) {
     const headerCell = document.createElement('th') // Letrehozunk egy th elemet
    headerCell.innerText = cellText // Beallitjuk a cella szoveget
    headerRow.appendChild(headerCell) // Hozzaadjuk a sorhoz
 }
 const tableBody = document.createElement('tbody') // Letrehozunk egy tbody elemet
 tableElement.appendChild(tableBody) // Hozzaadjuk a tablehez

const formDiv = divMaker('form');//formDiv letrehozasa a divMakerrel

containerDiv.appendChild(tableDiv);//Hozzaadjuk a containerDivhez a tableDivet
containerDiv.appendChild(formDiv);//Hozzaadjuk a containerDivhez a formDivet