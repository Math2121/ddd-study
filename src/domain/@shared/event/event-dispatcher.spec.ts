
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/handler/send-email-when-produt-is-created.handler"
import ProductCreatedEvent from "../../product/event/handler/product-created.event"
import EventDispatcher from "./event-dispatcher"

describe('Domain events tests', () => {

    it('should register an event', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    })

    it('should unregister an event', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0)
    })

    it('should unregister all events', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined()
    })

    it('should notify all events', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const spyEventhandler = jest.spyOn(eventHandler, 'handle')

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 1020
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventhandler).toHaveBeenCalled()
    })
})