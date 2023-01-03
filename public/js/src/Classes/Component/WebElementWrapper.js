import { StyleElementWrapper } from './StyleElementWrapper.js';

export default class WebElementWrapper {
  static elementWrappersList = [];
  styleElementWrapper;

  constructor(id, childElement) {
    let node;
    if (id) {
      node = document.getElementById(id);
    } else if (childElement) {
      node = childElement;
    }

    this.element = node;

    if (node?.textContent) {
      this.text = node.textContent;

    }
    this.html = node.innerHTML;
    this.setElementContent(this.element.children);
  }

  node() {
    return this.element;
  }

  setElementContent(innerElements) {
    const elementWrappersList = this.constructor.elementWrappersList;
    if (elementWrappersList.length <= 0) {
      elementWrappersList.push(this);
    }
    if (innerElements.length > 0) {
      for (let index = 0; index < innerElements.length; index++) {
        const element = innerElements[index];
        this.populate(element);
      }
    }
  }

  populate(innerElement) {
    if (innerElement.nodeType === 1) {
      const newElement = new WebElementWrapper(innerElement.id, innerElement);
      if (innerElement.tagName === 'STYLE') {
        const styleElementWrapper = new StyleElementWrapper(newElement);
        styleElementWrapper.generateScopedModuleStyles();
        styleElementWrapper.styleModule();
        styleElementWrapper.removeStyleTags();
      } else
        this.constructor.elementWrappersList.push(newElement);
    }
  }

  static getById(id) {
    const element = WebElementWrapper.elementWrappersList.find(i => {
      return i.element.id === id;
    })

    return element;
  }

}