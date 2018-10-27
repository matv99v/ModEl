const dbHelpers = require('./dbHelpers');

describe('Test dbHelpers', () => {
    it('should return query replacing ?zakNum?', async () => {
        const options = { zakNum: 13 };
        const query = dbHelpers.include('AND zaknumber = ?zakNum?').ifObj(options).hasProp('zakNum').exec();
        expect(query).toEqual('AND zaknumber = 13');
    });

    it('should return query as is', async () => {
        const options = { some: true };
        const query = dbHelpers.include('restQnty <> frozQnty').ifObj(options).hasProp('some').exec();
        expect(query).toEqual('restQnty <> frozQnty');
    });

    it('should return query', async () => {
        const options = { some: true };
        const query = dbHelpers.include('restQnty <> frozQnty').ifObj(options).hasProp('some').equalTo(true).exec();
        expect(query).toEqual('restQnty <> frozQnty');
    });

    it('should not return query', async () => {
        const options = { some: false };
        const query = dbHelpers.include('restQnty <> frozQnty').ifObj(options).hasProp('some').equalTo(true).exec();
        expect(query).toEqual('');
    });

});
