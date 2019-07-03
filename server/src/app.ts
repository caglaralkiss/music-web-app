/**
 * Main class of the project
 */

import Server from './server/server';

class App {
    static bootstrap(): void {
        Server.init();
    }
}

App.bootstrap();
