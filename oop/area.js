/**
 *Az Area osztaly div elemeket hoz letre es ad hozza egy kontenerhez
 */
class Area{ // Osztaly letrehozasa
    #div; //Letrehozunk a div privat valtozot
    #manager; //Letrehozunk egy privat valtozot a managernek
    
    /** 
     * Getter a div privat valtozohoz
     * @returns {HTMLDivElement} A privat valtozo
     */
    get div(){ //Letrehozunk egy gettert a privat valtozohoz
        return this.#div; //Visszater a privat valtozoval
    }
    /**
     *  Getter a manager privat valtozohoz
     *  @returns {Manager} A Manager tipusu privat valtozoval ter vissza
     */
    get manager(){ //Letrehozunk egy gettert a managernek
        return this.#manager; //Visszater a privat valtozoval
    }

     /**
     * Ez a konstruktor letrehoz egy div elemet es hozzaadja a szulo divhez.
     * 
     * @param {string} className A div osztalyneve ami stringet var
     * @param {Manager} manager A manager objektum ami a Person objektumokat kezeli
     * 
     */
    constructor(className,manager){// //Konstruktor letrehozasa
        this.#manager = manager; //Beallitjuk a manager privat valtozot a parameterre
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
     * amivel letrehoz egy tablet es beallitja a Manager callback fuggvenyet hogy frissitse uj adatokkal
     * 
     * @param {string} className A div osztalyneve ami stringet var
     * @param {Manager} manager A manager objektum ami a Person objektumokat kezeli
     */
    constructor(className,manager){// //Konstruktor letrehozasa
        super(className,manager);//Meghivjuk a szulo osztaly konstruktorat
        const tbody = this.#createTable(); // Meghivjuk a createTable fuggvenyt es belerakjuk a tbody valtozoba
        this.manager.addPersonCallback((person) => { // Meghivjuk a manager addPersonCallback fuggvenyet
            const tbodyRow = document.createElement('tr'); // Letrehozunk egy tr elemet a tbodyhoz

            const writerCell = document.createElement('td'); // Letrehozunk egy td elemet a szerzohoz
            writerCell.innerText = person.writer; // Beallitjuk a cella szoveget a person writerjere
            tbodyRow.appendChild(writerCell); // Hozzaadjuk a tbodyRowhoz a writerCellt

            const genreCell = document.createElement('td'); // Letrehozunk egy td elemet a mufajhoz
            genreCell.innerText = person.genre; // Beallitjuk a cella szoveget a person genrejere
            tbodyRow.appendChild(genreCell); // Hozzaadjuk a tbodyRowhoz a genreCellt

            const titleCell = document.createElement('td'); // Letrehozunk egy td elemet a cimhez
            titleCell.innerText = person.title; // Beallitjuk a cella szoveget a person titlejere
            tbodyRow.appendChild(titleCell); // Hozzaadjuk a tbodyRowhoz a titleCellt
            tbody.appendChild(tbodyRow); // Hozzaadjuk a tbodyhoz a tbodyRowt
        }) 
       
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

    #formFieldTomb; 
    /**
     * Ez a konstruktor létrehoz egy űrlapot mezőkkel és hozzáadja a szülő div elemhez.
     * @param {string} className A div osztalyneve ami stringet var
     * @param {Array} fieldElements A mezok elemei amik egy tombben vannak
     * @param {Manager} manager A manager objektum ami a Person objektumokat kezeli
     */
    constructor(className,fieldElements, manager){// //Konstruktor letrehozasa
        super(className,manager);//Meghivjuk a szulo osztaly konstruktorat
        this.#formFieldTomb = []; //Letrehozunk egy privat tombot ami meg ures
        const formElement = document.createElement('form'); // Letrehozunk egy form elemet
        this.div.appendChild(formElement); // Hozzaadjuk a divhez
        
        for(const element of fieldElements){ //Vegigmegyunk a fieldElements tombon az element valtozoval
            const formInputField = new FormInputField(element.id, element.label); //Letrehozzuk a formInputFieldet az element idjaval es labeljevel
            this.#formFieldTomb.push(formInputField); //Hozzaadjuk a formInputFieldet a #formFieldTombhoz
            formElement.appendChild(formInputField.divGetter()); //Hozzaadjuk a formhoz a formInputFieldet
        }   

        const button = document.createElement('button'); //Letrehozzuk a gombot
        button.textContent = 'hozzáadás'; //Beallitjuk a gomb szoveget
        formElement.appendChild(button); //Hozzaadjuk a formhoz a gombot
        formElement.addEventListener('submit', (e)=> { ////Hozzaadunk egy addEventListenert a formhoz ami a submit esemenyre figyel
            e.preventDefault();//Megakadalyozzuk az alapertelmezett viselkedest
            const valueObject = {}; //Letrehozzuk a valueObjectet ami egy ures objektum
            let valid = true; //Letrehozzuk a valid valtozot amit igazra allitunk
            for(const field of this.#formFieldTomb){ //Vegigmegyunk a #formFieldTomb tombon 
                field.error = ''; //Beallitjuk az errort uresre
                if(field.value === ''){ //Ha az input valueja ures
                    field.error = 'Kotelezo megadni'; //Beallitjuk az error szoveget
                    valid = false; //Beallitjuk a valid valtozot hamisra
                }
                valueObject[field.id] = field.value; //Beallitjuk a valueObjectet az input idjaval es valuejaval
            }

            if(valid){//Akkor megy bele az ifbe ha a valid igaz
                const person = new Person(valueObject.writer, valueObject.genre, valueObject.title); //Letrehozzuk a person objektumot a valueObjectbol
                this.manager.addPerson(person);//Hozzaadjuk a managerhez a person objektumot
            }
           
        })

    }
}
/**
 * Ez az osztaly az Area osztalybol szarmazik es letrehoz fajl feltoltesi mezot amit sorokra bont, feldolgoz es hozzaad a Managerhez
 */
class Upload extends Area{
    /**
     * Letrehoz egy Upload objektumot  ami egy fajl input mezot tartalmaz
     * @param {string} className A div osztalyneve ami stringet var
     * @param {Manager} manager A manager objektum ami a Person objektumokat kezeli
     *  
     */
    constructor(className, manager){ //Letrehozzuk a konstruktort
        super(className, manager); //Meghivjuk a szulo osztaly konstruktorat
        const fileBemenet = document.createElement('input'); //Letrehozzuk a bemeneti mezot ami input tipusu
        fileBemenet.id = 'filebemenet'; //Beallitjuk az idjat filebemenetre
        fileBemenet.type = 'file'; //Beallitjuk a tipusat fajlbeviteli mezore
        this.div.appendChild(fileBemenet);  //Hozzaadjuk a divhez a fileBemenetet
        fileBemenet.addEventListener('change', (e) => { ////Hozzaadunk egy addEventListenert a fileBemenethez ami a change esemenyre figyel
            const fajl = e.target.files[0]; //Kivalasztjuk az elso file-t
            const fileReader = new FileReader(); //Letrehozzuk a fileReader objektumot
            fileReader.onload = () => { //Akkor kezdodik el ha betoltodott a fajl
                const fajlLines = fileReader.result.split('\n'); //Beolvassuk a fajlt es elvalasztjuk a sorokat
                const removeEventListener = fajlLines.slice(1); //Eltavolitjuk az elso sort a fajlbol
                for(const sor of removeEventListener) //Vegigmegyunk a removeEventListeneren a sor valtozoval
                {
                   const trimmedSor = sor.trim(); //Eltavolitjuk a sor elejrol es vegerol a whitespaceket
                   const mezok = trimmedSor.split(';'); //Elvalasztjuk a sorokat pontosvesszovel
                   const person = new Person(mezok[0], mezok[2], mezok[1]); //Letrehozzuk a person objektumot a mezokbol
                    this.manager.addPerson(person); //Hozzaadjuk a managerhez a person objektumot
                }
            }
            fileReader.readAsText(fajl); //Beolvassuk a fajlt szovegkent
        })

    }
}

/**
 * Ez az osztaly az urlapnak a mezoit reprezentalja amik tartalmaznak egy labelt, egy inputot es egy error elemet
 */
class FormInputField{
    #id; //Privat valtozo az idnek
    #inputElem;//Privat valtozo az input elementnek
    #labelElem; //Privat valtozo a label elementnek
    #errorElem;//Privat valtozo az error elementnek
    /**
     * Visszaadja az input idjet
     * @returns {string} A mezo idje
     */
    get id(){ //Getter az id privat valtozora
        return this.#id; //Visszater az idvel
    }
    /**
     * Visszaadja az input fieldjenek az erteket
     * @returns  {string} A field erteke
     */
    get value(){ //Getter az input privat valtozojara
        return this.#inputElem.value; //Visszater az input ertekevel
    }
    /**
     * Ez egy setter ami az errorElem szoveget a parameterre
     * @param {string} value Az ertek amit megkell jeleniteni 
     */
    set error(value){ //Setter az error privat valtozora
        this.#errorElem.textContent = value; //Beallitjuk az error szoveget
    }
    /**
     * Letrehoz egy FormInputField objektumot a megadott adatokkal
     * @param {string} id Az input idje
     * @param {string} labContent A label szovege
     */
    constructor(id, labContent){ //Konstruktor letrehozasa
        this.#id = id; //Beallitjuk az id privat valtozot a parameterre
        this.#labelElem = document.createElement('label'); //Letrehozzuk a label elemet
        this.#labelElem.htmlFor = id; //Beallitjuk a label htmlForjat az idre
        this.#labelElem.textContent = labContent; //Beallitjuk a label szoveget a parameterre
        this.#inputElem = document.createElement('input'); //Letrehozzuk az input elemet
        this.#inputElem.id = id; //Beallitjuk az input idjet a parameterre
        this.#errorElem = document.createElement('span'); //Letrehozzuk az error elemet ami egy span    
        this.#errorElem.className = 'error'; //Beallitjuk az error osztalynevet errorra
    }
    /**
     *  Ez a fuggveny letrehoz egy div element es hozzaadja a mezohoz valo HTML elemeket amik a label, input es error
     * @returns {HTMLDivElement} Visszater a div elemmel ami HTMLDivElement tipusu
     */
    divGetter(){ //Letrehozzuk a fuggvenyt parameter nelkul
        const div = divMaker('field'); //Letrehozzuk a divet a divMakerrel
        const br1 = document.createElement('br'); //Letrehozzuk az elso sortorest
        const br2 = document.createElement('br'); //Letrehozzuk a masodik sortorest
        const inHTMLElem = [this.#labelElem, br1, this.#inputElem, 
    br2, this.#errorElem]; //Letrehozzuk a tombot amiben benne van a label, input, error elem es meg 2 sortores
        for(const elem of inHTMLElem){ //Vegigmegyunk az inHTMLElem tombon az elem valtozoval
            div.appendChild(elem); //Hozzaadjuk a divhez az elemet
        }
        return div; //Visszater a divvel
    }
}