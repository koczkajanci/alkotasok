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
     * Ez a konstruktor letrehoz egy div elemet es hozzaadja a szulo divhez.
     * 
     * @param {string} className A div osztalyneve ami stringet var
     */
    constructor(className){// //Konstruktor letrehozasa

        const container = this.#getContainerDiv(); //Meghivjuk a getContainerDiv fuggvenyt amit a container valtozoba rakunk
        this.#div = document.createElement('div'); //Uj div letrehozasa
        this.#div.className = className; //Beallitjuk az osztalynevet a parameterre
        container.appendChild(this.#div); //Hozzaadjuk a containerhez
       
    }
    /**
     * Ez a fuggveny megszerzi a containeroop containert, ha nem letezik letrehozza
     * @returns {HTMLDivElement} Visszater a containeroop containerrel
     */
    #getContainerDiv(){ //Letrehozunk egy privat fuggvenyt ami megszerzi a containeroop containert
        let containerDiv = document.querySelector('.containeroop'); //Megkeressuk a containeroop containert
        if(!containerDiv){ //Akkor megy bele az ifbe ha nem letezik a containeroop container
            containerDiv = document.createElement('div'); //Uj div letrehozasa
            containerDiv.className = 'containeroop'; //Beallitjuk az osztalynevet containeroopra
            document.body.appendChild(containerDiv); //hozzaadjuk a bodyhoz
        }
        return containerDiv; //Visszater a containerDivvel
    }
}

/**
 * Az Table osztaly a terulet osztalybol szarmazik es letrehoz egy tablat fejlrc cellakkal
 * 
 */
class Table extends Area{
    /**
     *  
     * Ez a konstruktor lekeri a szulo osztaly konstruktorat es meghivja a createTable fuggvenyt
     * @param {string} className A div osztalyneve ami stringet var
     */
    constructor(className){// //Konstruktor letrehozasa
        super(className);//Meghivjuk a szulo osztaly konstruktorat
        const tbody = this.#createTable(); // Meghivjuk a createTable fuggvenyt es belerakjuk a tbody valtozoba
       
    }

    /**
     * Ez a fuggveny letrehoz egy tablat fejleccel es visszater a tbodyval
     * @returns {HTMLTableSectionElement} A tableBody elememel ter vissza ami egy HTMLTableSectionElement
     */
    #createTable(){
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
        return tableBody; //Visszater a tableBodyval
    }
}
/**
 * Ez az ostaly az Area osztalybol szarmazik es letrehoz egy űrlapot mezokkel es egy gombbal 
 */
class Form extends Area{
    /**
     * Ez a konstruktor létrehoz egy űrlapot mezőkkel és hozzáadja a szülő div elemhez.
     * @param {string} className A div osztalyneve ami stringet var
     */
    constructor(className,fieldElements){// //Konstruktor letrehozasa
        super(className);//Meghivjuk a szulo osztaly konstruktorat
        const formElement = document.createElement('form'); // Letrehozunk egy form elemet
        this.div.appendChild(formElement); // Hozzaadjuk a divhez
        
        for(const element of fieldElements){ //Vegigmegyunk a fieldElements tombon az element valtozoval
            const field = document.createElement('div'); // Letrehozunk egy div elemet a mezokhoz
            formElement.appendChild(field); // Hozzaadjuk a formhoz a fieldet
            const label = document.createElement('label'); // Letrehozunk egy label elemet
            label.htmlFor = element.id; // Beallitjuk a label htmlForjat az element idjere
            label.textContent = element.label; // Beallitjuk a label szoveget az element labeljere
            field.appendChild(label); // Hozzaadjuk a fieldhez a labelt
            const input = document.createElement('input'); // Letrehozunk egy input elemet
            input.id = element.id; // Beallitjuk az input idjet az element idjere
            field.appendChild(document.createElement('br')); // Hozzaadunk egy sortorest a fieldhez
            field.appendChild(input); // Hozzaadjuk a fieldhez az inputot
        }   

        const button = document.createElement('button'); //Letrehozzuk a gombot
        button.textContent = 'hozzáadás'; //Beallitjuk a gomb szoveget
        formElement.appendChild(button); //Hozzaadjuk a formhoz a gombot

    }
}