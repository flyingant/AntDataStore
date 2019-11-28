import axios from 'axios';
const getBaseURL = (gistID) => `https://api.github.com/gists/${gistID}`;

export default class AntDataStore {

  constructor({ debuggerMode = false, gistID, token }) {
    this.debuggerMode = debuggerMode;
    this.log = (...args) => this.debuggerMode && console.log(...args);
    this.baseURL = getBaseURL(gistID);
    this._credentials = token !== null && token.length > 0 ? "token" + ' ' + token : null;
    this._headers = {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3.full+json",
      "Authorization": this._credentials
    };
    this.request = axios.create({
      baseURL: this.baseURL,
      headers: this._headers,
      timeout: 10000,
    })
  }
  
  listData() {
    return this.request
    .get(`/comments?d=${+new Date()}`)
    .then((response) => {
      this.log('List Data Response:', response);
      if (response.status === 200) {
        const data = response.data.map((r) => {
          const { id, body, body_html, body_text, created_at, updated_at} = r;
          return {
          id,
          body,
          body_html,
          body_text,
          created_at,
          updated_at,
        }
        });
        return Promise.resolve(data)
      }
    });
  }
  
  getData(id) {
    return this.request
    .get(`/comments/${id}?d=${+new Date()}`)
    .then((response) => {
      this.log('Get Singal Data Response:', response);
      if (response.status === 200) {
        const { id, body, body_html, body_text, created_at, updated_at} = response.data;
        const data = {
          id,
          body,
          body_html,
          body_text,
          created_at,
          updated_at,
        }
        return Promise.resolve(data)
      }
    });
  }
  
  createData(data) {
    return this.request
    .post(`/comments?d=${+new Date()}`, {
      body: data
    })
    .then((response) => {
      this.log('Create Data Response:', response);
      if (response.status === 201) {
        const { id, body, body_html, body_text, created_at, updated_at} = response.data;
        const data = {
          id,
          body,
          body_html,
          body_text,
          created_at,
          updated_at,
        }
        return Promise.resolve(data)
      }
    });
  }
  
  patchData(id, data) {
    return this.request
    .patch(`/comments/${id}?d=${+new Date()}`, {
      body: data
    })
    .then((response) => {
      this.log('Patch Data Response:', response);
      if (response.status === 200) {
        const { id, body, body_html, body_text, created_at, updated_at} = response.data;
        const data = {
          id,
          body,
          body_html,
          body_text,
          created_at,
          updated_at,
        }
        return Promise.resolve(data)
      }
    });
  }
  
  deleteData(id)  {
    return this.request
    .delete(`/comments/${id}?d=${+new Date()}`)
    .then((response) => {
      this.log('Delete Singal Data Response:', response);
      if (response.status === 204) {
        return Promise.resolve()
      }
    });
  }
}
