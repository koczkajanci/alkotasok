/**
 * A Manager osztaly felelos a Person objektumok kezeleseert es tarolasert
 */
class Manager {
    #array; // Privat tomb a Person objektumok tarolasara
    #addPersonCallback; // Privat valtozo a callback fuggveny tarolasara
    #tablaRenderelesCallback; // Privat valtozo a tablta rendereles callback fuggveny tarolasara


    /**
     * Letrehozunk egy Manager objektumot es inicializaljuk az ures tombot
     */
    constructor() { // Konstruktor letrehozasa
        this.#array = []; // Inicializaljuk az ures tombot
    }

    /**
     * Beallit egy callback fuggvenyt, amit akkor hiv meg, amikor egy uj Person objektumot hozzaad
     * @param {Function} callback A callback fuggveny ami a szurt personokat kapja parameternek
     * @callback {Person} A hozzaadott Person objektum
     */
    addPersonCallback(callback) { // Setter a callback fuggvenyhez
        this.#addPersonCallback = callback; // Beallitjuk a callback fuggvenyt
    }

    /**
     * Beallit egy callback fuggvenyt, amit akkor hiv meg amikor a tablazat ujrarendelni akarjuk
     * @param {Function} callback A callback fuggveny ami a szurt personokat kapja parameternek
     * @callback {Array} A szurt Person objektumok tombje
     * 
     */
    setTablaRenderelesCallback(callback) { // Setter a tabla rendereles callback fuggvenyhez
        this.#tablaRenderelesCallback = callback; 
    }


    /**
     * Ez a fuggveny szuri meg a person objektumokat a feltetel alapjan es meghivja a tabla ujrarendelesre valo callbacket
     * @param  {Function} callback A callback fuggveny ami a szuresi feltetel
     * @callback {boolean} Igaz ha az adott Person objektum megfelel a szűrési feltételnek.
     * 
     */
    filter(callback) { // Szures fuggveny egy callback parameterrel 
        const res = []; // Letrehozunk egy ures tombot amibe a szurt elemeke fogjuk belerakni
        for (const elem of this.#array) { // Vegigmegyunk a tomb elemein
            if (callback(elem)) { // Ha a callback fuggveny igazat ad vissza
                res.push(elem); // Hozzaadjuk a tombhoz az elemet
            }
        }
        this.#tablaRenderelesCallback(res); // Meghivjuk a tabla rendereles callback fuggvenyt a szurt tombbel
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