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
                  this.urlHashParams = { ...urlHashParams };
               }
            });
         }

         if (this.urlHashPath.startsWith('#/dashboard')) {
            context.session();
         }
      }

      urlHashChanged() {
         if (this.urlHashPath.startsWith('#/dashboard')) {
            context.session();
         } else {
            leanweb.eventBus.dispatchEvent('update');
         }
      }

      goToDashboard() {
         this.urlHashPath = '#/dashboard';
      }
   }
);
