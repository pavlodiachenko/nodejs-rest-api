const express = require("express");
const bodyParser = require("body-parser");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { postSchema, putSchema } = require("../../validation/schemas");
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  listContacts()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

router.get("/:id", async (req, res, next) => {
  const contact = await getContactById(req.params.id);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const data = req.body;
  const { error, value } = postSchema.validate(data);
  if (error) {
    res
      .status(400)
      .json({ message: `missing field. ${error.details[0].message}` });
  } else {
    res.status(201).json(await addContact(value));
  }
});

router.delete("/:id", (req, res, next) => {
  getContactById(req.params.id).then((contact) => {
    if (contact) {
      removeContact(req.params.id).then(() =>
        res.status(200).json({ message: "contact deleted" })
      );
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
});

router.put("/:id", async (req, res, next) => {
  const contact = await getContactById(req.params.id);
  const data = req.body;
  if (contact) {
    const { error, value } = putSchema.validate(data);
    if (error) {
      return res
        .status(400)
        .json({ message: `invalid fields: ${error.details[0].message}` });
    }
    if (value) {
      return res.status(200).json(await updateContact(req.params.id, data));
    }
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
