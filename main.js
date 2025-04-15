const array = [] //Letrehozzuk az arrayt ami egy ures tomb

const containerDiv = divMaker('container'); //containerDiv letrehozasa a divMakerrel
document.body.appendChild(containerDiv);//Hozzaadjuk a bodyhoz a containerDivet

generateTable(containerDiv, (bodyOfTable) => { //Meghivjuk a generateTable fuggvenyt a containerDivval es bodyOfTablellel
    generateForm(bodyOfTable, containerDiv, array); //Meghivjuk a generateForm fuggvenyt a bodyOfTableval, containerDivval es az arrayval
    generateFileUpload(bodyOfTable, containerDiv, array); //Meghivjuk a generateFileUpload fuggvenyt a bodyOfTableval, containerDivval es az arrayval
    generateFileDownload(containerDiv, array); //Meghivjuk a generateFileDownload fuggvenyt a containerDivval es az arrayval
    generateFilterForm(containerDiv, bodyOfTable, array); //Meghivjuk a generateFilterForm fuggvenyt a containerDivval, bodyOfTableval es az arrayval

})






