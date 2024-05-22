
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/orderItem";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";


let customer = new Customer('123', 'Cláudio Santos');
const address = new Address('Rua José de Alencar', '436', '57051-565', 'Maceio');

customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'item 01', 100.0, 'p1', 2);
const item2 = new OrderItem('2', 'item 02', 110.0, 'p2', 4);
const item3 = new OrderItem('3', 'item 03', 120.0, 'p3', 2);

const order = new Order('1', '123', [item1, item2, item3]);