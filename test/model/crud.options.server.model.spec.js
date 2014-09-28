'use strict';

describe('Crud Options Model Unit-Test', function(){
    var CrudOptions = require('../../lib/model/crud.options.server.model'),
        RouteOptions = require('../../lib/model/route.options.server.model');


    var crudOptions;

    beforeEach(function(){
        crudOptions = new CrudOptions({});
    });

    it ('should test external API', function(){
        expect(typeof crudOptions.getId).toEqual('function');
        expect(typeof crudOptions.getResourceType).toEqual('function');
        expect(typeof crudOptions.getRouteOptions).toEqual('function');
    });

    it ('should test default values', function(){
        expect(crudOptions.getId()).toEqual('_id');
        expect(crudOptions.getResourceType()).toEqual('mongodb');
        expect(crudOptions.getRouteOptions('list')).toEqual(new RouteOptions('list'));
    });
});