'use strict';

/**
 * Create a CrudOptions object from an js object
 * @param options - {Object}
 * @param resourceType - {String}
 * @constructor
 */
function CrudOptions(options){
    this._id = options.id || '_id';
    this._resourceType = options.resourceType || 'mongoDB';
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