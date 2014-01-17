'use strict';

describe('Service: CoreSrv', function () {

    // load the controller's module
    // beforeEach(module('Common.services'));
    var CoreSrv;

    beforeEach(function(){
        module('Core');

        inject(function(_CoreSrv_) {
            CoreSrv = _CoreSrv_;
        });

    });

    describe('FilterBy method', function(){
        var items = [
            { country: 'spain', continent: 'europe' },
            { country: 'france', continent: 'europe' },
            { country: 'england', continent: 'europe' },
            { country: 'brazil', continent: 'america' },
            { country: 'argentina', continent: 'america' }
        ];

        it('should filter out by the parameter passed', function(){
            var americaCountries = [ { country: 'brazil', continent: 'america' }, { country: 'argentina', continent: 'america' } ];
            expect( CoreSrv.filterBy(items, {continent: 'america'}) ).toEqual( americaCountries );

            expect( CoreSrv.filterBy(items, { country: 'spain', continent: 'europe' }) ).toEqual( [{ country: 'spain', continent: 'europe' }] );
        });

        it('should return the same array if no filter param is passed', function(){
            expect( CoreSrv.filterBy(items) ).toEqual(items);
        });

        it('should return the same array if the filter param doesn\'t match anything ', function(){
            expect( CoreSrv.filterBy(items), {continent: 'africa'} ).toEqual(items);
            expect( CoreSrv.filterBy(items), 'any-filter' ).toEqual(items);
        });

    });

    describe('Round method', function(){
        it('should return undefined if no number is passed as value to round', function(){
            expect( CoreSrv.round('a', 2) ).toBe(undefined);
            expect( CoreSrv.round('', 2) ).toBe(undefined);
            expect( CoreSrv.round(null, 2) ).toBe(undefined);
            expect( CoreSrv.round([], 2) ).toBe(undefined);
            expect( CoreSrv.round({}, 2) ).toBe(undefined);
            expect( CoreSrv.round(undefined, 2) ).toBe(undefined);
            expect( CoreSrv.round(NaN, 2) ).toBe(undefined);
        });

        it('should round to no decimals if no decimals are specified or it\'s not a number', function(){
            expect( CoreSrv.round(2.34) ).toBe(2);
            expect( CoreSrv.round(2.34, 'wrong') ).toBe(2);
            expect( CoreSrv.round(2.34, undefined) ).toBe(2);
            expect( CoreSrv.round(2.34, []) ).toBe(2);
            expect( CoreSrv.round(2.34, {}) ).toBe(2);
            expect( CoreSrv.round(2.34, NaN) ).toBe(2);
            expect( CoreSrv.round(2.34, null) ).toBe(2);
        });

        it('should round to the specified decimals amount', function(){
            expect( CoreSrv.round(2.34, 1) ).toBe(2.3);
            expect( CoreSrv.round(2.34, 0) ).toBe(2);
            expect( CoreSrv.round(2.3484938, 4) ).toBe(2.3485);
        });

        it('should return the same value if the value passed is round, no matter how many decimals are specified', function(){
            expect( CoreSrv.round(2) ).toBe(2);
            expect( CoreSrv.round(2, 2) ).toBe(2);
        });

        it('should return the same value if the specified decimals amount is higher than the actual decimals that the number has', function(){
            expect( CoreSrv.round(2.34, 4) ).toBe(2.34);
            expect( CoreSrv.round(2, 4) ).toBe(2);
        });

        it('should return 0 if 0 is passed as first parameter', function(){
            expect( CoreSrv.round(0) ).toBe(0);
            expect( CoreSrv.round(0, 2) ).toBe(0);
        });
    });

    describe('DeepClone method', function(){
        it('should return the same value if the value passed is not an object or an array', function(){
            expect( CoreSrv.deepClone(1) ).toBe(1);
            expect( CoreSrv.deepClone('param') ).toBe('param');
        });

        it('should return undefined if no value is passed', function(){
            expect( CoreSrv.deepClone() ).toBe(undefined);
            expect( CoreSrv.deepClone(null) ).toBe(undefined);
        });

        it('should return the same value is a empty array or object is passed', function(){
            expect( CoreSrv.deepClone({}) ).toEqual({});
            expect( CoreSrv.deepClone([]) ).toEqual([]);
        });

        it('should return a deep copy of the object passed', function(){
            var obj = {
                month: 'october',
                person: {
                    name: 'andres',
                    age: 25,
                    personalData: {
                        dob: '06141988'
                    }
                }
            };
            var clonedObj = CoreSrv.deepClone( obj );

            clonedObj.month = 'june';
            clonedObj.person.name = 'john';
            clonedObj.person.personalData.dob = '10101990';

            expect( obj.month ).toBe('october');
            expect( obj.person.name ).toBe('andres');
            expect( obj.person.personalData.dob ).toBe('06141988');

            expect( clonedObj.month ).toBe('june');
            expect( clonedObj.person.name ).toBe('john');
            expect( clonedObj.person.personalData.dob ).toBe('10101990');
        });

        it('should return a deep copy of the array passed', function(){
            var array = [1,2,3,4,5];
            var clonedArray = CoreSrv.deepClone( array );

            clonedArray.push(6);
            clonedArray.push(7);
            clonedArray.push(8);

            expect( clonedArray ).toEqual( [1,2,3,4,5,6,7,8] );
            expect( array ).toEqual( [1,2,3,4,5] );
        });
    });

});