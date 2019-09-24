import { customElement, html } from 'lit-element';
import { PageViewElement } from './page-view-element';

@customElement('app-songs')
export class Songs extends PageViewElement {
    render() {
        return html`<p>Songs page!</p>`;
    }
}
