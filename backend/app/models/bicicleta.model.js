module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      numero: String,
      color: String,
      modelo: String,
      ubicacion: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Bicicleta = mongoose.model("bicicleta", schema);
  return Bicicleta;
};
