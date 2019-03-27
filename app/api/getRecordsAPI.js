/**
 * KPIGraph API
 */
import API from './api';
import C from './constants';
// import CONFIGS from '../../configs/configs';

export default class GetRecordsAPI extends API {
  constructor(data, timeout = 2000) {
    super('post', timeout, true);
    this.type = C.SELECT_Q_RESULT;
    this.data = data;
    this.resultDataReducer = {};
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.resultDataReducer = res;
      return true;
    }
    return false;
  }

  apiEndPoint() {
    return `${super.apiEndPoint()}/getRecords`;
  }

  getPayload() {
    return this.resultDataReducer;
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
