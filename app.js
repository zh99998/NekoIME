// Generated by CoffeeScript 1.7.1
(function() {
  var app, backend, cookieParser, express, favicon, id, logger, nekoime, path, source, _i, _len, _ref, _ref1;

  express = require("express");

  path = require("path");

  favicon = require("static-favicon");

  logger = require("morgan");

  cookieParser = require("cookie-parser");

  app = express();

  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "html.mustache");

  app.set('layout', 'layout');

  app.enable('view cache');

  app.engine('html.mustache', require('hogan-express'));

  app.use(favicon());

  app.use(logger("dev"));

  app.use(require("body-parser")());

  app.use(cookieParser());

  app.use(require("stylus").middleware(path.join(__dirname, "public")));

  app.use(express["static"](path.join(__dirname, "public")));

  nekoime = require('./lib/nekoime');

  app.use("/", require("./routes/index"));

  app.use("/profile", require("./routes/profile"));

  app.use("/words", require("./routes/words"));

  app.use("/sources", require("./routes/sources"));

  app.use("/login_callback", require("./routes/login_callback"));

  _ref = nekoime.sources;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    source = _ref[_i];
    if (source.route) {
      app.use('/sources/' + source.id, require('./lib/sources/' + source.id + '/route'));
    }
  }

  _ref1 = nekoime.backends;
  for (id in _ref1) {
    backend = _ref1[id];
    if (backend.route) {
      app.use('/backends/' + backend.id, require('./lib/backends/' + backend.id + '/route'));
    }
  }

  app.use(function(req, res, next) {
    var err;
    err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });

  module.exports = app;

}).call(this);

//# sourceMappingURL=app.map