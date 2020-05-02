const mongoose = require('mongoose');
// middleware to check for a valid object id
const checkObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ msg: 'Invalid ID' });
  next();
};

module.exports = checkObjectId;
