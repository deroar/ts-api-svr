import { Sequelize } from 'sequelize-typescript';

export class MysqlWrapper {
    static getInstance() {
        const env: string = process.env.NODE_ENV || 'local';
        return new Sequelize({
            database: `ts_${env}`,
            dialect: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "Nori0726+",
            dialectOptions: {
                insecureAuth: true,
            },
            logging: console.log,
        });
    }
}