'use strict';

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
        callback(err, resCrud);
    });
};