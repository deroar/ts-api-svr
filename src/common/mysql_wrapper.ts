import { Sequelize } from 'sequelize-typescript';

export class MysqlWrapper {
    static getInstance(path) {
        return new Sequelize({
            database: 'ts',
            dialect: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "Nori0726+",
            dialectOptions: {
                insecureAuth: true,
            },
            modelPaths: [__dirname + '/../models/' + path + '.ts'],
            logging: console.log,
        });
    }
}