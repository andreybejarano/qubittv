const MovieService = require('./Service');

class MovieController {
  static async getMovie(req, res, next) {
    try {
      const service = new MovieService();
      const data = await service.getMovie();
      res.json(data);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = MovieController;
