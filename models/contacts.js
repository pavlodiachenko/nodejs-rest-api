const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = () => {
  return JSON.parse(
    fs.readFileSync(contactsPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        return data;
      }
    })
  );
};

const getContactById = (id) => {
  return listContacts().find((item) => {
    return item.id === id;
  });
};

const removeContact = (id) => {
  return fs.writeFile(
    contactsPath,
    JSON.stringify(
      listContacts().filter((item) => {
        return item.id !== id;
      })
    ),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
};

const addContact = (body) => {
  const newObj = {
    id: (+listContacts()[listContacts().length - 1].id + 1).toString(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const list = listContacts();
  list.push(newObj);
  fs.writeFile(contactsPath, JSON.stringify(list), (err) => {
    if (err) {
      throw err;
    }
  });
  return newObj;
};

const updateContact = (id, body) => {
  const list = listContacts();
  const index = listContacts().findIndex((element) => {
    return element.id === id;
  });
  const contact = list[index];
  if (body.name) {
    contact.name = body.name;
  }
  if (body.email) {
    contact.email = body.email;
  }
  if (body.phone) {
    contact.phone = body.phone;
  }
  fs.writeFile(contactsPath, JSON.stringify(list), (err) => {
    if (err) {
      throw err;
    }
  });
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
