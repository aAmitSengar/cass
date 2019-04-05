/**
 * KPIGraph API
 */
import API from './api';
import C from './constants';
// import CONFIGS from '../../configs/configs';

export default class MakeConnectionsAPI extends API {
  constructor(data, index, timeout = 2000) {
    super('post', timeout, true);
    this.type = C.MAKE_CONNECTION;
    this.index = index;
    this.data = data;
    this.getConnResponse = {};
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.getConnResponse = res;
      return true;
    }
    return false;
  }

  apiEndPoint() {
    return `${super.apiEndPoint()}/makeConnection`;
  }

  getPayload() {
    return {
      index: this.index,
      getConnResponse: this.getConnResponse
    };
  }

  getBody() {
    return {
      connection: this.data
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
