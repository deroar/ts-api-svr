import { Table, Column, Model, AllowNull, Default, DefaultScope, CreatedAt, UpdatedAt, PrimaryKey, Length, Unique } from 'sequelize-typescript';

@DefaultScope({
    order: ['name', ],
})
@Table({
    tableName: 'account',
    timestamps: true,
    paranoid: true,
})
export default class User extends Model<User> {
    @PrimaryKey
    @Unique
    @Column
    name: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Default('')
    @Column
    userId: string;

    @Unique
    @AllowNull(false)
    @Column
    hash: string;
}