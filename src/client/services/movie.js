import request from '../utils/request';
import config from '../config';

export default class {
  static async getMovie() {
    try {
      const options = {
        method: 'GET'
      };
      const movie = await request(config.endpoints.apiLocal.movie, options);
      return movie;
    } catch (error) {
      return error;
    }
  }
}
