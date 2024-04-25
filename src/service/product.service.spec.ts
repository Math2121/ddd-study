import Product from "../entity/product"
import ProductService from "./product.service"

describe("Product service", () => {

    it("should change the prices of all products", () => {
        const product = new Product("1", "P1", 100)
        const product2 = new Product("2", "P2", 100)

        ProductService.increasePrice([product, product2], 100)
        expect(product.price).toBe(200)
        expect(product.price).toBe(200)
    })
})