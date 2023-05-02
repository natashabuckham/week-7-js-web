const NotesModel = require('./notesModel');

describe('NotesModel class', () => {
  it('returns an empty array when no notes have been added', () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  })

  it('adds notes and returns them', () => {
    const model = new NotesModel();
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
  })

  it('resets the notes list', () => {
    const model = new NotesModel();
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    model.reset();
    expect(model.getNotes()).toEqual([]);
  })
})
