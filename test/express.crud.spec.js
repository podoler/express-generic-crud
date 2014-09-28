'use strict';

describe('Express Crud Unit-Test', function(){
    var expressCrud = require('../lib/index');


    it ('should test API methods', function(){
        expect(typeof expressCrud.init).toEqual('function');
        expect(typeof expressCrud.get).toEqual('function');
    });
});