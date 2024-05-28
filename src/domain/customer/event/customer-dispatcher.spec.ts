import EventDispatcher from "../../@shared/event/event-dispatcher"
import CustomerChangeAddressEvent from "./customer-change-address.event"
import CustomerCreatedEvent from "./customer-created.event"
import EnviaConsoleLog1Handler from "./handler/EnviaConsoleLog1Handler"
import EnviaConsoleLog2Handler from "./handler/EnviaConsoleLog2Handler"
import EnviaConsoleLogHandlerChangeAddress from "./handler/EnviaConsoleLogHandlerChangeAddress"

describe('Customer Event', () => {

    it('should create a customer created event', () => {

        const eventDispatcher = new EventDispatcher()

        const customerCreatedEvent = new CustomerCreatedEvent({ customerId: '1', name: 'Customer 1' })

        const eventHandler = new EnviaConsoleLog1Handler()
        expect(eventDispatcher).toBeDefined()

        eventDispatcher.register('CustomerCreatedEvent', eventHandler)

        eventDispatcher.notify(customerCreatedEvent)

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(1)

    })


    it('should create a customer created event two', () => {

        const eventDispatcher = new EventDispatcher()

        const customerCreatedEvent = new CustomerCreatedEvent({ customerId: '1', name: 'Customer 1' })  

        const eventHandler = new EnviaConsoleLog2Handler()

        expect(eventDispatcher).toBeDefined()

        eventDispatcher.register('CustomerCreatedEvent', eventHandler)

        eventDispatcher.notify(customerCreatedEvent)

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(1)

    })

    it('should create an event for change address', () => {

        const eventDispatcher = new EventDispatcher()

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({ id: '1', nome: 'Customer 1', endereco: 'Customer 1' })

        const eventHandler = new EnviaConsoleLogHandlerChangeAddress()

        expect(eventDispatcher).toBeDefined()

        eventDispatcher.register('CustomerChangeAddressEvent', eventHandler)

        eventDispatcher.notify(customerChangeAddressEvent)

        expect(eventDispatcher.getEventHandlers['CustomerChangeAddressEvent']).toBeDefined()

        expect(eventDispatcher.getEventHandlers['CustomerChangeAddressEvent'].length).toBe(1)

        
    })

})