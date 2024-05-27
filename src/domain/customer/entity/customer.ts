import Address from '../value-object/address';
import CustomerInterface from './customer.interface';

export default class Customer implements CustomerInterface {
    private _id: string;
    private _name: string = '';
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }

        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
    }

    validateActivate() {
        if (this._address === undefined) {
            throw new Error('Address is mandatory to activate a customer');
        }
    }
    get address(): Address {
        return this._address;
    }
    changeAddress(address: Address) {
        this._address = address;
    }

    get name(): string {
        return this._name;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    isActive(): boolean {
        return this._active;
    }

    activate() {
        this.validateActivate();

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
    get rewardPoints(): number {
        return this._rewardPoints;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get id(): string {
        return this._id;
    }

    set Address(address: Address) {
        this._address = address;
    }

}