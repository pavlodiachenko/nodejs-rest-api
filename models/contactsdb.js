const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
mongoose.set("strictQuery", false);
contactSchema.set("versionKey", false);
module.exports = mongoose.model("Contact", contactSchema);
