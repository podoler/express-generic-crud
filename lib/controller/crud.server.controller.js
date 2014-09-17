'use strict';

var crudService = require('../service/crud.server.service'),
    Output = require('../model/output.server.model'),
    logger = require('winston');

/**
 * Get List
 * @param req - {Request}
 * @param res - {Response}
 */
exports.getList = function(req, res, next){
    logger.info('Entering getList Controller');
    var crud = req.getCrud();

    crudService.getList(crud, function(err, cruds){
        res.output = new Output(err, cruds);

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
    res.output = new Output(null, req.getInstance(req.getCrud().getName()));
};

/**
 * Find an Crud by ID Middleware
 * @param req - {Request}
 * @param res - {Response}
 * @param next - {Function} next middleware
 * @param id - {appId} param
 */
exports.getCrudByID =  function(req, res, next, id) {
    logger.info('Entering getCrudById Controller');
    crudService.getCrudById(req.getCrud(), id, function(err, resCrud){
        if (err) {
            return next(err);
        }

        if (!req._instance){
            req._instance = {};
            req.getInstance = function(name){
                return this._instance[name];
            }
        }

        req._instance[req.getCrud().getName()] = resCrud;

        next();
    });
};