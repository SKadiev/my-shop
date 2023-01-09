export class StyleElementWrapper {
  styleElementTags = [];

  constructor(webElementWrapper) {
    this.node = webElementWrapper;
  }

  generateScopedModuleStyles() {
    if (this.isStyleDomElement()) {
      const cssElementRules = this.cssElementRulesArray();
      const cssIdClass = this.makeClassId(10);
      cssElementRules.map(rule => {
        this.generateScopedCssRulesString(rule, cssIdClass);
      })

    }
  }

  generateScopedCssRulesString(rule, cssIdClass) {
    const splitRuleAndElemenTag = rule.split('{');
    const elementTag = splitRuleAndElemenTag[0].trim();
    const rulesString = splitRuleAndElemenTag[1].trim().replace('}', '');
    const elementTagWithGeneratedClass = elementTag + '.' + cssIdClass + ' {';
    this.styleElementTags.push({ elementTag, newClass: cssIdClass, styleRules: rulesString, fullCss: rule });
    const ruleStyleRemainder = splitRuleAndElemenTag[1].trim();
    const newStyleWithGeneratedCssClass = elementTagWithGeneratedClass + ruleStyleRemainder;
    return newStyleWithGeneratedCssClass;
  }

  cssElementRulesArray() {
    return this.node.element.textContent.trim().split('}').filter(i => i != false).map(i => i + '}');
  }

  isStyleDomElement() {
    return this.node.element.tagName === 'STYLE' && this.node.element.hasAttribute('scoped');
  }


  traverseStyleChildren(node, func) {

    let children = node.children;
    if (!children) return;
    for (let i = 0; i < children.length; i++)
      this.traverseStyleChildren(children[i], func);
    func(node);
  }

  styleModule() {

    let element = this.node.element;
    let nextElementAfterStyle = element.nextElementSibling;
    while (nextElementAfterStyle) {
      this.styleElementTag(nextElementAfterStyle);
      this.traverseStyleChildren(nextElementAfterStyle, this.styleElementTag.bind(this))
      nextElementAfterStyle = nextElementAfterStyle.nextElementSibling;
    }

  }

  isTagForStyling(element, checkTag) {
    let parser = new cssjs();
    let parsed = parser.parseCSS(checkTag.fullCss);
    console.log(parsed);
    return element.nodeType === 1 && element.tagName.toLowerCase() === checkTag.elementTag && !element.getAttribute('hasBeenStyled')
  }

  styleElementTag(element) {
    this.styleElementTags.forEach(i => {
      if (this.isTagForStyling(element, i)) {
        element.setAttribute('hasBeenStyled', true);
        element.style = i.styleRules;
      }
    });

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

  removeStyleTags() {
    const styleTags = document.querySelectorAll('style');
    styleTags.forEach(style => {
      if (style.hasAttribute('scoped')) {
        console.log(style.remove());
      }
    })
  }
}