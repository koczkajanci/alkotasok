const array = [] //Letrehozzuk az arrayt ami egy ures tomb
/**
 *  Ez a fuggveny letrehoz egy div elemet es beallitja annak az osztalynevet a parameterre amit kapott es visszater az elemmel
 * @param {string} className Az osztaly neve ami stringet var
 * @returns {HTMLDivElement} Maga a div elem
 */
const divMaker = (className) => {  //Letrehozzuk a divMaker fuggvenyt ami a classNamet varja
    const div = document.createElement('div'); //Letrehoz egy div elemet
    div.className = className//Beallitja a div osztalynevet a classNamere
    return div; //Visszater a div elemmel
}
/**
 * Ez a fuggveny egy tomb elemeit leszuri egy feltetel alapjan es visszater a leszurt tombbel
 * @param {Array} array  A tomb amit szurni szeretnenk
 * @param  {Function} callback  Egy fuggveny ami az egesz tombon vegigmegy es igazzal ter vissza ha megfelel a feltetelnek
 * @returns {Array} A leszurt tomb
 */
const filter = (array,callback) => { //Letrehozzuk a filter fuggvenyt ami az arrayt es a callbacket varja 
    const res = []; //Letrehozzuk a res tombot amibe fogjuk rakni a leszurt elemeket
    for(const elem of array) { //Vegigmegyunk az array tombon az elem valtozoval 
        if(callback(elem)){ //Ha a callback igazat ad vissza akkor belelep az ifbe
            res.push(elem); //Hozzaadja az elemet a res tombhoz
        }
    }
    return res; //Visszater a res tombbel
}
/**
 * Ez a fuggveny letrehoz egy a kontenerben es meghiv egy callback fuggvenyt a tbodyval
 * @param {HTMLDivElement} container A container amibe belekerul a tabla
 * @param {Function} callback A callback fuggveny ami a tbodyt varja
 * @returns {HTMLTableElement} A tabla ami a containerben van
 */
const generateTable = (container,callback) => {
    const tableDiv = divMaker('table');//tableDiv letrehozasa a divMakerrel
    container.appendChild(tableDiv);//Hozzaadjuk a containerhez a tableDivet
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
    callback(tableBody) // Meghivjuk a callback fuggvenyt a tbodyval
}

/**
 * Ez a fuggveny leterehoz egy feltoltesi gombot amivel betudunk tolteni egy csv fajlt a tablaba
 * @param {HTMLTableSectionElement} tablebody A tabla bodyja ahol a sorokat hozzaadjuk
 * @param {HTMLDivElement} container A container amibe belekerul a fileBemenet
 * @param {Array} array A tomb amibe belekerulnek az adatok
 * @returns {HTMLInputElement} A fileBemenet ami egy input elem
 */
const generateFileUpload = (tablebody, container, array) => {
    const fileBemenet = document.createElement('input') //Letrehozzuk a fileBemenetet ami egy input
    container.appendChild(fileBemenet) //Hozzaadjuk a containerhez a fileBemenetet
    fileBemenet.id = 'filebemenet'; //Beallitjuk a fileBemenet idjet filebemenetre
    fileBemenet.type = 'file'; //Beallitjuk a fileBemenet tipusat filera
    fileBemenet.addEventListener('change', (e) => { ////Hozzaadunk egy addEventListenert a fileBemenethez ami a change esemenyre figyel
        const fajl = e.target.files[0]; //Kivalasztjuk a fajlt
        const fileReader = new FileReader(); //Letrehozzuk a fileReadert ami egy FileReader objektum
        fileReader.onload = () => { //Hozzaadunk egy onload esemenyt a fileReaderhez ami akkor fut le ha a fajl beolvadasa megtortent
            const fajlLines = fileReader.result.split('\n'); //Beolvassuk a fajlt es elvalasztjuk a sorokat 
            const removedHeadLines = fajlLines.slice(1); //Eltavolitjuk az elso sort a fajlbol
            for(const sor of removedHeadLines){//Vegigmegyunk a removedHeadLines tombon a sorral
                const trimmedSor = sor.trim(); //Letrehozzuk a trimmedSort ami eltavolitja a sor elejen es vegen levo whitespaceket
                const mezok = trimmedSor.split(';'); //Beallitjuk a mezoket ami a sort elvalasztja az elemeket ;-vel
                const person = { //Letrehozzuk a person objektumot amibe beallitjuk hogy melyik split milyen erteket kap
                    writer: mezok[0], //Beallitjuk a person writerjet
                    genre: mezok[2], //Beallitjuk a person genrejat
                    title: mezok[1] //Beallitjuk a person titlejat
                }   
                array.push(person); //Hozzaadjuk az arrayhoz a person objektumot
                rowInsert(person, tablebody); //Meghivjuk a rowInsert fuggvenyt a person objektummal es a tableBodyval
            }
        }
        fileReader.readAsText(fajl); //Beolvassuk a fajlt
    })
}






