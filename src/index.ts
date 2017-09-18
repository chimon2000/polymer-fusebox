const hasCustomElements = !!window.customElements
const hasShadowDom = 'attachShadow' in Element.prototype && 'getRootNode' in Element.prototype

async function defineElements() {
    if (!hasCustomElements || !hasShadowDom) {
        await import('webcomponents-lite.js')
        const { HelloWorld } = await import('./components/hello-world')
        customElements.define(HelloWorld.is, HelloWorld)

        // elements.default.forEach(element => customElements.define(element.is, element))
    } else {
        const { HelloWorld } = require('./components/hello-world')
        customElements.define(HelloWorld.is, HelloWorld)

        // elements.forEach(element => customElements.define(element.is, element))
    }
}

defineElements()
