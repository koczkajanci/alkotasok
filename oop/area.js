/**
 *Az Area osztaly div elemeket hoz letre es ad hozza egy kontenerhez
 */
class Area{ // Osztaly letrehozasa
     /**
     * Megnezi hogy van e mar containeroop container, ha nincs letrehozzuk
     * 
     * @param {string} className A div osztalyneve
     */
    constructor(className){
        let containerDiv = document.querySelector('.containeroop'); //Megkeressuk a containeroop containert
        if(!containerDiv){ //Akkor megy bele az ifbe ha nem letezik a containeroop container
            containerDiv = document.createElement('div'); //Uj div letrehozasa
            containerDiv.className = 'containeroop'; //Beallitjuk az osztalynevet containeroopra
            document.body.appendChild(containerDiv); //hozzaadjuk a bodyhoz
        }
        const div = document.createElement('div'); // Uj div letrehozasa
        div.className = className; //Az osztalyneve a className
        containerDiv.appendChild(div); //Div hozzaadasa a containeroophoz
    }
}