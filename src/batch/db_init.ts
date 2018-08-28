import { Sequelize } from 'sequelize-typescript';
import { MysqlWrapper } from '../common/mysql_wrapper';
import User from '../models/user';
import Guild from '../models/guild';

const databases: string[] = [
    'ts'
];

const tables = {
    'user': User,
    'guild': Guild,
};

const sequelize = new Sequelize({
    database: "",
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Nori0726+",
    logging: console.log,
});

const env: string = process.env.NODE_ENV || 'local';

export default function init() {
    console.log('-- db init start --');
    return Promise.resolve()
    .then(() => cleanDatabases())
    .then(() => createDatabase('ts'));
    // .then(() => createTables());
}

function cleanDatabases() {
    return Promise.resolve()
        .then(() => {
            return databases.forEach((db: string) => {
                dropDatabase(db);
            });
        });
}

function dropDatabase(db: string): void {
    sequelize.query(`DROP DATABASE \`${db}_${env}\`;`);
}

function createDatabases() {
    return Promise.resolve()
       .then(() => {
            return databases.forEach((db_name) => {
                createDatabase(db_name);
            });
        });
}

function createDatabase(db: string): void {
    sequelize.query(`CREATE DATABASE \`${db}_${env}\`;`);
}

function createTables() {
    return Promise.resolve()
        .then(() => {
            const tables = getTables();
            for (const key in tables) {
                let _sequelize = MysqlWrapper.getInstance();
                _sequelize.addModels([tables[key]]);
            }
        });
}

function getTables(): object {
    return tables;
}

init();
