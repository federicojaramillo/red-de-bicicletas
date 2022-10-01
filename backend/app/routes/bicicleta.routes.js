module.exports = app => {
  const bicicletas = require("../controllers/bicicleta.controller.js");

  var router = require("express").Router();

  // Create a new Bicicleta
  router.post("/", bicicletas.create);

  // Retrieve all Bicicletas
  router.get("/", bicicletas.findAll);

  // Update a Bicicleta with id
  router.put("/:id", bicicletas.update);

  // Delete a Bicicleta with id
  router.delete("/:id", bicicletas.delete);

  app.use("/api/bicicletas", router);
};
