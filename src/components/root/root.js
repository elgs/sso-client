import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';

import { context } from '../../services/context.js';

customElements.define('sso-client-root',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         this.context = context;
         const accessToken = leanweb.urlHashParams.access_token;
         if (accessToken) {
            this.context.login(accessToken).then(user => {
               if (user) {
                  const urlHashParams = leanweb.urlHashParams;
                  delete urlHashParams.access_token;
                  leanweb.urlHashParams = { ...urlHashParams };
               }
            });
         }

         if (leanweb.urlHashPath.startsWith('#/dashboard')) {
            context.session();
         }
      }

      urlHashChanged() {
         if (leanweb.urlHashPath.startsWith('#/dashboard')) {
            context.session();
         } else {
            leanweb.eventBus.dispatchEvent('update');
         }
      }

      goToDashboard() {
         leanweb.urlHashPath = '#/dashboard';
      }
   }
);
