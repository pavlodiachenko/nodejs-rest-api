const Contact = require("./contactsdb");

const listContacts = async () => {
  return await Contact.find()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getContactById = async (id) => {
  return await Contact.findById(id)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeContact = async (id, res) => {
  return await Contact.findByIdAndRemove({
    _id: id,
  })
    .then((result, err) => {
      if (result) {
        return res.status(200).json({ message: "contact deleted" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: "Not found" });
    });
};

const addContact = async (body) => {
  await Contact.create({
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite || false,
  });
};

const updateContact = async (id, body, res) => {
  return await Contact.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  })
    .then((result, err) => {
      if (result) {
        return res.status(200).json(result);
      } else if (err) {
        return res
          .status(400)
          .json({ message: `invalid fields: ${err.details[0].message}` });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: "Not found" });
    });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
