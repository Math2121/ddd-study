import Product from "./product";

describe("Product", () => {

    it("Should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "P1", 100);
        }).toThrow("Id is required");
    })

    it("Should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("1", "", 100);
        }).toThrow("Name is required");
    })

    it("Should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("1", "P1", -1);
        }).toThrow("Price must be greater than zero");
    })

    it("Should change name of the product", () => {
        let product = new Product("1", "P1", 100);
        product.changeName("P2")
        expect(product.name).toEqual("P2")
    })

    it("Should change price of the product", () => {
        let product = new Product("1", "P1", 100);
        product.changePrice(200)
        expect(product.price).toEqual(200)
    })


})