import { Column, PrimaryKey, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import CustomerModel from "./customer.mode";
import OrderItemModel from "./orderItem.mode";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customerId: string

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel

    @Column({ allowNull: false })
    declare total: number

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[]



}