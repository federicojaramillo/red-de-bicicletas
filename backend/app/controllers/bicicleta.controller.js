const db = require("../models");
const Bicicleta = db.bicicletas;

// Create and Save a new Bicicleta
exports.create = (req, res) => {
  // Validate request
  if (!req.body.numero) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Bicicleta
  const bicicleta = new Bicicleta({
    numero: req.body.numero,
    color: req.body.color,
    modelo: req.body.modelo,
    ubicacion: req.body.ubicacion,
    
  });

  // Save Bicicleta in the database
  bicicleta
    .save(bicicleta)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bicicleta."
      });
    });
};

// Retrieve all Bicicletas from the database.
exports.findAll = (req, res) => {
  const numero = req.query.numero;
  var condition = numero ? { numero: { $regex: new RegExp(numero), $options: "i" } } : {};

  Bicicleta.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bicicletas."
      });
    });
};


// Update a Bicicleta by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Bicicleta.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Bicicleta with id=${id}. Maybe Bicicleta was not found!`
        });
      } else res.send({ message: "Bicicleta was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Bicicleta with id=" + id
      });
    });
};

// Delete a Bicicleta with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Bicicleta.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Bicicleta with id=${id}. Maybe Bicicleta was not found!`
        });
      } else {
        res.send({
          message: "Bicicleta was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Bicicleta with id=" + id
      });
    });
};
