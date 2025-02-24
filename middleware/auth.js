const checkUserId = (req, res, next) => {
  if (req.headers.id?.length) {
    req.body.userId = req.headers.id;
    return next();
  }   
  return res.sendStatus(401);
}; 

module.exports = {
  checkUserId,
}