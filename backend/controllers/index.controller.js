const indexController = {};

indexController.home = (req, res) => {
  res.send('<h1>Hello world</h1>');
};

module.exports = indexController;