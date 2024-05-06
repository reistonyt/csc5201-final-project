const pool = require('../utils/db');

const updateHits = async (req, res, next) => {
    const path = req.path;
    try {
      console.log('Updating hits for path:', path);
      await pool.query(
        'UPDATE metrics SET hits = hits + 1 WHERE metrics.resource = $1',
        [path]
      );
    } catch (err) {
      console.error('Error updating hits:', err);
    }
    next();
  };

module.exports = updateHits;