/**
 * Ez a fuggveny letrehoz egy uralpot amivel betudunk szurni adatokat a tablaba
 * @param {HTMLTableSectionElement} tablebody A tabla bodyja ahol a sorokat hozzaadjuk
 * @param {HTMLDivElement} container A container amibe belekerul a form
 * @param {Array} array A tomb amibe belekerulnek az adatok
 * @returns {HTMLFormElement} A form ami egy form elem
 */
const generateForm = (tableBody, container, array) => {
    const formDiv = divMaker('form');//formDiv letrehozasa a divMakerrel
    container.appendChild(formDiv);//Hozzaadjuk a containerhez a formDivet
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
        field.appendChild(document.createElement('br')) //Hozzaadunk egy sortorest a fieldhez
        const input = document.createElement('input'); //Letrehozzuk egy input elemet
        input.id = element.id; //Beallitjuk az input idjet az element idjere
        field.appendChild(input); //Hozzaadjuk a fieldhez az inputot
        field.appendChild(document.createElement('br')) //Hozzaadunk meg egy sortorest a fieldhez
        const error = document.createElement('span') //Letrehozzuk az error valtozot ami egy span
        error.className = 'error' //Beallitjuk az error osztalynevet errora
        field.appendChild(error) //Hozzaadjuk a fieldhez az errort

    }   

    const formButtonElement = document.createElement('button') //Letrehozzuk a formButtonElementet ami egy button
    formButtonElement.textContent = 'hozzáadás'; //Beallitjuk a gomb szoveget
    formElement.appendChild(formButtonElement) //Hozzaadjuk a formhoz a gombot

    formElement.addEventListener('submit', (e)=> { //Hozzaadunk egy addEventListenert a formhoz ami a submit esemenyre figyel
        e.preventDefault(); //Megakadalyozzuk az alapertelmezett viselkedest
        const valueObject = {}; //Letrehozzuk a valueObjectet ami egy ures objektum 
        const inputFields = e.target.querySelectorAll('input'); //Kivalasztjuk az osszes input elemet a formban
        let valid = true; //Letrehozunk egy valid valtozot ami true
        for(const element of inputFields) { //Vegigmegyunk az input elemeket tartalmazo tombon
            const error = element.parentElement.querySelector('.error') //Megkeressuk az error elemet
            if(!error){ //Akkor megy bele az ifbe ha nincs error
                console.error('Nincs error elem a mezoben') //Ha nincs error akkor kiirjuk a konzolra
                return; //Visszaterunk
            }
            error.textContent = ''; //Beallitjuk az error szoveget uresre
            if(element.value === ''){ //Akkor megy bele az ifbe ha az input valueja ures
                error.textContent = 'Kotelezo megadni' //Beallitjuk az error szoveget
                valid = false; //Beallitjuk a valid valtozot falsera
            }
            valueObject[element.id] = element.value; //Beallitjuk az objektum kulcsait es ertekeit
        }

        if(valid){//Hogyha a valid igaz akkor lep bele az ifbe
            array.push(valueObject); //Hozzaadjuk az arrayhoz a valueObjectet
            rowInsert(valueObject, tableBody); //Meghivjuk a rowInsert fuggvenyt a valueObjecttel es a tableBodyval
        }
    })

}


