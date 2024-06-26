import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

interface OrderProps {
    id: string;
    customerId: string;
    items:
    {
        id: string;
        name: string;
        price: number;
        productId: string;
        quantity: number;
    }[]

}
export default class OrderFactory {
    public static create(props: OrderProps): Order {

        const items = props.items.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
        })

        return new Order(props.id, props.customerId, items)
    }
}