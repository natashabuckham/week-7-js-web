const NotesClient = require('./notesClient');

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks();

describe('Client class', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls fetch and loads data', (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(JSON.stringify({
      notes: 'This note is coming from the server'
    }));

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.notes).toBe("This note is coming from the server");

      // 4. Tell Jest our test can now end.
      done();
    });
  });

  it('sends a POST request to the notes backend to create a new note', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify({
      content: 'Remember to reflect on my progress this week!'
    }));

    client.createNote('Remember to reflect on my progress this week!')
    .then(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:3000/notes');
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify({ content: 'Remember to reflect on my progress this week!' }));
    });

    done();
  });
});
