import fs = require('fs');
import Movie from '../../../types/Movie';

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
      const separated = elem.indexOf('"') < 0 ? elem.split(',') : elem.split(/",|,"/);

      res.push({
        [titles[0]]: separated[0],
        [titles[1]]: separated[1],
        [titles[2]]: separated[2],
      });
    }
    console.log(res)
    return res;
  }
}

export { MovieLensParser };