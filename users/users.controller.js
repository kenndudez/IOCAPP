const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
  req.body.daysToBeAvailable = req.body.daysToBeAvailable.toString();
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().email().required(),
        occupation: Joi.string().required(),
        gender: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        isSteward: Joi.boolean().required(),
        department: Joi.string().required(),
        occupation: Joi.string().required(),
        emergencyName: Joi.string().required(),
        emergencyNumber: Joi.string().required(),
        currentChurch: Joi.string().required(),
        isDisability: Joi.boolean().required(),
        reasonForService:Joi.string().required(),
        isMedical: Joi.boolean().required(),
        isHeavyLift: Joi.boolean().required(),
        isWorkOff: Joi.boolean().required(),
        additionalComment: Joi.string().required(),
        daysToBeAvailable: Joi.array().items(Joi.string()).required(),
        numberOfYearsInOasis: Joi.number().required(),
        yearJoinOasis: Joi.string().required(),
        whatsappNumber: Joi.string(),
        ageRange: Joi.string().required(),
        //password: Joi.string().min(6).required(),
        //confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        
       
    });
    
    validateRequest(req, next, schema);
    console.log(schema.daysToBeAvailable);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
