import { v4 } from "uuid";
import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import Address from "../value-object/address";

export default class CustomerFactory {

    static create(name: string): CustomerInterface {

        return new Customer(v4(), name)

    }

    static createWithAddress(name: string, address: Address): Customer {

        let customer = new Customer(v4(), name)

        customer.Address = address
        return customer

    }
}