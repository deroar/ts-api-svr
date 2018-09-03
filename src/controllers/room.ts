import * as express from 'express';
import randomJs from 'random-js';
import { RedisWrapper } from '../common/redis_wrapper';
import * as constants from '../common/constants';

const TEAM_MEMBER_MAX: number = 3;
const engine: randomJs.Engine = randomJs.engines.mt19937().autoSeed();

/** redisk関連 */
const ROOM_KEY = 'ROOM';
const SEPARATOR = '::';
const STATUS_KEY = 'STATUS';

interface RoomInfo {
    red: Array<{[key: string]: string}>;
    blue: Array<{[key: string]: string}>;
}

const makeRoomMemberRedisKey = (roomId: string): string => {
    return `${ROOM_KEY}${SEPARATOR}${roomId}`;
};

const makeRoomStatusRedisKey = (roomId: string): string => {
    return `${ROOM_KEY}${SEPARATOR}${STATUS_KEY}${SEPARATOR}${roomId}`;
};

export let create = async (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId;
    const roomId: string = randomJs.integer(100001, 999999)(engine).toString();
    const team: string = constants.TEAM_BLUE;
    const status: string = constants.USER_STATUS_JOIN;

    const redisClient = RedisWrapper.getClient();
    const roomMemberKey: string = makeRoomMemberRedisKey(roomId);
    const roomStatusKey: string = makeRoomStatusRedisKey(roomId);
    return redisClient.hexistsAsync(roomMemberKey, team)
    .then((result) => {
        if (result) {
            throw new Error(`room is already exists. room id=${roomId}`);
        }
    }).then(() => {
        return redisClient.multi()
        .hset(roomMemberKey, team, userId)
        .hset(roomStatusKey, userId, status)
        .execAsync();
    }).then(() => {
        const results = getRoomInfo(roomId);
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(results);
    });
};

export let join = (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId;
    const roomId: string = req.body.roomId;
    const team: string = req.body.team;
    const status: string = constants.USER_STATUS_JOIN;

    const redisClient = RedisWrapper.getClient();
    const roomMemberKey: string = makeRoomMemberRedisKey(roomId);
    const roomStatusKey: string = makeRoomStatusRedisKey(roomId);

    return redisClient.hgetAsync(roomMemberKey, team)
    .then((memberVals) => {
        const members = separateValues(memberVals);
        if (members.indexOf(userId) !== -1) {
            throw new Error('user is already');
        }

        if (members.length >= TEAM_MEMBER_MAX) {
            throw new Error('team member is already full.');
        }

        members.push(userId);
        return redisClient.multi()
        .hset(roomMemberKey, team, members.join(SEPARATOR))
        .hset(roomStatusKey, userId, status)
        .execAsync();
    })
    .then(() => {
        const results = getRoomInfo(roomId);
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(results);
    });
};

export let roomInfo = (req: express.Request, res: express.Response) => {
    const roomId: string = req.query.roomId;
    return Promise.resolve()
    .then(() => getRoomInfo(roomId))
    .then((roomInfo) => {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(roomInfo);
    });
};

function getRoomInfo(roomId: string): RoomInfo {
    const redisClient = RedisWrapper.getClient();
    const roomMemberKey: string = makeRoomMemberRedisKey(roomId);
    const roomStatusKey: string = makeRoomStatusRedisKey(roomId);

    return redisClient.multi()
    .hgetall(roomMemberKey)
    .hgetall(roomStatusKey)
    .execAsync()
    .then((results) => {
        const teamInfo: object = results[0];
        const memberStatus: Array<object> = results[1];

        let roomInfo: RoomInfo = {
            'blue': [],
            'red': [],
        };

        const blueMembers: string[] = separateValues(teamInfo['blue']);
        const redMembers: string[] = separateValues(teamInfo['red']);

        blueMembers.forEach( (userId) => {
            roomInfo.blue.push({
                userId,
                status: memberStatus[userId]
            });
        });

        redMembers.forEach( (userId) => {
            roomInfo.red.push({
                userId,
                status: memberStatus[userId]
            });
        });
        return roomInfo;
    });
}

function separateValues(value: string): string[] {
    if (!value) {
        return [];
    }
    const values = value.split(SEPARATOR);
    return values;
}

