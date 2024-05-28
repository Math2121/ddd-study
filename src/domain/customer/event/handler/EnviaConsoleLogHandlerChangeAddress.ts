

import EventHandlerInterface from "../../../@shared/event/event-handler.interface"
import CustomerCreatedEvent from "../customer-created.event"


export default class EnviaConsoleLogHandlerChangeAddress implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`)
    }

}