import ProductFactory from "./product.factory"

describe('Factory product', () => {
    it('should create a factory product', () => {
        
        const product = ProductFactory.create('a',"P1", 100)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("P1")
        expect(product.price).toBe(100)
    })

    it('should create a factory product b', () => {

        const product = ProductFactory.create('b',"P2", 200)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("P2")
        expect(product.price).toBe(200)
    })

    it('should not create a factory product', () => { 

        expect(() => {
            ProductFactory.create('c', "P3", 300)
        }).toThrow("Product type not supported")
    })

})