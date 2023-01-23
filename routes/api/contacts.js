const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require(path.join(__dirname, "../", "../models/contacts"));
const { postSchema, putSchema } = require(path.join(
  __dirname,
  "../",
  "../validation/schemas"
));
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/", (req, res, next) => {
  res.status(200).json(listContacts());
});

router.get("/:id", (req, res, next) => {
  const contact = getContactById(req.params.id);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", (req, res, next) => {
  const data = req.body;
  const { error, value } = postSchema.validate(data);
  if (error) {
    res
      .status(400)
      .json({ message: `missing field. ${error.details[0].message}` });
  } else {
    res.status(201).json(addContact(value));
  }
});

router.delete("/:id", (req, res, next) => {
  const contact = getContactById(req.params.id);
  if (contact) {
    removeContact(req.params.id);
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:id", (req, res, next) => {
  const contact = getContactById(req.params.id);
  const data = req.body;
  if (contact) {
    const { error, value } = putSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    if (value) {
      return res.status(200).json(updateContact(req.params.id, data));
    }
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
