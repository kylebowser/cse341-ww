const { response } = require('express');
const mongodb = require('../dataBase/connect');
const ObjectId = require('mongodb').ObjectId;

const getData = (req, res) => {
 mongodb.getDb().db().collection('contacts').find()
  .toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
  
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getAll = (req, res) => {
 mongodb.getDb().db().collection('contacts').find()
  .toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
  
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const id = new ObjectId(req.params.id);
    mongodb.getDb().db().collection('contacts').find({ _id: id })
      .toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
  
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
};

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (result.acknowledged) {
        res.status(204).send();
    } else {        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const id = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db().collection('contacts').updateOne({ _id: id }, { $set: contact });
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: id });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {        res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = { getData, getAll, getSingle, createContact, updateContact, deleteContact };