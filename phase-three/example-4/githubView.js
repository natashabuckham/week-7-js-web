class GithubView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    const submitButtonEl = document.querySelector('#submit-button');

    submitButtonEl.addEventListener('click', () => {
      this.display();
    });
  }

  display() {
    const repoInputEl = document.querySelector('#repo-name-input');
    const repoName = repoInputEl.value;

    this.client.getRepoInfo(repoName, repoData => {
      const repoNameHeading = document.querySelector('#repo-name');
      console.log(repoNameHeading);
      repoNameHeading.innerText = repoData.full_name;

      const repoDescriptionParag = document.querySelector('#repo-description');
      repoDescriptionParag.innerText = repoData.description;

      const imageTag = document.querySelector('#image-link');
      imageTag.src = repoData.organization.avatar_url;
    });

  }
}

module.exports = GithubView;
