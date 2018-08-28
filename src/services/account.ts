import { MysqlWrapper } from '../common/mysql_wrapper';
import Account from '../models/account';

/**
 * account テーブルの userId を更新する
 * @param name 更新対象のname
 * @param userId 更新するuserId
 */
export let updateUserId = (name: string, userId: string) => {
    const sequelize = MysqlWrapper.getInstance();

    return Promise.resolve()
    .then(() => sequelize.addModels([Account]))
    .then(() => sequelize.sync())
    .then(() => Account.update({ userId }, { where: { name } }));
};