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