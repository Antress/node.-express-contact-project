const express = require("express");
const router = express.Router();
const validateToken = require("../midlleware/validateTokenHanler");
const {
    getContact,
    updateContact,
    getContacts,
    createContact ,
    deleteContact
} = require("../controllers/contacController")


router.use(validateToken);

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;