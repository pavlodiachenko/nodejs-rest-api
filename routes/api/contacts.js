const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require(path.join(__dirname, "../", "../models/contacts"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json(listContacts());
});

router.get("/:id", (req, res, next) => {
  const contact = getContactById(req.params.id);
  console.log(req);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", (req, res, next) => {
  addContact(req.body);
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
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  if (contact) {
    return res.status(200).json(updateContact(req.params.id, req.body));
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
