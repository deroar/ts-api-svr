import { Table, Column, Model, AllowNull, Default, DefaultScope, CreatedAt, UpdatedAt, PrimaryKey, Length } from 'sequelize-typescript';

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
    userId: string;

    @AllowNull(false)
    @Length({min: 2, max: 20})
    @Column
    name: string;

    @AllowNull(false)
    @Default(0)
    @Column
    exp: number;
}