/**
 *  Ez a fuggveny letrehoz egy sort a tablaban az adott adatokkal
 * @param {Object} valueObject A valueObject ami a sor adatait tartalmazza
 * @param {HTMLTableSectionElement} tableBody A tabla bodyja ahol a sorokat hozzaadjuk
 * @returns {HTMLTableRowElement} A tbodyRow ami egy tr elem
 */
const rowInsert = (valueObject, tableBody) => {
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
}

/**
 * Ez a fuggveny letrehoz egy letoltes gombot amivel le tudjuk tolteni a tablaban levo adatokat 
 * @param {HTMLDivElement} container A container amibe belekerul a letoltes gomb
 * @param {Array} array A tomb amibe belekerulnek az adatok
 * @returns {HTMLButtonElement} A letoltes gomb ami egy button elem
 */
const generateFileDownload = (container, array) => {
    const exportGomb = document.createElement('button') //Letrehozzuk az exportGombot ami a letoltesnek a gombja 
    exportGomb.textContent = 'Letoltes'; //Beallitjuk a gomb szoveget
    container.appendChild(exportGomb)// //Hozzaadjuk a containerhez az exportGombot
    exportGomb.addEventListener('click', () => {  //Hozzaadunk egy esemenyfigyelot az exportGombhoz 
        const link = document.createElement('a'); //Letrehozzuk a linket ami egy <a> elem
        const fileContent = ['writer;genre;title']; //Letrehozzuk a fajl fejlecet
        for(const person of array) {  //Vegigmegyunk az array tombon a person valtozoval
            fileContent.push(`${person.writer};${person.genre};${person.title}`);  //Hozzaadjuk a person adatait a fajlhoz
        }
        const content = fileContent.join('\n'); //Osszefuzzuk a sorokat az \n-el
        const fajl = new Blob([content]); //Letrehozunk egy Blob objektumot a fajl tartalmaval
        link.href = URL.createObjectURL(fajl); //Letrehozzuk a fajl URL-jet
        link.download = 'newdata.csv'; //Beallitjuk a letoltesi nevet
        link.click(); //Ramegyunk a linkre
        URL.revokeObjectURL(link.href);//Eltavolitjuk a letrehozott URL-t   
    })
}





/**
 * Ez a fuggveny letrehoz egy legordulo listat es egy inputot amivel szurni tudunk a tablaban
 * @param {HTMLDivElement} container A container amibe belekerul a filterFormDiv
 * @param {HTMLTableSectionElement} tablebody A tabla bodyja ahol a sorokat hozzaadjuk
 * @param {Array} array A tomb amibe belekerulnek az adatok
 * @returns {HTMLDivElement} A filterFormDiv ami egy div elem
 */
