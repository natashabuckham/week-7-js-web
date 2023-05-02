const NotesModel = require('./notesModel');
const model = new NotesModel();

console.log("The notes app is running");
console.log(model.getNotes());
