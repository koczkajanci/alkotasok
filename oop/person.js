/**
 * A Person osztaly egy szemely adatait tarolja, mint szerzo, mufaj es cim
 */
class Person {
    #writer; // Privat valtozo a szerzo tarolasara
    #genre; // Privat valtozo a mufaj tarolasara
    #title; // Privat valtozo a cim tarolasara
    
    /**
     * Visszaadja a szerzo nevet
     * @returns {string} A szerzo neve  ami string
     */
    get writer() { // Getter a writer privat valtozora
        return this.#writer; // Visszater a privat valtozoval
    }

    /**
     * Visszaadja a mufajt
     * @returns {string} A mufaj neve ami string
     */
    get genre() { // Getter a genre privat valtozora
        return this.#genre; // Visszater a privat valtozoval
    }
    
    /**
     * Visszaadja a cimet
     * @returns {string} A cim ami string
     */
    get title() { // Getter a title privat valtozora
        return this.#title; // Visszater a privat valtozoval
    }
    
    /**
     * Letrehoz egy Person objektumot a megadott adatokkal
     * @param {string} writer A szerzo neve
     * @param {string} genre A mufaj neve
     * @param {string} title A cim
     */
    constructor(writer, genre, title) { // Konstruktor letrehozasa
        this.#writer = writer; // Beallitja a szerzo nevet
        this.#genre = genre; // Beallitja a mufajt
        this.#title = title; // Beallitja a cimet
    }
}