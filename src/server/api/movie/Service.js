const request = require('request-promise');
const config = require('../../config');

class MovieService {
  async getMovie() {
    try {
      const url = config.endpoints.movie;
      const options = {
        uri: url,
        json: true
      };
      const response = await request(options);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MovieService;
