'use strict';

var operations = require('../data/crud.operations.server.data'),
    RouteOptions = require('./route.options.server.model');

/**
 * Create a CrudOptions object from an js object
 * @param options - {Object}
 *      resourceType - {String}
 *          1. mongodb
 *          2. static
 *      id - {String} - id which by it db index will be resolved
 * @constructor
 */
function CrudOptions(options){
    this._id = options.id || '_id';
    this._resourceType = options.resourceType || 'mongodb';
    this._routes = {};


    this._init();
}

/**
 * Initialize Crud Options
 * @private
 */
CrudOptions.prototype._init = function(){
    // Add all routes options
    for (var i in operations){
        this.routes[operations[i]] = new RouteOptions(operations[i]);
    }
};

/**
 * Id getter
 * @returns {String}
 */
CrudOptions.prototype.getId = function(){
    return this._id;
};

/**
 * ResourceType getter
 * @returns {string}
 */
CrudOptions.prototype.getResourceType = function(){
    return this._resourceType;
};

module.exports = CrudOptions;