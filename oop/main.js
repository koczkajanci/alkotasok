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
const manager = new Manager(); //Uj Manager letrehozasa
const table = new Table('table', manager); // Uj Tablet hozunk letre table es manager parameterekkel
const form = new Form('form', fieldConfig, manager); // Uj Formot hozunk letre a form, fieldConfig es a manager parameterekkel\
const fileUpload = new UploadDownload('upload', manager); //Uj fileUpload letrehozasa az upload es a manager parameterekkel
