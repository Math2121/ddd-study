import Address from './entity/address';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/orderItem';

let customer = new Customer('123', 'Cláudio Santos');
const address = new Address('Rua José de Alencar', '436', '57051-565', 'Maceio');

customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'item 01', 100.0, 'p1', 2);
const item2 = new OrderItem('2', 'item 02', 110.0, 'p2', 4);
const item3 = new OrderItem('3', 'item 03', 120.0, 'p3', 2);

const order = new Order('1', '123', [item1, item2, item3]);