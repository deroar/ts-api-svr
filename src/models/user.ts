import { Table, Column, Model, AllowNull, Default, DefaultScope, CreatedAt, UpdatedAt, PrimaryKey } from 'sequelize-typescript';

@DefaultScope({
    order: ['id', 'name', 'exp', ],
})
@Table({
    tableName: 'user',
    timestamps: true,
    paranoid: true,
})
export default class User extends Model<User> {
    @PrimaryKey
    @Column
    id: string;

    @AllowNull(false)
    @Default('')
    @Column
    name: string;

    @AllowNull(false)
    @Default(0)
    @Column
    exp: number;
}