import { Table, Column, Model, AllowNull, Default, DefaultScope, PrimaryKey, } from 'sequelize-typescript';

@DefaultScope({
    order: ['userId', 'objectId', ],
})
@Table({
    tableName: 'user_object',
    timestamps: true,
    paranoid: true,
})
export default class User extends Model<User> {
    @PrimaryKey
    @Column
    userId: string;

    @AllowNull(false)
    @Default(0)
    @Column
    objectId: number;

    @Default('')
    @Column
    used_deck: Text;
}