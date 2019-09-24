/**
 * Skeleton of the page components.
 */

import { LitElement, property } from 'lit-element';

export class PageViewElement extends LitElement {

    /**
     * Flag property to specify whether page is active.
     */
    @property({ type: Boolean }) active: boolean;

    /**
     * Flag property to specify whether page is protected for non-authenticated users.
     */
    @property({ type: Boolean }) isProtected: boolean;

    shouldUpdate() {
        return this.active;
    }
}
