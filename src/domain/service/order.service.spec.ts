import Customer from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/orderItem"
import OrderService from "./order.service"


describe("Order service", () => {

    it("should place an order", () => {

        const customer = new Customer("123", "Cláudio")
        const item = new OrderItem("1", "item 01", 100.0, "p1", 2)

        const order = OrderService.placeOrder(customer, [item])

        expect(customer.rewardPoints).toBe(100)
        expect(order.total()).toBe(200)
    })
    it("should get the sum of all orders", () => {
        const item = new OrderItem("1", "item 01", 100.0, "p1", 2)
        const item2 = new OrderItem("12", "item 02", 200.0, "p2", 2)
        const order1 = new Order("1", "123", [item])

        const order2 = new Order("2", "123", [item2])

        let total = OrderService.getTotal([order1, order2])
        expect(total).toBe(600)

    }
    )
})