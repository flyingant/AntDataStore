import axios from 'axios';
const getBaseURL = (gistID) => `https://api.github.com/gists/${gistID}/comments`;
/**
 * List comments on a gist: GET /gists/:gist_id/comments
 * Get a single comment: GET /gists/:gist_id/comments/:comment_id
 * Create a comment: POST /gists/:gist_id/comments
 * Edit a comment: PATCH /gists/:gist_id/comments/:comment_id
 * Delete a comment: DELETE /gists/:gist_id/comments/:comment_id
 */
export default class AntDataStore {

  constructor({debuggerMode = false, gistID, token}) {
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
  // List comments on a gist
  listData() {
    return this.request
    .get()
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
  // Get a single comment
  getData(id) {
    return this.request
    .get(`/${id}`)
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
  // Create a comment
  createData(data) {
    return this.request
    .post('', {
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
  // Edit a comment
  patchData(id, data) {
    return this.request
    .patch(`${id}`, {
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
  // Delete a comment 
  deleteData(id)  {
    return this.request
    .delete(`/${id}`)
    .then((response) => {
      this.log('Delete Singal Data Response:', response);
      if (response.status === 204) {
        return Promise.resolve()
      }
    });
  }
}
