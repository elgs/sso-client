import { api, http } from './http-client.js';

export const context = {
   user: null,

   async session(force = false) {
      if (force || !this.user) {
         this.user = await api.get('session');
         leanweb.eventBus.dispatchEvent('update');
      }
      return this.user;
   },

   async login(accessToken) {
      if (accessToken) {
         localStorage.setItem('access_token', accessToken);
      }

      return await this.session(true);
   },
};