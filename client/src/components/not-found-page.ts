import { customElement, html } from 'lit-element';
import { PageViewElement } from './page-view-element';

@customElement('app-not-found')
export class NotFound extends PageViewElement {
    render() {
        return html`<p>404 Not Found!</p>`;
    }
}
