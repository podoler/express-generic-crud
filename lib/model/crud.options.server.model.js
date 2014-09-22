'use strict';

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
}

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