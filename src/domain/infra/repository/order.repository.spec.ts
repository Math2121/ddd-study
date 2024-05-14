import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/customer.mode';
import OrderModel from '../db/sequelize/order.model';
import OrderItemModel from '../db/sequelize/orderItem.mode';
import ProductModel from '../db/sequelize/product.model';
import Customer from '../../entity/customer';
import Address from '../../entity/address';
import CustomerRepository from './customer.repository';
import ProductRepository from './product.repository';
import Product from '../../entity/product';
import OrderItem from '../../entity/orderItem';
import Order from '../../entity/order';
import OrderRepository from './order.repository';




describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "1", "Zipcode 1", "City 1");


        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product("1", "P1", 100)
        await productRepository.create(product)

        const orderItem = new OrderItem("123", product.name, product.price, product.id, 2)

        const orderRepository = new OrderRepository();
        const order = new Order("123", customer.id, [orderItem]);
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "1"
                }
            ]
        })



    })

    it("should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
        customer.Address = address

        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "P1", 100)
        await productRepository.create(product)

        const orderItem = new OrderItem("123", product.name, product.price, product.id, 2)


        const orderRepository = new OrderRepository();
        const order = new Order("123", customer.id, [orderItem]);
        await orderRepository.create(order)

        const product2 = new Product("2", "P2", 200)
        await productRepository.create(product2)

        const orderItem2 = new OrderItem("1234", product2.name, product2.price, product2.id, 2)


        order.addItem([orderItem, orderItem2])
        await orderRepository.update(order)


        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "1"
                }
            ]
        })
    })

    it("should get all orders", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product("1", "P1", 100)
        const product2 = new Product("12", "P12", 200)
        await productRepository.create(product)
        await productRepository.create(product2)

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("33", product.name, product.price, product.id, 2)
        const order = new Order("1", customer.id, [orderItem]);
        const orderItem2 = new OrderItem("22", product2.name, product2.price, product2.id, 2)
        const order2 = new Order("2", customer.id, [orderItem2]);

        await orderRepository.create(order2)
        await orderRepository.create(order)

        const orders = await orderRepository.findAll()

        expect(orders.length).toBe(2)

    })


});