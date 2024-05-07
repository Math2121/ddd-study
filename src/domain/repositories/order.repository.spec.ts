import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../infra/db/sequelize/customer.mode';
import OrderModel from '../infra/db/sequelize/order.model';
import OrderItemModel from '../infra/db/sequelize/orderItem.mode';
import ProductModel from '../infra/db/sequelize/product.model';
import Customer from '../entity/customer';
import Address from '../entity/address';
import CustomerRepository from '../infra/repository/customer.repository';
import ProductRepository from '../infra/repository/product.repository';
import Product from '../entity/product';
import OrderItem from '../entity/orderItem';
import Order from '../entity/order';




describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel,OrderModel, OrderItemModel,ProductModel]);
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

        const orderItem = new OrderItem("Customer 1", product.name, product.price, product.id, 2)

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
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
                    order_id: "123"

                }
            ]
        })

        

    })

   
});