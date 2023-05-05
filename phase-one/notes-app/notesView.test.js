/**
* @jest-environment jsdom
*/

const fs = require('fs');
const View = require('./notesView');
const Model = require('./notesModel');
const Client = require('./notesClient');

// jest.mock('./notesModel.js');
jest.mock('./notesClient.js')

describe('NotesView class', () => {
  beforeEach(() => {
    // Model.mockClear();
    Client.mockClear();
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('displays all notes', () => {
    mockModel = new Model();
    view = new View(mockModel);

    expect(document.querySelectorAll('div.note').length).toEqual(0);

    mockModel.getNotes.mockImplementation(() => ['the same thing we do every night pinky', 'try to take over the world'])

    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('lets the user add a note', () => {
    mockModel = new Model();
    view = new View(mockModel);

    mockModel.getNotes.mockImplementation(() => ['Natasha was here']);

    const inputBox = document.querySelector('#note-input');
    const addNoteButton = document.querySelector('#add-note-button');

    inputBox.value = "Natasha was here";
    addNoteButton.click();

    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelector('div.note').textContent).toEqual('Natasha was here');
    expect(mockModel.addNote).toHaveBeenCalledWith('Natasha was here');
  })

  it('clears the notes display before adding a new note', () => {
    mockModel = new Model();
    view = new View(mockModel);

    const inputBox = document.querySelector('#note-input');
    const addNoteButton = document.querySelector('#add-note-button');

    mockModel.getNotes.mockImplementation(() => ['Natasha was here']);
    inputBox.value = "Natasha was here";
    addNoteButton.click();


    mockModel.getNotes.mockImplementation(() => ['Natasha was here', 'the second note']);
    inputBox.value = "the second note";
    addNoteButton.click();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('Natasha was here');
    expect(mockModel.addNote).toHaveBeenCalledTimes(2);
  })

  it('clears the input box after adding a note', () => {
    mockModel = new Model();
    view = new View(mockModel);

    const inputBox = document.querySelector('#note-input');
    const addNoteButton = document.querySelector('#add-note-button');

    mockModel.getNotes.mockImplementation(() => ['Natasha was here']);
    inputBox.value = "Natasha was here";
    addNoteButton.click();

    expect(inputBox.value).toBeNull;
  })

  test.only('displays notes from the api', () => {
    mockClient = new Client();
    const mockModel = {
      setNotes: (data) => {mockModel.notes = data},
      getNotes: () => {return mockModel.notes}
    }

    mockClient.loadNotes.mockImplementation((callback) => callback(['This note is coming from the server']));

    view = new View(mockModel, mockClient);
    view.displayNotesFromApi();

    expect(document.querySelector('div.note').textContent).toEqual('This note is coming from the server');
  })
})
