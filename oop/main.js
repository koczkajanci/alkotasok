const separator = document.createElement("hr"); //Uj elem letrehozasa
document.body.appendChild(separator); //Hozzaadjuk a bodyhoz a separator elemet
const fieldConfig = [{ //Letrehozzuk a fieldConfig tombot
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
const table = new Table('table'); // Uj Tablet hozunk letre table parameterrel
const form = new Form('form', fieldConfig); // Uj Formot hozunk letre a form es a fieldConfig parameterekkel
