class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      if (!confirm("Do you want to leave this site?")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('jm-confirm-link', ConfirmLink, { extends: 'a' });