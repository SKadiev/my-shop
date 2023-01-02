import WebElementWrapper from './WebElementWrapper.js';

export class StyleElementWrapper {
  styleElementTags = [];

  constructor(webElementWrapper) {
    this.node = webElementWrapper;
  }


  generateScopedModuleStyles() {
    if (this.node.element.tagName === 'STYLE') {
      const cssElementRules = (this.node.element.textContent.trim().split('}').filter(i => i != false).map(i => i + '}'));
      const cssIdClass = this.makeClassId(10);
      cssElementRules.map(rule => {
        const splitRuleAndElemenTag = rule.split('{')
        const elementTag = splitRuleAndElemenTag[0].trim();
        this.styleElementTags.push(elementTag);
        const elementTagWithGeneratedClass = elementTag + '.' + cssIdClass + ' {';
        const ruleStyleRemainder = splitRuleAndElemenTag[1].trim();
        const newStyleWithGeneratedCssClass = elementTagWithGeneratedClass + ruleStyleRemainder;
        console.log(newStyleWithGeneratedCssClass);
      })
    }
  }

  styleElementWrapper() {
    
  }

  makeClassId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}