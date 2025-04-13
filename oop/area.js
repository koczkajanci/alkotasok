/**
 *Az Area osztaly div elemeket hoz letre es ad hozza egy kontenerhez
 */
class Area{ // Osztaly letrehozasa
    #div; //Letrehozunk a div privat valtozot
    
    /** 
     * Getter a privat valtozohoz
     * @returns {HTMLDivElement} A privat valtozo
     */
    get div(){ //Letrehozunk egy gettert a privat valtozohoz
        return this.#div; //Visszater a privat valtozoval
    }

     /**
     * Megnezi hogy van e mar containeroop container, ha nincs letrehozzuk
     * 
     * @param {string} className A div osztalyneve ami stringet var
     */
    constructor(className){// //Konstruktor letrehozasa
        let containerDiv = document.querySelector('.containeroop'); //Megkeressuk a containeroop containert
        if(!containerDiv){ //Akkor megy bele az ifbe ha nem letezik a containeroop container
            containerDiv = document.createElement('div'); //Uj div letrehozasa
            containerDiv.className = 'containeroop'; //Beallitjuk az osztalynevet containeroopra
            document.body.appendChild(containerDiv); //hozzaadjuk a bodyhoz
        }
        this.#div = document.createElement('div'); //Uj div letrehozasa
        this.#div.className = className; //Beallitjuk az osztalynevet a parameterre
        containerDiv.appendChild(this.#div); //Hozzaadjuk a containeroophoz

    }
}

/**
 * Az Table osztaly a terulet osztalybol szarmazik es letrehoz egy tablat fejlrc cellakkal
 * 
 */
class Table extends Area{
    /**
     *  
     * Ez a konstruktor létrehoz egy táblázatot fejléc cellákkal és hozzáadja a szülő div elemhez.
     * @param {string} className A div osztalyneve ami stringet var
     */
    constructor(className){// //Konstruktor letrehozasa
        super(className);//Meghivjuk a szulo osztaly konstruktorat
        const tableElement = document.createElement('table'); // Letrehozunk egy table elemet
        this.div.appendChild(tableElement); // Hozzaadjuk a divhez
        const tableHeader = document.createElement('thead'); // Letrehozunk egy thead elemet
        tableElement.appendChild(tableHeader); // Hozzaadjuk a tablehez
        const headerRow = document.createElement('tr'); // Letrehozunk egy tr elemet
        tableHeader.appendChild(headerRow); // Hozzaadjuk a theadhez
        const headerCells = ['Szerzo', 'mufaj', 'cim']; // A fejlec cellainak tartalma
        for (const cellText of headerCells) { //Vegigmegyunk a headerCells tombon
            const headerCell = document.createElement('th'); // Letrehozunk egy th elemet
            headerCell.innerText = cellText; // Beallitjuk a cella szoveget
            headerRow.appendChild(headerCell); // Hozzaadjuk a sorhoz
        }
        const tableBody = document.createElement('tbody'); // Letrehozunk egy tbody elemet
        tableElement.appendChild(tableBody); // Hozzaadjuk a tablehez
    }
}