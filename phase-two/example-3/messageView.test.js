/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const MessageView = require('./messageView');

describe('MessageView', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('displays the message when the show message button is clicked', () => {
    const view = new MessageView();
    const inputBox = document.querySelector('#message-input');
    inputBox.value = "hi";

    const buttonEl = document.querySelector('#show-message-button'); // is this better practice to initialise this here instead of accessing it via the constructor variable?
    buttonEl.click();

    expect(document.querySelector('#message')).not.toBeNull();
    expect(document.querySelector('#message').textContent).toEqual('hi');
  });

  it('hides the message when hide message button is clicked', () => {
    const view = new MessageView();
    view.showButtonEl.click(); // or is this better to do?
    view.hideButtonEl.click();

    expect(document.querySelector('#message')).toBeNull();
  })
});
