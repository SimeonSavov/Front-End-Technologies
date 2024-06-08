import page from '../node_modules/page/page.mjs'
import { viewHandler } from './viewHandler.js'

function start() {
    page(viewHandler.navView);
    
    page('/', viewHandler.homeView);
    page('/login', viewHandler.loginView);
    page('/logout', viewHandler.loginView);
    page('/register', viewHandler.registerView);

    page.start();
}

export const engine = {
    start
}