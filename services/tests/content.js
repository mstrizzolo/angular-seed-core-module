'use strict';

describe('Core: ContentSrv', function () {

    // load the controller's module
    // beforeEach(module('Common.services'));
    var ContentSrv;

    beforeEach(function(){
        module('Core');

        inject(function(_ContentSrv_) {
            ContentSrv = _ContentSrv_;

            ContentSrv.init({
                name: 'mock name',
                person: {
                    age: 25,
                    names: {
                        firstname: 'andres',
                        lastname: 'sainz'
                    },
                    likes: ['sports', 'reading']
                },
                countries: [
                    {
                        name: 'france',
                        continent: 'europe'
                    }
                ]
            });
        });

    });

    describe('General data validation', function(){
        it('should return undefined if the key is not a string', function(){
            expect( ContentSrv.get(0) ).toBe(undefined);
            expect( ContentSrv.get([]) ).toBe(undefined);
            expect( ContentSrv.get({}) ).toBe(undefined);
            expect( ContentSrv.get(undefined) ).toBe(undefined);
            expect( ContentSrv.get(null) ).toBe(undefined);
        });

        it('should return undefined if no content provided', function(){
            ContentSrv.init();
            expect( ContentSrv.get('key') ).toBe(undefined);
        });

        it('should return undefined if no object content is provided', function(){
            ContentSrv.init('wrong content');
            expect( ContentSrv.get('key') ).toBe(undefined);

            ContentSrv.init(0);
            expect( ContentSrv.get('key') ).toBe(undefined);

            ContentSrv.init(undefined);
            expect( ContentSrv.get('key') ).toBe(undefined);

            ContentSrv.init(null);
            expect( ContentSrv.get('key') ).toBe(undefined);

            ContentSrv.init([]);
            expect( ContentSrv.get('key') ).toBe(undefined);
        });

        it('should return undefined if and empty object is provided', function() {
            ContentSrv.init({});
            expect( ContentSrv.get('key') ).toBe(undefined);
        });
    });

    describe('Single keys', function(){
        it('should return undefined if the pass key doesn\'t exist', function(){
            expect( ContentSrv.get('wrong-key') ).toBe(undefined);
        });

        it('should return the value when a single key is passed', function(){
            expect( ContentSrv.get('name') ).toBe('mock name');
        });
    });

    describe('Multiple keys (object\'s properties)', function(){
        it('should return the value when a multiple key is passed', function(){
            expect( ContentSrv.get('person.age') ).toBe(25);
        });

        it('should return the value when a multiple key with 3 properties is passed', function(){
            expect( ContentSrv.get('person.names.firstname') ).toBe('andres');
        });

        it('should return undefined if the last key doesn\' exist', function(){
            expect( ContentSrv.get('person.wrong-key') ).toBe(undefined);
        });

        it('should return undefined if the first key doesn\'t exist', function(){
            expect( ContentSrv.get('another-key.name') ).toBe(undefined);
        });

        it('should return undefined when a multiple key with 3 properties is passed and the one in the middle doesn\'t exist', function(){
            expect( ContentSrv.get('person.wrong.firstname') ).toBe(undefined);
        });
    });

    describe('Numeric indexes as part of the key', function(){
        it('should return the value if a numeric index is passed in the last place', function(){
            expect( ContentSrv.get('person.likes.0') ).toBe('sports');
            expect( ContentSrv.get('person.likes.1') ).toBe('reading');
        });

        it('should return the value if not numeric index is passed', function(){
            expect( ContentSrv.get('person.likes') ).toBeArray();
            expect( ContentSrv.get('person.likes') ).toBeNonEmptyArray();
            expect( ContentSrv.get('person.likes') ).toContain('sports');
            expect( ContentSrv.get('person.likes') ).toContain('reading');
        });

        it('should return the value if a numeric index is passed in the middle', function(){
            expect( ContentSrv.get('countries.0.name') ).toBe('france');
            expect( ContentSrv.get('countries.0.continent') ).toBe('europe');
        });

        it('should return undefined if a numeric index doesn\'t exist', function(){
            expect( ContentSrv.get('countries.2.name') ).toBe(undefined);
        });
    });

});
