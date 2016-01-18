'use strict'

const Joi = require('joi');
const {namemodel} = require('./{namemodel}Model');

exports.findall = {
    description: 'Find all data',
    notes: 'Find all data',
    handler: function (request, reply) {
        {namemodel}.find({}, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'Data Successfully Fetched',
                    data: data
                });
            }
        });
    }
}

exports.create = {
   description: 'Save user data',
    notes: 'Save user data',
    validate: {
        datasave: {

        }
    },
    handler: function (request, reply) {
        var {name} = new {namemodel}(request.datasave);
        {name}.save(function (error) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: error
                });
            } else {
                reply({
                    statusCode: 201,
                    message: 'Data Saved Successfully'
                });
            }
        });
    }
}

exports.findone = {
    description: 'Find one data',
    notes: 'Find one data',
    validate: {
        params: {
            {name}_id: Joi.string().required()
        }
    },
    handler: function (request, reply) {

        {namemodel}.find({_id: request.params.{name}_id}, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                if (data.length === 0) {
                    reply({
                        statusCode: 200,
                        message: 'data Not Found',
                        data: data
                    });
                } else {
                    reply({
                        statusCode: 200,
                        message: 'Data Successfully Fetched',
                        data: data
                    });
                }
            }
        });
    }
}

exports.update = {
    description: 'Update one data',
    notes: 'Update one data',
    validate: {
        params: {
	    {name}_id: Joi.string().required()
        },
	dataupdate: {

	}
    },
    handler: function (request, reply) {
        {namemodel}.findOneAndUpdate({_id: request.params.{name}_id}, request.dataupdate, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'Updated Successfully',
                    data: data
                });
            }
        });

    }
}

exports.deleteone = {
    description: 'Delete one data',
    notes: 'Delete one data',
    validate: {
        params: {
	    {name}_id: Joi.string().required()
        }
    },
    handler: function (request, reply) {
        {namemodel}.findOneAndRemove({_id: request.params.{name}_id}, function (error) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Error in removing data',
                    data: error
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'data Deleted Successfully'
                });
            }
        });

    }
}
