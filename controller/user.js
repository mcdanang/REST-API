const usersModel = require('../model/users.js');

exports.list = async (req, res) => {
  console.log('tes');
  usersModel.list()
  .then((result) => {
    res.json({
      status: 'ok',
      data: result
    })
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: "Something went wrong."
    })
  })
}