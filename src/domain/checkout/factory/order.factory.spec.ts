import { v4 } from "uuid";
import OrderFactory from "./order.factory";

describe('Order factory', () => {

    it('should create a order', () => {
        const orderProps  = {
            id: v4(),
            customerId: v4(),
            items: [
                {
                    id: v4(),
                    name: 'Product 1',
                    price: 100,
                    productId: v4(),
                    quantity: 1
                }
            ]
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBe(orderProps.id);
        expect(order.items.length).toBe(1);
    })
})