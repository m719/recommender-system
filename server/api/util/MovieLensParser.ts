import fs = require('fs');
import Movie from '../../../types/Movie';
import MovieLink from '../../../types/MovieLink';
import MovieRating from '../../../types/MovieRating';

const DATA_FOLDER = 'data';

class MovieLensParser {
  static parseMovies(): Movie[] {
    const buffer = fs.readFileSync(`${DATA_FOLDER}/movies.csv`);
    const text = new String(buffer);
    
    const arr = text.split('\r\n');
    
    // Removes last item (empty line)
    arr.pop();

    // Extract the titles at first position
    const titles = arr.shift().split(',');

    const res = [];
    for (const elem of arr) {
      const col = elem.indexOf('"') < 0 ? elem.split(',') : elem.split(/",|,"/);

      res.push({
        [titles[0]]: parseInt(col[0]),
        [titles[1]]: col[1],
        [titles[2]]: col[2],
      });
    }
    return res;
  }

  static parseLinks(): MovieLink[] {
    const buffer = fs.readFileSync(`${DATA_FOLDER}/links.csv`);
    const text = new String(buffer);
    
    const arr = text.split('\r\n');
    
    // Removes last item (empty line)
    arr.pop();

    // Extract the titles at first position
    const titles = arr.shift().split(',');

    const res = [];
    for (const elem of arr) {
      const col = elem.split(',');

      res.push({
        [titles[0]]: parseInt(col[0]),
        [titles[1]]: col[1],
        [titles[2]]: col[2],
      });
    }
    return res;
  }

  static parseRatings(): MovieRating[] {
    const buffer = fs.readFileSync(`${DATA_FOLDER}/ratings.csv`);
    const text = new String(buffer);
    
    const arr = text.split('\r\n');
    
    // Removes last item (empty line)
    arr.pop();

    // Extract the titles at first position
    const titles = arr.shift().split(',');

    const res = [];
    for (const elem of arr) {
      const col = elem.split(',');

      res.push({
        [titles[0]]: parseInt(col[0]),
        [titles[1]]: parseFloat(col[1]),
        [titles[2]]: parseInt(col[2]),
        [titles[3]]: parseInt(col[3]),
      });
    }
    return res;
  }
}

export = MovieLensParser;