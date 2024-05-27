export default interface CustomerInterface {

    get id(): string

    get name(): string

    changeName(name: string): void
}