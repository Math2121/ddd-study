import Order from "../../entity/order";
import Product from "../../entity/product";
import ProductRepositoryInterface from "../../repositories/product-repository-interface";
import OrderModel from "../db/sequelize/order.model";
import OrderItemModel from "../db/sequelize/orderItem.mode";
import ProductModel from "../db/sequelize/product.model";

export default class OrderRepository {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            })),
        }, {
            include: [{ model: OrderItemModel }]
        }
        )
    }




}