exports.authorize = async (req, res, next) => {
  console.log("INTERAL_TOKEN: ", process.env.INTERNAL_TOKEN);
  console.log("CLIENT_TOKEN: ", req.headers.authorization.split(' ')[1]);

  if (process.env.INTERNAL_TOKEN != req.headers.authorization.split(' ')[1]) {
    return res.status(400).json({
      status: 'error',
      message: "Unauthorized"
    })
  }

  next();
}