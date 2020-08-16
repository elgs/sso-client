import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { context } from '../../services/context.js';

customElements.define('sso-client-dashboard',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
      }

      logout() {
         localStorage.removeItem('access_token');
         this.context.user = null;
         this.urlHashPath = '#/';
         leanweb.eventBus.dispatchEvent('update');
      }
   }
);
