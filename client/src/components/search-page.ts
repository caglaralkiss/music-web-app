import { customElement, html } from 'lit-element';
import { PageViewElement } from './page-view-element';

@customElement('app-search')
export class Search extends PageViewElement {
    render() {
        return html`<div>Search Page</div>`;
    }
}
