/**
 * A Manager osztaly felelos a Person objektumok kezeleseert es tarolasert
 */
class Manager {
    #array; // Privat tomb a Person objektumok tarolasara
    #addPersonCallback; // Privat valtozo a callback fuggveny tarolasara

    /**
     * Letrehozunk egy Manager objektumot es inicializaljuk az ures tombot
     */
    constructor() { // Konstruktor letrehozasa
        this.#array = []; // Inicializaljuk az ures tombot
    }

    /**
     * Beallit egy callback fuggvenyt, amit akkor hiv meg, amikor egy uj Person objektumot hozzaad
     * @param {Function} callback 
     * @callback {Person} A hozzaadott Person objektum
     */
    addPersonCallback(callback) { // Setter a callback fuggvenyhez
        this.#addPersonCallback = callback; // Beallitjuk a callback fuggvenyt
    }

    /**
     * Hozzaad egy Person objektumot az array-hez es meghivja a callback fuggvenyt
     * @param {Person} person A hozzaadando Person objektum
     */
    addPerson(person) { // Person hozzaadasa
        this.#array.push(person); // Hozzaadjuk a tombhoz a Person objektumot
        this.#addPersonCallback(person); // Meghivjuk a callback fuggvenyt a Person objektummal
    }

    /**
     * Ez a fuggveny letrehoz egy csv formatumu szoveget a Person objektumok adataival
     * @returns {string} A Person objektumok adatait tartalmazo csv szoveg
     */
    ExportContentGenerate(){
        const res = ['writer;genre,title']; //Uj tomb letrehozasa ami a fejlec
        for(const person of this.#array) { // Vegigmegyunk a tomb elemein
            res.push(`${person.writer};${person.genre};${person.title}`); // Hozzaadjuk a tombhoz a Person objektum adatait
        }
        return res.join('\n'); // Visszaterunk a tomb elemeivel amik uj sorral van elvalasztva
    }
}