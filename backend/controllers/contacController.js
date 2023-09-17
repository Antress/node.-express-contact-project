const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler (async (req,res) => {
    const contacts = await Contact.find({user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Create new contacts
//@route Post /api/contacts
//@access private
const createContact = asyncHandler(async (req,res) => {
    console.log("The request body is :", req.body);
    const {name , email, phoneNumber} = req.body;
    if (!name || !email || !phoneNumber){
        res.status(400);
        throw new Error("All fields mandatory !")
    }
    const contact = await  Contact.create({
        name,
        email,
        phoneNumber,
        user_id: req.user.id,
    })
    res.status(201).json(contact);
});

//@desc Get contact
//@route Get /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById((req.params.id));
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
        res.status(200).json(contact);
});

//@desc Put all contacts
//@route Put /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById((req.params.id));
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({ message: `Update contact ${updatedContact}` });

});

//@desc Delete user by id
//@route Delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById((req.params.id));
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user")
    }

    deletedContact = await Contact.findByIdAndDelete((req.params.id));
    res.status(200).json(deleteContact);

});

module.exports = {getContact, getContacts, deleteContact, updateContact, createContact};