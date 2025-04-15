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

    /**
     * Ez a fuggveny letrehoz egy gombot aminek a szoveget a parameter adja meg es visszater a gombbal
     * @returns {HTMLButtonElement} Visszater a gombbal ami HTMLButtonElement tipusu
     * @param {string} text A gomb szovege ami stringet var
     */
    generateButton(text){ //Letrehozzuk a fuggvenyt aminek a parameterje a gomb szovege
        const gomb = document.createElement('button'); //Letrehozzuk a gombot
        gomb.textContent = text; //Beallitjuk a gomb szoveget
        return gomb; //Visszater a gombbal
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
        this.manager.addPersonCallback(this.#personAddCallback(tbody)); //Beallitjuk a manager addPerson callbackjet a personAddCallback fuggvenyre
        this.manager.setTablaRenderelesCallback(this.#tableRenderelesCallback(tbody)); //Beallitjuk a manager tabla rendereles callbackjet a tableRenderelesCallback fuggvenyre 
       
    }

    /**
     * Ez egy callback fuggveny ami a tablazat torzset frissiti uj adatokkal\
     * @returns {Function} Visszater egy fuggvennyel ami a tablazatot frissiti
     * @callback {Array} A szurt Person objektumok tombje
     * @param {HTMLTableSectionElement} tablebody A tablazat torzse ami HTMLTableSectionElement tipusu
     */
    #tableRenderelesCallback(tablebody){
        return (array) => {
            tablebody.innerHTML = ''; // Uresre allitjuk a tbodyt
            for(const per of array){ // //Vegigmegyunk a tombon az array valtozoval
                this.#generatePersonRow(per, tablebody);  // //Meghivjuk a generatePersonRow fuggvenyt a person objektummal es a tbodyval
           }
        }
    }
    /**
     * Ez egy callback fuggveny ami egy uj person objektumot ad hozza a tablahoz
     * @param {HTMLTableSectionElement} tablebody A tablazat torzse ami HTMLTableSectionElement tipusu
     * @returns {Function} Visszater egy fuggvennyel ami a tablazatot frissiti
     * @callback {Person} A hozzaadott Person objektum
     * 
     */
    #personAddCallback(tablebody){ //letrehozzuk a callbacket a tablebody parameterrel
        return (person) => { //Hozzaadunk egy callback fuggvenyt a managerhez ami a person objektumot varja
            this.#generatePersonRow(person, tablebody) //Meghivjuk a generatePersonRow fuggvenyt a person objektummal es a tablebodyval
        }
    }


    /**
     * Ez a fuggveny letrehoz egy sort a tablan a person objektummal
     * @param {Person} person A person objektum ami a sort letrehozza
     * @param {HTMLTableSectionElement} tbody A tablazat torzse ami HTMLTableSectionElement tipusu
     * @returns {HTMLTableRowElement} Visszater a tbodyRowval ami HTMLTableRowElement tipusu
     */
    #generatePersonRow(person, tbody){ //Ez a fuggveny letrehoz egy sort a tablan a person objektummal  
        const tbodyRow = document.createElement('tr'); // Letrehozunk egy tr elemet a tbodyhoz

        this.#generateCell(tbodyRow, person.writer); // Meghivjuk a generateCell fuggvenyt a tbodyRowval es a person writerjaval
        this.#generateCell(tbodyRow, person.genre); // Meghivjuk a generateCell fuggvenyt a tbodyRowval es a person genrejaval
        this.#generateCell(tbodyRow, person.title); // Meghivjuk a generateCell fuggvenyt a tbodyRowval es a person titlejaval
        tbody.appendChild(tbodyRow); // Hozzaadjuk a tbodyhoz a tbodyRowt
    }

    /**
     *  Ez a fuggveny letrehoz egy cellat a tablan a megadott tartalommal es tipussal
     *  @param {HTMLTableRowElement} sor A sor amihez a cellat hozzadjuk 
     * @param {string} content A cella tartalma ami stringet var
     * @param {string} type A cella tipusa ami stringet var (td vagy th)
     * @return {HTMLTableCellElement} Visszater a cellaval ami HTMLTableCellElement tipusu
     */
    #generateCell(sor,content, type='td'){ //Letrehozzuk a fuggvenyt aminek a parameterei a sor, a content es a type
        const cella = document.createElement(type); //Letrehozzuk a cellat ami egy td vagy th elem
        cella.textContent = content; //Beallitjuk a cella szoveget a content parameterre
        sor.appendChild(cella); //Hozzaadjuk a sorhoz a cellat
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
            this.#generateCell(headerRow, cellText, 'th'); // Meghivjuk a generateCell fuggvenyt a headerRowval es a cellTextel
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

    #formFieldTomb; //Privat valtozo ami a form mezoket tarolja
    /**
     * Ez a konstruktor létrehoz egy űrlapot mezőkkel és hozzáadja a szülő div elemhez.
     * @param {string} className A div osztalyneve ami stringet var
     * @param {Array} fieldElements A mezok elemei amik egy tombben vannak
     * @param {Manager} manager A manager objektum ami a Person objektumokat kezeli
     */
    constructor(className,fieldElements, manager){// //Konstruktor letrehozasa
        super(className,manager);//Meghivjuk a szulo osztaly konstruktorat
        this.#formFieldTomb = []; //Letrehozunk egy privat tombot ami meg ures
        const formElement = this.#generateForm(fieldElements); //Meghivjuk a generateForm fuggvenyt a fieldElements parameterevel
        formElement.addEventListener('submit', this.#formsubmitEventListener()); //Hozzaadunk egy esemenyfigyelot a formhoz ami a submit esemenyre figyel
    }        

    
    /**
     * Ez a fuggveny letrehoz egy formot a megadott mezokkel es visszater a form elemmel
     * @param {Array} fieldElements A mezok elemei amik egy tombben vannak
     * @return {HTMLFormElement} Visszater a form elemmel ami HTMLFormElement tipusu
     */
    #generateForm(fieldElements){ //Letrehozzuk a fuggvenyt aminek a a parametere a fieldElements tomb
        const formElement = document.createElement('form'); // Letrehozunk egy form elemet
        this.div.appendChild(formElement); // Hozzaadjuk a divhez
        for(const element of fieldElements){ //Vegigmegyunk a fieldElements tombon az element valtozoval
            const formInputField = new FormInputField(element.id, element.label); //Letrehozzuk a formInputFieldet az element idjaval es labeljevel
            this.#formFieldTomb.push(formInputField); //Hozzaadjuk a formInputFieldet a #formFieldTombhoz
            formElement.appendChild(formInputField.divGetter()); //Hozzaadjuk a formhoz a formInputFieldet
        }   
        const button = this.generateButton('Hozzaad'); //Letrehozzuk a gombot a generateButton fuggveny segitsegevel
        formElement.appendChild(button); //Hozzaadjuk a formhoz a gombot

        return formElement; //Visszater a formElementtel
    }
    /**
     * Ez a fuggveny egy eventListener ami az urlap elkuldesekor fut le
     * Megnezi hogy minden mezo ki van e toltve es ha igen akkor letrehoz egy Person objektumot es hozzaadja a managerhez
     * @returns {Function} Visszater ezzel a fuggvennyel
     */
    #formsubmitEventListener(){ //Letrehozzuk a fuggvenyt aminek nincs parameterje
        return (e) => { //Letrehozzuk a fuggvenyt parameter nelkul 
            e.preventDefault(); //Megakadalyozzuk az alapertelmezett viselkedest
            if(this.#fullValidacio()){ //Ha a fullValidacio fuggveny igazat ad vissza
                const valueObject = this.#getValueObject(); //Meghivjuk a getValueObject fuggvenyt ami visszater egy valueObjecttel
                const person = new Person(valueObject.writer, valueObject.genre, valueObject.title); //Letrehozzuk a person objektumot a valueObjectbol
                this.manager.addPerson(person);//Hozzaadjuk a managerhez a person objektumot
            }
            
        }
    }
    /**
     * Ellenorzi hogy ki van e toltve az osszes input mező es ha nincs akkor egy hobauzenetet jelenit meg
     * @returns {boolean} Visszater egy boolean valtozoval
     * 
     */
    #fullValidacio(){ //Ez a fuggveny vegigmegy a #formFieldTombon es megnezi hogy minden mezo ki van e toltve 
        let valid = true; //Letrehozzuk a valid valtozot amit igazra allitunk
        for(const field of this.#formFieldTomb){ //Vegigmegyunk a #formFieldTomb tombon 
            field.error = ''; //Beallitjuk az errort uresre
            if(field.value === ''){ //Ha az input valueja ures
                field.error = 'Kotelezo megadni'; //Beallitjuk az error szoveget
                valid = false; //Beallitjuk a valid valtozot hamisra
            }
        }
        return valid; //Visszater a valid valtozoval
    }
    /**
     * Letrehoz egy objektumot ami tartalmazza az osszes input mezot es azok ertekeit
     * @returns {Object} Ennek az objektumaval ter vissza
     */
    #getValueObject(){ //Ez a fuggveny letrehoz egy valueObjectet ami tartalmazza az osszes input mezot 
        const valueObject = {}; //Letrehozzuk a valueObjectet ami egy ures objektum
        for(const field of this.#formFieldTomb){ //Vegigmegyunk a #formFieldTomb tombon 
            valueObject[field.id] = field.value; //Beallitjuk az idjat es a valuejat
        }
        return valueObject; //Visszater a valueObjecttel
    }
    

    
}
/**
 * Ez az osztaly az Area osztalybol szarmazik es letrehoz fajl feltoltesi mezot amit sorokra bont, feldolgoz es hozzaad a Managerhez
 * Illetve letrehoz egy gombot ami letolti a managerben levo adatokat egy fajlba
 */
