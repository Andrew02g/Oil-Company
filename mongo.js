const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Andrew02g:Ag02guzman@test.4hg8rme.mongodb.net/appdb")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const schema = new mongoose.Schema({
  msg: {
    type: String,
    required: true
  }
});

const collection = mongoose.model("newCollection", schema); // Define the model using mongoose.model()

module.exports = collection; // Export the model