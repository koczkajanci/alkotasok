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

const formDiv = divMaker('form');//formDiv letrehozasa a divMakerrel

containerDiv.appendChild(tableDiv);//Hozzaadjuk a containerDivhez a tableDivet
containerDiv.appendChild(formDiv);//Hozzaadjuk a containerDivhez a formDivet