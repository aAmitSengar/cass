/**
 * KPIGraph API
 */
import API from './api';
import C from './constants';
// import CONFIGS from '../../configs/configs';

export default class ExecuteAPI extends API {
  constructor(data, type, timeout = 2000) {
    super('post', timeout, true);
    this.type = C[`${type}`];
    this.data = data;
    this.formDataReducer = {};
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      // res.index=this.data.
      this.formDataReducer = res;
      return true;
    }
    return false;
  }

  apiEndPoint() {
    return `${super.apiEndPoint()}/execute`;
  }

  getPayload() {
    return this.formDataReducer;
  }

  getBody() {
    return {
      query: this.data
    };
  }

  getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    };
  }
  getCustomConfigs() {
    return {
      timeout: this.timeout
    };
  }
}
