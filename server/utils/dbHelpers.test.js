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

    it('should build query for goodId', async () => {
        const options = { goodId: 15 };
        const query = dbHelpers.include('products.idProduct = ?goodId?').ifObj(options).hasProp('goodId').exec();
        expect(query).toEqual('products.idProduct = 15');
    });

    it('should build query for enabled', async () => {
        const options = { enabled: true };
        const query = dbHelpers.include('products.exist = ?enabled?').ifObj(options).hasProp('enabled').exec();
        expect(query).toEqual('products.exist = true');
    });

    it('should prepeare appropriate conditions', async () => {
        const options = { goodId: 15, enabled: true };

        const results = dbHelpers.prepareConditions([
            dbHelpers.include('products.idProduct != ?excludeId?').ifObj(options).hasProp('excludeId').exec(),
            dbHelpers.include('products.exist = ?enabled?').ifObj(options).hasProp('enabled').exec(),
            dbHelpers.include('products.idProduct = ?goodId?').ifObj(options).hasProp('goodId').exec(),
            dbHelpers.include('products.idCategory = ?catId?').ifObj(options).hasProp('catId').exec(),
        ]);

        const expected = 'WHERE products.exist = true AND products.idProduct = 15';

        expect(results.trim()).toEqual(expected);
    });
});
