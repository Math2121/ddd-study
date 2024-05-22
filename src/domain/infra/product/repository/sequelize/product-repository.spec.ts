import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"

import ProductRepository from "./product.repository"
import Product from "../../../../product/entity/product"

describe("Product repository", () => {
    let sequeleze: Sequelize

    beforeEach(async () => {

        sequeleze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequeleze.addModels([ProductModel])
        await sequeleze.sync()
    })

    afterEach(async () => {
        await sequeleze.close()
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepository()

        const product = new Product("1", "P1", 100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: "1" } })

        expect(productModel.id).toBe("1")
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "P1",
            price: 100
        })

    })

    it("should update a product", async () => {

        const productRepository = new ProductRepository()
        const product = new Product("1", "P1", 100)
        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: "1" } })

        expect(productModel.id).toBe("1")
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "P1",
            price: 100
        })

        product.changeName("P2")

        await productRepository.update(product)

        const productModel2 = await ProductModel.findOne({ where: { id: "1" } })

        expect(productModel2.id).toBe("1")
        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "P2",
            price: 100
        })
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "P1", 100)
        await productRepository.create(product)


        const productModel = await ProductModel.findOne({ where: { id: "1" } })
        const foundProduct = await productRepository.find("1")
        expect(productModel.id).toBe("1")
        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        })
    })

    it("should find a product all products", async () => {

        const productRepository = new ProductRepository()
        const product = new Product("1", "P1", 100)
        await productRepository.create(product)

        const product2 = new Product("2", "P2", 200)
        await productRepository.create(product2)


        const foundProducts = await productRepository.findAll()
        const products = [product, product2]

        expect(products).toEqual(foundProducts)
    })
})