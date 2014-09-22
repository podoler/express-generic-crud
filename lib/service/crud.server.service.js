'use strict';

var _ = require('lodash'),
    logger = require('winston');

/**
 * Get List Service
 * @param crud - {Crud}
 * @param callback - {Function} in the form of callback(err, cruds)
 *          err - {Error}
 *          cruds - {Array} of cruds
 */
exports.getList = function(crud, callback){
    logger.info('Entering getList Service');

    crud.getResource().find({}, function(err, cruds){
        callback(err, cruds);
    });
};

/**
 * Create a new crud in resource
 * @param crud - {Crud}
 * @param details - {Object}
 * @param callback - {Function} in the form of callback(err, resCrud)
 *          err - {Error}
 *          resCrud - {Resource Crud}
 */
exports.create = function(crud, details, callback){
    logger.info('Entering Create Service');
    // Create new Instance
    var Model = crud.getResource();
    var instance = new Model();
    _.extend(instance, details);


    instance.save(function(err){
        logger.info('Saved with err : [' + err + ']');
        callback(err, instance);
    });
};

/**
 * Update an resCrud
 * @param resCrud - {Resource Crud}
 * @param details - {Object}
 * @param callback - {Function} in the form of callback(err, resCrud)
 *          err - {Error}
 *          resCrud - {Resource Crud}
 */
exports.update = function(resCrud, details, callback){
    _.extend(resCrud, details);

    resCrud.save(function(err){
        callback(err, resCrud);
    });
};

/**
 * Delete resCrud service
 * @param resCrud - {Resource Crud}
 * @param callback - {Function} in the form of callback(err, resCrud)
 *          err - {Error}
 *          resCrud - {Resource Crud}
 */
exports.delete = function(resCrud, callback){
    resCrud.remove(function(err){
        callback(err, resCrud);
    });
};

/**
 * Get an Crud By ID
 * @param crud - {Crud}
 * @param id - {String}
 * @param callback - {Function} in the form of callback(err, resCrud)
 *          err - {Error}
 *          resCrud - {Crud} object from resource
 */
exports.getCrudById = function(crud, id, callback){
    logger.info('Entering getCrudById Service');
    logger.info('id : [' + id + '], field : [' + crud.getOptions().getId() + ']');

    var criteria = {};
    criteria[crud.getOptions().getId()] = id;

    crud.getResource().findOne(criteria, function(err, resCrud){
        logger.info('found one with err : [' + err + ']');
        callback(err, resCrud);
    });
};
