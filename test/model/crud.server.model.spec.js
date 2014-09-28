'use strict';

describe('Context Model Unit-Test', function(){
    var Context = require('../../lib/model/context.server.model');

    it ('should test Context Model', function(){
        var context = new Context();

        expect(typeof context).toEqual('object');
    });
});