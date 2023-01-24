const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const list = await fs.promises.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      return data;
    }
  });
  return JSON.parse(list);
};

const getContactById = async (id) => {
  const list = await listContacts();
  return list.find((item) => {
    return item.id === id;
  });
};

const removeContact = async (id) => {
  const list = await listContacts();
  fs.writeFile(
    contactsPath,
    JSON.stringify(
      list.filter((item) => {
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

const addContact = async (body) => {
  const list = await listContacts();
  const id = +list[list.length - 1].id + 1;
  const newObj = {
    id: id.toString(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  list.push(newObj);
  await fs.promises.writeFile(contactsPath, JSON.stringify(list), (err) => {
    if (err) {
      throw err;
    }
  });

  return newObj;
};

const updateContact = async (id, body) => {
  const list = await listContacts();
  const index = list.findIndex((element) => {
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
  await fs.promises.writeFile(contactsPath, JSON.stringify(list), (err) => {
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
