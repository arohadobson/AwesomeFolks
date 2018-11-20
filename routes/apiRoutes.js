var db = require("../models/");

module.exports = function(app) {
  app.get("/api/gifts/", function(req, res) {
    db.gift
      .findAll({
        where: {
          userUuid: req.session.passport.user
        },
        include: [db.user]
      })
      .then(function(data) {
        var giftObject = {
          gift: data
        };
        // res.json(dbgifts);
        res.render("gifts", giftObject);
        console.log("API/GIFTS " + req.params.id);
      });
  });

  app.get("/api/userwish", function(req, res) {
    db.user.findAll().then(function(user) {
      res.render("userButton", { user: user });
      console.log(user)
  });
  });

  app.get("/api/view/:id", function(req, res) {
    // Find one Gift with the id in req.params.id and return them to the user with res.json
    db.gift
      .findAll({
        where: {
          userUuid: req.params.id
        },
        include: [db.user]
      })
      .then(function(data) {
        var giftObject = {
          gift: data
        };
        // res.json(dbgifts);
        res.render("viewUserGift", giftObject);
        console.log("API VIEW ID " + req.params.id);
      });
  });

  app.post("/api/gifts/", function(req, res) {
    console.log("???" + req.session);
    db.gift
      .create({
        item: req.body.item,
        category: req.body.category,
        price: req.body.price,
        comments: req.body.comments,
        purchased: req.body.purchased,
        // userUuid: req.user.uuid
        userUuid: req.session.passport.user
      })
      .then(function(dbgifts) {
        res.json(dbgifts);
        console.log(req.body.category);
      });
  });

  app.delete("/api/gifts/:id", function(req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.gift
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbgifts) {
        res.json(dbgifts);
      });
  });
  app.get("/api/cart/", function(req, res) {
    db.gift
      .findAll({
        where: {
          shopping: req.session.passport.user
        },
        include: [db.user]
      })
      .then(function(data) {
        var giftObject = {
          gift: data
        };
        // res.json(dbgifts);
        res.render("shoppingList", giftObject);
        console.log("API/CART " + req.params.id);
      });
  });
};

// ******?
