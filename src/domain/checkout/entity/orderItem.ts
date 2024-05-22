export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _quantity: number;
    private _price: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number) {
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._quantity = quantity;
        this._price = price;
    }

    get quantity() {
        return this._quantity;
    }

    get price() {
        return this._price;
    }
    get name() {
        return this._name;
    }
    get productId() {
        return this._productId;
    }

    get id() {
        return this._id;
    }
    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}