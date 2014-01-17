'use strict';

describe('Filter: ExactMatch', function () {

    // load the controller's module
    // beforeEach(module('Common.services'));
    var ExactMatch;

    beforeEach(function(){
        module('Core');

        inject(function(_exactMatchFilter_) {
            ExactMatch = _exactMatchFilter_;
        });

    });

    it('should filter out the values', function(){
        var values = ['andres', 'federico', 'sainz'];
        var filterBy = 'andres';

        expect( ExactMatch(values, filterBy) ).toEqual(['andres']);
    });

    it('should filter out the values', function(){
        var values = [{name: 'andres'}, {name: 'federico'}];
        var filterBy = {name: 'federico'};

        expect( ExactMatch(values, filterBy) ).toEqual([{name: 'federico'}]);
    });

    it('should return the same array if no filter is passed', function(){
        var values = ['andres', 'federico', 'sainz'];

        expect( ExactMatch(values) ).toEqual( ['andres', 'federico', 'sainz'] );
    });

});