export default class App {
  constructor() {
    this.pageTitle = this.setupTitle();
  }

  setupTitle() {
    const pageTitleEl = document.getElementById('appTitle');
    const pageTitleText = pageTitleEl.textContent;
    pageTitleEl.textContent = pageTitleText.toUpperCase();
    return pageTitleEl;
  }

  greetUser() {
    const pageLocation = window.location.pathname;
    const isUserGreeted = localStorage.getItem('userGreeted') ? localStorage.getItem('userGreeted') : 'false';
    if (pageLocation === '/') {
      if (isUserGreeted === 'false') {
        alert("Welcome to the shop page")
        localStorage.setItem('userGreeted', true);
      }
    }
  }
}