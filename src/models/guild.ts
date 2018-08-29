import User from './user';
import { Table, Column, Model, AllowNull, Default, DefaultScope, CreatedAt, UpdatedAt, PrimaryKey, ForeignKey, Unique } from 'sequelize-typescript';

@DefaultScope({
    order: ['guildId', 'userId', 'role', ],
})
@Table({
    tableName: 'guild',
    timestamps: true,
    paranoid: true,
})
export default class Guild extends Model<Guild> {
    @PrimaryKey
    @Column
    guildId: string;

    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId: string;

    @AllowNull(false)
    @Default(0)
    @Column
    role: number;
}