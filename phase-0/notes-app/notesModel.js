class NotesModel {
  constructor() {
    this.notesList = [];
  }

  getNotes() {
    return this.notesList;
  }

  addNote(note) {
    this.notesList.push(note);
  }

  reset() {
    this.notesList = [];
  }
}

module.exports = NotesModel;
