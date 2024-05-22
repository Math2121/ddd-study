export default class Address {
    _street: string = '';
    _number: string = 's/n';
    _zip: string = '';
    _city: string = '';

    constructor(street: string, number: string, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }

    validate(): void {
        if (this._street.length === 0) {
            throw new Error("Street is required")
        }

        if (this._zip.length === 0) {
            throw new Error("Zip is required")
        }

        if (this._city.length === 0) {
            throw new Error("City is required")
        }
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }
    toString() {
        return `${this._street}, ${this._number} - ${this._zip} - ${this._city}`
    }
}