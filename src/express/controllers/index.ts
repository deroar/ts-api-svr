import express = require('express');

interface SampleObj {
    key: string;
}

/*
 * JSON形式で文字列を返す。
 */
export let index = (req: express.Request, res: express.Response) => {
    const param: SampleObj  = { "key": "これはサンプルAPIです" };
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(param);
};