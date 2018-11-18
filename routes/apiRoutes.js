var db = require("../models/");

module.exports = function(app) {
  // Find all Gifts and return them to the user with res.json
  app.get("/api/gifts", function(req, res) {
    db.gift.findAll({}).then(function(data) {
      var giftObject = {
        gift: data
      };
      res.render("gifts", giftObject);
      // res.json(data);
    });
  });

  app.get("/api/decisions", function(req, res) {
    res.render("decisions");
  });

  app.get("/api/view", function(req, res) {
    db.gift.findAll({}).then(function(data) {
      var giftObject = {
        gift: data
      };
      res.render("viewGifts", giftObject);
      // res.json(data);
    });
  });

  app.get("/api/gifts/:id", function(req, res) {
    // Find one Gift with the id in req.params.id and return them to the user with res.json
    db.gift
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbgifts) {
        res.json(dbgifts);
      });
  });

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // ADDED CODE TO PULL DROP DOWN CATEGORY
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  app.post("/api/gifts/", function(req, res) {
    console.log("adding an item: ", req.user.uuid);
    console.log(req.session);
    db.gift
      .create({
        item: req.body.item,
        category: req.body.category,
        price: req.body.price,
        comment: req.body.comment,
        shopping: req.user.uuid
      })
      .then(function(dbgifts) {
        console.log("\n\n#####: ", dbgifts);
        res.json(dbgifts);
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
};

// app.put("/api/gifts", function(req, res) {
//   db.gift
//     .update(
//       req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//     })
//     .then(function(dbgifts) {
//     res.json(dbgifts);
//   });
// });
// }};
