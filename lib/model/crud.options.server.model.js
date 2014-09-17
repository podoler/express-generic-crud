'use strict';

/**
 * Create a CrudOptions object from an js object
 * @param options - {Object}
 * @constructor
 */
function CrudOptions(options){
    this._id = options.id || '_id';
}

/**
 * Id getter
 * @returns {String}
 */
CrudOptions.prototype.getId = function(){
    return this._id;
};

module.exports = CrudOptions;