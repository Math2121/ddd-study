import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe('Customer Factory', () => { 

    it('should create a customer', () => {
        const customer = CustomerFactory.create( "Customer 1")

        expect(customer.name).toBe("Customer 1")
    })

    it('should create a customer with address', () => { 
        const address = new Address( "Street 1", "1", "Zipcode 1", "City 1")

        const customer = CustomerFactory.createWithAddress("teste", address)
        expect(customer.name).toBe("teste")
        expect(customer.address).toBe(address)
    })
})