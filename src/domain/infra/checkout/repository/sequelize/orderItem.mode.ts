import { Column, PrimaryKey, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";

@Table({ tableName: "order_items", timestamps: false })
export default class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string

    @BelongsTo(() => ProductModel)
    declare product: ProductModel


    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string


    @Column({ allowNull: false })
    declare quantity: number


    @Column({ allowNull: false })
    declare name: string


    @Column({ allowNull: false })
    declare price: number

    @BelongsTo(() => OrderModel)
    declare order: Awaited<OrderModel>;

}