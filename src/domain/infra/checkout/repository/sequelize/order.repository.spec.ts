import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../customer/repository/sequelize/customer.mode';

import OrderItemModel from './orderItem.mode';
import ProductModel from '../../../product/repository/sequelize/product.model';

import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import ProductRepository from '../../../product/repository/sequelize/product.repository';

import OrderItem from '../../../../checkout/entity/orderItem';
import Order from '../../../../checkout/entity/order';
import OrderRepository from './order.repository';
import Customer from '../../../../customer/entity/customer';
import Address from '../../../../customer/value-object/address';
import OrderModel from './order.model';
import Product from '../../../../product/entity/product';




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

    it("should get an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product("1", "P1", 100)
        await productRepository.create(product)

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("33", product.name, product.price, product.id, 2)
        const order = new Order("1", customer.id, [orderItem]);

        await orderRepository.create(order)

        const orders = await orderRepository.find("1")

        expect(orders).toEqual(order)
    })


});