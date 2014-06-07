// Generated by CoffeeScript 1.7.1
(function() {
  var express, nekoime, router;

  express = require("express");

  router = express.Router();

  nekoime = require('../lib/nekoime');

  router.get("/", nekoime.login_check, function(req, res) {
    return nekoime.db.words.find({}).exec(function(err, docs) {
      var counts, source, word, _i, _j, _len, _len1, _ref, _ref1;
      if (err) {
        return res.send(500, err.toString());
      }
      counts = {};
      for (_i = 0, _len = docs.length; _i < _len; _i++) {
        word = docs[_i];
        source = word.source.split(':', 2)[0];
        if (counts[source]) {
          counts[source]++;
        } else {
          counts[source] = 1;
        }
      }
      _ref = nekoime.sources;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        source = _ref[_j];
        source.count = (_ref1 = counts[source.id]) != null ? _ref1 : 0;
      }
      return res.render("sources", {
        title: "Express",
        sources: nekoime.sources
      });
    });
  });

  module.exports = router;

}).call(this);

//# sourceMappingURL=sources.map
