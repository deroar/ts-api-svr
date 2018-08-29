import { Table, Column, Model, AllowNull, Default, DefaultScope, PrimaryKey, Max, Min } from 'sequelize-typescript';

@DefaultScope({
    order: ['userId', 'order', ],
})
@Table({
    tableName: 'user_deck',
    timestamps: true,
    paranoid: true,
})
export default class User extends Model<User> {
    @PrimaryKey
    @Column
    userId: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Default(0)
    @Column
    number: number;

    @AllowNull(false)
    @Default(0)
    @Max(30)
    @Min(0)
    @Column
    order: number;

    @AllowNull(false)
    @Default(0)
    @Column
    objectId: number;
}