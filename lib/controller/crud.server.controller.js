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
    res._crudOutput = new Output(null, req.getInstance(req.getCrud().getName()));

    next();
};

/**
 * Create API
 * @param req - {Request}
 * @param res - {Response}
 */
exports.create = function(req, res){
    var crud = req.getCrud();

    crudService.create(crud. req.body, function(err, resCrud){
        res._crudOutput = new Output(err, resCrud);

        next();
    });
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

            if (!req._instance) {
                req._instance = {};
                req.getInstance = function (name) {
                    return this._instance[name];
                }
            }

            req._instance[crud.getName()] = resCrud;

            next();
        });
    };
};