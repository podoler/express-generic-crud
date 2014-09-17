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