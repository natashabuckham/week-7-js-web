class MessageView {
  constructor() {
    this.mainContainerEl = document.querySelector('#main-container');

    this.showButtonEl = document.querySelector('#show-message-button');
    this.showButtonEl.addEventListener('click', () => {
       this.displayMessage(); // why is displayMessage called on 'this' by itself?
    });

    this.hideButtonEl = document.querySelector('#hide-message-button');
    this.hideButtonEl.addEventListener('click', () => {
      this.hideMessage();
    })
  }

  displayMessage() {
    const messageEl = document.createElement('div');
    messageEl.id = "message";
    messageEl.textContent = "This message is displayed by Javascript";
    this.mainContainerEl.append(messageEl);
  }

  hideMessage() {
    const messageEl = document.querySelector('#message');
    messageEl.remove();
  }
}

module.exports = MessageView;
