import * as format from 'date-fns/format'
import { Element as PolymerElement } from '@polymer/polymer/polymer-element'

export class HelloWorld extends PolymerElement {
    static get is() {
        return 'hello-world'
    }

    static get template() {
        return `<h1>Hello, World! It's [[today]].</h1>`
    }

    static get properties() {
        return {
            today: {
                type: String,
                value: function() {
                    return format(new Date(), 'MM/DD/YYYY')
                }
            }
        }
    }
}
