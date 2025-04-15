/**
 * 
 */
class Filter extends Area{ //Az osztaly letrehozasa ami az Area osztalybol szarmazik
    /**
     * Letrehoz egy filter objektumot ami a szuro formot kezeli
     * @param {string} className Az osztaly neve
     * @param {Manager} manager A manager objektum ami a personokat kezeli
     */
    constructor(className, manager){ //A konstruktor letrehozasa a className es a manager parameterekkel
        super(className, manager); // A szulo osztaly konstruktoranak meghivasa

       
        const formFilter = document.createElement('form'); //Letrehozzuk a formFilter elemet ami egy form
        this.div.appendChild(formFilter); //Hozzaadjuk a divhez a formot
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
             * Ez a fuggveny nezi meg hogy a legordulo lista melyik opcioja van kivalasztva es megnezi az input mezobe beirt szoveget, ezek alapjan szuri meg a personokat
             * @retuns {boolean} 
             */
            this.manager.filter((elem) => { //Meghivjuk a manager filter fuggvenyet az elem parameterrel
                if(select.value === 'writer'){//Akkor lep bele az ifbe ha a selectnek az erteke egyenlo writerrel
                    if(filterInput.value === elem.writer){ //Akkor lep bele az ifbe ha a filterInput erteke egyenlo az elemnek a writer propertyjaval
                        return true; //Visszater trueval
                    }
                }else if(select.value ==  'genre'){ //Akkor lep bele az ifbe ha a selectnek az erteke egyenlo genreval
                    if(filterInput.value === elem.genre){ //Akkor lep bele az ifbe ha a filterInput erteke egyenlo az elem genre propertyjaval
                        return true;//Visszater trueval
                    }
                }
                else if(select.value ==  'title'){ //Akkor lep bele az ifbe ha a selectnek az erteke egyenlo titleval
                    if(filterInput.value === elem.title){ //Akkor lep bele az ifbe ha a filterInput erteke egyenlo az elem title propertyjaval
                        return true;//Visszater trueval
                    }
                }else{ ////Ha egyik feltetel sem teljesul
                    return true; //Akkor is igazzal ter vissza
                }
            })

        })
    }
}