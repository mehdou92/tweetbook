import {LitElement, html, css} from 'lit-element';

class TbHeader extends LitElement {

    static get styles() {
        return css`
        
        `;
    }

    render() {
        return html`
            <header>
              <link rel="stylesheet" href="../../../src/assets/css/index.css">
              <div class="flex flex-wrap">
                <div class="w-full xl:w-full bg-green-500 ">
                  toto
                </div>
              </div>
            </header>
        `;
    }
}

customElements.define('tb-header', TbHeader);