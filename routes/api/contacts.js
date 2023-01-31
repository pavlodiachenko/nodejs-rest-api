const express = require("express");
const bodyParser = require("body-parser");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const {
  postSchema,
  putSchema,
  patchSchema,
} = require("../../validation/schemas");
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

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  return await removeContact(id, res);
});

router.put("/:id", async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const { error, value } = putSchema.validate(data);
  if (error) {
    return res
      .status(400)
      .json({ message: `invalid fields: ${error.details[0].message}` });
  }
  if (value) {
    return await updateContact(id, data, res);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const { error, value } = patchSchema.validate(data);
  if (error) {
    return res
      .status(400)
      .json({ message: "missing field favorite or invalid data enetered" });
  }
  if (value) {
    return await updateContact(id, data, res);
  }
});

module.exports = router;
