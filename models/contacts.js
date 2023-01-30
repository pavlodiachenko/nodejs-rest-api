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

const removeContact = async (id) => {
  Contact.findByIdAndRemove(id).catch((err) => {
    console.log(err);
  });
};

const addContact = async (body) => {
  const contact = new Contact({
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite || false,
  });
  contact.save().catch((err) => {
    console.log(err);
  });
};

const updateContact = async (id, body) => {
  await getContactById(id)
    .then((contact) => {
      if (body.name) {
        contact.name = body.name;
      }
      if (body.email) {
        contact.email = body.email;
      }
      if (body.phone) {
        contact.phone = body.phone;
      }
      if (typeof body.favorite === "boolean") {
        contact.favorite = body.favorite;
      }
      return contact.save();
    })
    .catch((err) => {
      console.log(err);
    });
  return getContactById(id);
};

const updateStatusContact = async (id, body) => {
  await getContactById(id).then((contact) => {
    contact.favorite = body.favorite;
    return contact.save();
  });
  return await getContactById(id);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
