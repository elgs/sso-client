import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { context } from '../../services/context.js';

customElements.define('sso-client-root',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
         const accessToken = this.urlHashParams.access_token;
         if (accessToken) {
            this.context.login(accessToken).then(user => {
               if (user) {
                  const urlHashParams = this.urlHashParams;
                  delete urlHashParams.access_token;
                  this.urlHashParams = { ... urlHashParams };
               }
            });
         }
      }

      goToDashboard() {
         this.urlHashPath = '#/dashboard';
      }
   }
);
