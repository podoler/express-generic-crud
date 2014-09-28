'use strict';

describe('Route Options Model Unit-Test', function(){
    var RouteOptions = require('../../lib/model/route.options.server.model');

    var routeOptions;

    beforeEach(function(){
        routeOptions = new RouteOptions('name', {});
    });

    it ('should test Route Options API', function(){
        expect(typeof routeOptions.getRouteName).toEqual('function');
        expect(typeof routeOptions.isEnabled).toEqual('function');
    });

    it ('should test default values', function(){
        expect(routeOptions.getRouteName()).toEqual('name');
        expect(routeOptions.isEnabled()).toEqual(true);
    });

    it ('should test disabled', function(){
        routeOptions = new RouteOptions('name', {
            enable : false
        });
        expect(routeOptions.isEnabled()).toEqual(false);
    });
});