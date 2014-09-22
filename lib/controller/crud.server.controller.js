'use strict';

var crudService = require('../service/crud.server.service'),
    Output = require('../model/output.server.model'),
    logger = require('winston'),
    _ = require('lodash');

/**
 * Get List
 * @param req - {Request}
 * @param res - {Response}
 */
exports.getList = function(req, res, next){
    logger.info('Entering getList Controller');
    var crud = req.getCrud();

    crudService.getList(crud, function(err, cruds){
        res._crudOutput = new Output(err, cruds);

        next();
    });
};

/**
 * Get a single crud
 * @param req - {Request}
 * @param res - {Response}
 * @param next - {Function}
 */
exports.get = function(req, res, next){
    logger.info('Entering get CRUD Controller');
    res._crudOutput = new Output(null, req._crudInstance[req.getCrud().getName()]);

    next();
};

/**
 * Update API
 * @param req - {Request}
 * @param res - {Response}
 * @param next - {Function}
 */
exports.update = function(req, res, next){
    logger.info('Entering update CRUD Contoller');

    crudService.update(req._crudInstance[req.getCrud().getName()], req.getCrudContext().getDetails(), function(err, resCrud){
        logger.info('updated with err : [' + err + ']');

        res._crudOutput = new Output(err, resCrud);

        next();
    });
};

/**
 * Delete API
 * @param req - {Request}
 * @param res - {Response}
 * @param next - {Function}
 */
exports.delete = function(req, res, next){
    logger.info('Entering Delete CRUD Controller');

    crudService.delete(req._crudInstance[req.getCrud().getName()], function(err, resCrud){
        logger.info('Deleted with err : [' + err + ']');

        res._crudOutput = new Output(err, resCrud);

        next();
    });
};

/**
 * Create API
 * @param req - {Request}
 * @param res - {Response}
 */
exports.create = function(req, res, next){
    logger.info('Entering Create Controller');
    var crud = req.getCrud();

    crudService.create(crud, req.getCrudContext().getDetails(), function(err, resCrud){
        logger.info('Created instance with err : [' + err + ']');
        res._crudOutput = new Output(err, resCrud);

        next();
    });
};

/**
 * API to Static get
 * @param req
 * @param res
 * @param next
 */
exports.staticGet = function(data){
    return function(req, res, next) {
        res._crudOutput = new Output(null, data);

        next();
    }
};

/**
 * Find an Crud by ID Middleware
 * @param req - {Request}
 * @param res - {Response}
 * @param next - {Function} next middleware
 * @param id - {appId} param
 */
exports.getCrudByID = function(crud){
    return function(req, res, next, id) {
        logger.info('Entering getCrudById Controller');
        crudService.getCrudById(crud, id, function (err, resCrud) {
            logger.info('got crud by id with err : [' + err + ']');
            if (err) {
                return next(err);
            }

            if (!req._crudInstance) {
                req._crudInstance = {};
            }

            req._crudInstance[crud.getName()] = resCrud;

            next();
        });
    };
};