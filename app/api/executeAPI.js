/**
 * KPIGraph API
 */
import API from './api';
import C from './constants';
// import CONFIGS from '../../configs/configs';

export default class GetRecordsAPI extends API {
  constructor(data, timeout = 2000) {
    super('post', timeout, true);
    this.type = C.IMPORT_CONNECTIONS;
    this.data = data;
    this.getConnResponse = {};
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      // res.index=this.data.
      this.getConnResponse = res;
      return true;
    }
    return false;
  }

  apiEndPoint() {
    return `${super.apiEndPoint()}/execute`;
  }

  getPayload() {
    return this.getConnResponse;
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
