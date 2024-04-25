import Address from "./address";
import Customer from "./customer";

describe("Customer", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Cláudio Santos");
        }).toThrow("Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("12", "");
        }).toThrow("Name is required");
    })

    it("should change name", () => {
        let customer = new Customer("12", "Teste");

        customer.changeName("Cláudio Santos");
        expect(customer.name).toBe("Cláudio Santos");
    })

    it("should activate customer", () => {

        let customer = new Customer("12", "Teste");
        let address = new Address("Rua José de Alencar", "436", "57051-565", "Maceio");
        customer.Address = address;

        customer.activate()

        expect(customer.isActive()).toBe(true)

    })
    it("should throw error when address is undefined when activate customer ", () => {

        expect(() => {
            let customer = new Customer("12", "Teste");
            customer.activate()
        }).toThrow("Address is mandatory to activate a customer");


    })

    it("should desactivate customer", () => {

        let customer = new Customer("12", "Teste");


        customer.deactivate()

        expect(customer.isActive()).toBe(false)

    })

    it("should add reward points", () => {
        let customer = new Customer("12", "Teste");
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(20)
        expect(customer.rewardPoints).toBe(30)
    })
})