const generateFilterForm = (container, tablebody, array) => {
    const filterFormDiv = divMaker('filterform'); //Letrehozzuk a filterFormDivet a divMaker fuggvennyel
    container.appendChild(filterFormDiv); //Hozzaadjuk a containerhez a filterFormDivet

    const formFilter = document.createElement('form'); //Letrehozzuk a formFilter elemet ami egy form
    filterFormDiv.appendChild(formFilter); //Hozzaadjuk a filterFormDivhez a formot
    const select = document.createElement('select'); //Letrehozzuk a select elemet
    formFilter.appendChild(select); //Hozzaadjuk a formhoz a select elemet

    const opciok = [ //A legordulo lista opcioinak a tombje
        {
            value: '', //A value ures 
            innerText: '' //A szoveg ures
        },
        {
            value: 'writer', // //A value a writer
            innerText: 'Szerzo' //A szoveg Szerzo
        },
        {
            value: 'genre', //A value a genre
            innerText: 'Mufaj' //A szoveg Mufaj
        },
        {
            value: 'title', //A value a title
            innerText: 'Cim' //A szoveg Cim
        } 
    ]

    for(const opcio of opciok) { //Vegigmegyunk az opciok tombon
        const option = document.createElement('option'); //Letrehozzuk az option elemet
        option.value = opcio.value; //Beallitjuk az option valuejat
        option.innerText = opcio.innerText; //Beallitjuk az option szoveget
        select.appendChild(option); //Hozzaadjuk a selecthez az optiont
    }

    const input = document.createElement('input'); //Letrehozzuk az input elemet
    input.id = 'filterInput'; //Beallitjuk az input azonositojat filterInputra
    formFilter.appendChild(input); //Hozzaadjuk a formhoz az inputot

    const filterButton = document.createElement('button'); //Letrehozzuk a filterButton elemet ami egy gomb
    filterButton.innerText = 'Szures'; //A gomb szovegenek beallitjuk hogy Szures
    formFilter.appendChild(filterButton); //Hozzaadjuk a formhoz a filterButtont
    formFilter.addEventListener('submit', (e) => { //Hozzaadunk egy esemenyfigyelot a formhoz ami a submit esemenyre figyel 
        e.preventDefault(); //Megakadalyozzuk az alapertelmezett viselkedest
        const filterInput = e.target.querySelector('#filterInput'); //Kivalasztjuk a filterInput elemet
        const select = e.target.querySelector('select'); //Kivalasztjuk a select elemet

        /**
         * Leszuri az array tombot a feltetetelek alapjan 
         * Ha a legordulo listaban kivalasztott ertek es az inputnak az erteke egyenlo egy elemmel akkor az bekerul a szurt tombbe
         * @returns {Array} A szurt tomb
         */
        const filteresArray = filter(array, (elem) => { //Letrehozzuk a filteresArrayt ami a filter fuggveny visszateresi erteke

            if(select.value == 'writer'){ //Ha a select valueja writer akkor belelep az ifbe
                if(filterInput.value === elem.writer){ //Ha a filterInput valueja egyenlo az elem writerjaval akkor belelep az ifbe
                    return true; //Visszater trueval
                }
            } 
            else if(select.value == 'genre'){ //Ha a select valueja genre akkor belelep az ifbe
                if(filterInput.value === elem.genre){ //Ha a filterInput valueja egyenlo az elem genrejaval akkor belelep az ifbe
                    return true; //Visszater trueval
                }
            } 
            else if(select.value == 'title'){ //Ha a select valueja title akkor belelep az ifbe
                if(filterInput.value === elem.title){ //Ha a filterInput valueja egyenlo az elem titlejaval akkor belelep az ifbe
                    return true; //Visszater trueval
                }
            }else{ //Ha egyik feltetel sem teljesul akkor belelep az elsebe
                return true; //Visszater trueval
            }
        })

        tablebody.innerHTML = ''; //Reseteljuk a tableBodyt
        for(const elem of filteresArray) { //Vegigmegyunk a filteresArray tombon
            rowInsert(elem, tablebody); //Meghivjuk az addRow fuggvenyt a filteresArray elemeivel
        }

    })
}

const containerDiv = divMaker('container'); //containerDiv letrehozasa a divMakerrel
document.body.appendChild(containerDiv);//Hozzaadjuk a bodyhoz a containerDivet

generateTable(containerDiv, (bodyOfTable) => { //Meghivjuk a generateTable fuggvenyt a containerDivval es bodyOfTablellel
    generateForm(bodyOfTable, containerDiv, array); //Meghivjuk a generateForm fuggvenyt a bodyOfTableval, containerDivval es az arrayval
    generateFileUpload(bodyOfTable, containerDiv, array); //Meghivjuk a generateFileUpload fuggvenyt a bodyOfTableval, containerDivval es az arrayval
    generateFileDownload(containerDiv, array); //Meghivjuk a generateFileDownload fuggvenyt a containerDivval es az arrayval
    generateFilterForm(containerDiv, bodyOfTable, array); //Meghivjuk a generateFilterForm fuggvenyt a containerDivval, bodyOfTableval es az arrayval

})






