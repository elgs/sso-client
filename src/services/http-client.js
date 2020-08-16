class APIClient {
   constructor(baesUrl, sendToken = false, defaultHeaders = {}) {
      this.baesUrl = baesUrl;
      this.sendToken = sendToken;
      this.defaultHeaders = defaultHeaders;
   }

   async _fetch(method, url = '', data = {}, headers = {}) {
      if (!url.toLowerCase().startsWith('https://') && !url.toLowerCase().startsWith('http://')) {
         url = this.baesUrl + '/' + url;
      }
      if (this.sendToken) {
         const token = localStorage.getItem('access_token');
         if (token) {
            headers['access_token'] = token;
         } else {
            location.href = 'http://localhost:2020/#login?return_url=' + encodeURIComponent(location.href);
         }
      }
      const response = await fetch(url, {
         method,
         headers: { ...this.defaultHeaders, ...headers },
         body: data ? JSON.stringify(data) : null,
      });
      return response.json();
   }

   post(url, data, headers) { return this._fetch('POST', url, data, headers); }
   get(url, headers) { return this._fetch('GET', url, null, headers); }
   patch(url, data, headers) { return this._fetch('PATCH', url, data, headers); }
   delete(url, data, headers) { return this._fetch('DELETE', url, data, headers); }
   put(url, data, headers) { return this._fetch('PUT', url, data, headers); }
   options(url, data, headers) { return this._fetch('OPTIONS', url, data, headers); }
}

// const apiUrl = 'https://sso.az.ht:1443';
const apiUrl = 'http://localhost:1103';

export const api = new APIClient(apiUrl, true);
export const http = new APIClient(apiUrl);