import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({ tableName: "customer", timestamps: false })
export default class CustomerModel extends Model {

    @PrimaryKey
    @Column
    declare id: string

    @Column({ allowNull: false })
    declare name: string

    @Column({ allowNull: false })
    declare street: string

    @Column({ allowNull: false })
    declare number: string

    @Column({ allowNull: false })
    declare zipCode: string

    @Column({ allowNull: false })
    declare city: string

    @Column({ allowNull: false })
    declare active: boolean

    @Column({ allowNull: false })
    declare rewardPoints: number


}