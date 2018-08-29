import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const APP_SECRET = 'TN93KF8OH4FB3T9X';
const GAME_TOKEN_HEADER = 'x-access-token';

export const requireToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.body.token || req.query.token || req.headers[GAME_TOKEN_HEADER];
    await verifyToken(token).catch((err: any) => {
        res.sendStatus(401);
    });

    next();
};

export let generateToken = (hash: string) => {
    return jwt.sign({ hash }, APP_SECRET, {
        algorithm: "HS256",
        expiresIn: 60 * 60 * 24
    });
};

const verifyToken = (token: string): Promise<{}> => {
    return new Promise((resolve, reject) => {
        return jwt.verify(token, APP_SECRET, (err: any, decoded: string) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });

};