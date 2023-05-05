const NotesModel = require('./notesModel');

describe('NotesModel class', () => {
  it('initialises with an empty array returned by .getNotes()', () => {
    const model = new NotesModel;
    expect(model.getNotes()).toEqual([]);
  });

  it('adds notes and then returns them', () => {
    const model = new NotesModel;
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  });

  it('resets the notes list to empty', () => {
    const model = new NotesModel;
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    model.reset('');
    expect(model.getNotes()).toEqual([]);
  });

  it('sets the notes from the backend to the notes model', () => {
    const model = new NotesModel;
    model.setNotes(['This note is coming from the server', 'so is this one']);
    expect(model.getNotes()).toEqual(['This note is coming from the server', 'so is this one']);
  });
});
