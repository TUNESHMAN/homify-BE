module.exports = (req, res, next) => {
    console.log(`KOKO`, req.decodedToken);
    if (req.decodedToken.is_agent) {
      next();
    } else {
      res.status(403).json({ message: "You are not an agent" });
    }
  };
  