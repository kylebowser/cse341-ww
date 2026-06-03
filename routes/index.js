const routes = require("express").Router();
const baseControl = require("../controllers/baseControl");
const validation = require("../middleware/validate");
const auth = require("../middleware/authenticate.js");

routes.get("/", baseControl.getData);

routes.get("/contacts", baseControl.getAll);

routes.get("/contacts/:id", auth, baseControl.getSingle);

routes.post(
  "/contacts",
  auth,
  validation.saveContact,
  baseControl.createContact,
);

routes.put(
  "/contacts/:id",
  auth,
  validation.saveContact,
  baseControl.updateContact,
);

routes.delete("/contacts/:id", auth, baseControl.deleteContact);

routes.get("/login", passport.authenticate("github"), (req, res) => {});

routes.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = routes;
