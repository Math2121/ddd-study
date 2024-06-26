import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

describe("Order", () => {

    it("Should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required");
    })

    it("Should throw error when customer_id is empty", () => {
        expect(() => {
            let order = new Order("12", "", []);
        }).toThrow("Id is required");
    })
    it("Should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("12", "123", []);
        }).toThrow("Items are required");
    })
    it("Should calculate total", () => {
        const item = new OrderItem("1", "item 01", 100.0, "p1", 2);
        const item2 = new OrderItem("2", "item 02", 100.0, "p2", 2);
        let order = new Order("12", "123", [item2, item]);
        const total = order.total()
        expect(total).toEqual(400)
    })
    it("Should throw error check if the item qty is greater than 0 ", () => {


        expect(() => {
            const item = new OrderItem("1", "item 01", 100.0, "p1", 0);
            new Order("12", "123", [item]);
        }).toThrow("Quantity must be greater than 0")
    })

})