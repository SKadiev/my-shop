export default class WebElementWrapper {
  elementWrappersList = [];

  constructor(id) {
    const node = document.getElementById(id);
    this.element = node;
    this.text = node.textContent;
    this.html = this.innerHTML;
  }

  static node() {
    return this.node;
  }

  setElementContent(innerElements) {
    innerElements.forEach(innerElement => {
      this.populate(innerElement);
    });
  }

  populate(innerElement) {
    if (innerElement instanceof WebElement) {
      const newElement = WebElementWrapper(innerElement.id);
      this.elementWrappersList.push(newElement);
    }
  }

}