class UploadDownload extends Area{
    /**
     * Letrehoz egy Upload objektumot  ami egy fajl input mezot tartalmaz
     * Letrehoz egy gombot ami letolti a managerben levo adatokat egy fajlba
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
        fileBemenet.addEventListener('change', this.#feltoltesEventListener()) ////Hozzaadunk egy addEventListenert a fileBemenethez ami a change esemenyre figyel
   
        const exportGomb = this.generateButton('Letoltes'); //Letrehozzuk a gombot a generateButton fuggveny segitsegevel
        this.div.appendChild(exportGomb)// Hozzaadjuk a divhez az exportGombot
        exportGomb.addEventListener('click',this.#exportGombEventListener()) //Hozzaadunk egy addEventListenert a exportGombhoz ami a click esemenyre figyel es meghivja a #exportGombEventListener fuggvenyt

    }
    /**
     * Ez a fuggveny egy eventListener ami a gombhoz van hozzaadva es letolti a fajlt
     * @returns {Function} Visszater egy fuggvennyel ami letolti a fajlt
     * 
     */
    #exportGombEventListener(){ //Ez a fuggveny letrehoz egy gombot ami letolti a fajlt 
        return() => {//Letrehozzuk a fuggvenyt parameter nelkul
            const link = document.createElement('a'); //Letrehozzuk a linket ami egy <a> elem
            const fileContent = this.manager.ExportContentGenerate(); //Meghivjuk a manager ExportContentGenerate fuggvenyet ami visszaadja a fajl tartalmat
            const fajl = new Blob([fileContent]); //Letrehozunk egy Blob objektumot a fajl tartalmaval
            link.href = URL.createObjectURL(fajl); //Letrehozzuk a fajl URL-jet
            link.download = 'newdata.csv'; //Beallitjuk a letoltesi nevet
            link.click(); //Ramegyunk a linkre
            URL.revokeObjectURL(link.href);//Eltavolitjuk a letrehozott URL-t
        }   
    }
    /**
     * Ez a fuggveny egy eventListener ami a fileBemenethez van hozzaadva es feldolgozza a feltoltott fajlt
     * @returns {Function} Visszater egy fuggvennyel ami feldolgozza a feltoltott fajlt
     */
    #feltoltesEventListener(){ //Ez a fuggveny letrehoz egy gombot ami feltolti a fajlt 
        return (e) => { //Letrehozzuk a fuggvenyt parameter nelkul 
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
        }
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