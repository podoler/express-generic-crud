'use strict';

var Crud = require('./model/crud.server.model'),
    CrudOptions = require('./model/crud.options.server.model'),
    logger = require('winston');

var instance = {};

/**
 * gets a new CRUD for a specific app
 * @param app - {Express Application}
 * @returns {Function}
 */
function getCRUDMethod(app){
    /**
     * Function for creating a crud for a specific object
     * @param name - {String} name of the CRUD object
     * @param resource - {Object} resource to use for crud
     * @param options - {Object}
     */
    return function(name, resource, options) {
        // Default Options
        options = options || {};

        var crud = new Crud(name, resource, new CrudOptions(options), app);

        instance[name] = crud;

        return crud;
    };
}

/**
 * API to initialize express crud operation module
 * @param app - {Express App}
 */
exports.init = function(app){
    logger.info('Initializing Express-CRUD Module');
    // Create crud operation onto the application
    app.crud = getCRUDMethod(app);
};

/**
 * Get an already initialized CRUD object
 * @param name - {String} name of crud object which been already initialized
 * @returns {Crud}
 */
exports.get = function(name){
    return instance[name];
};