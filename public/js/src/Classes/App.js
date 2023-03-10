import WebElementWrapper from './Component/WebElementWrapper.js';

export default class App {
  constructor() {
    this.pageTitle = this.setupTitle();
    this.bodyWrapper = new WebElementWrapper('bodyWrapper');
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

  checkFormValidity() {
    const forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
  }


}