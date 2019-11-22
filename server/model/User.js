const pool = require('../module/poolAsync');

module.exports = {

        read: ({
            userId
        }) => {
            const table = 'users';
            const query = `SELECT * FROM ${table} WHERE userId = ${userId}`;
            return pool.queryParam_None(query)
                .then(result => {
                    const face = result[0];
                    if (!face) {
                        throw new Error('No Face');
                    }
                    return face;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                })
        },
        update: ({
            userId,
            age
        }) => {
            const table = 'users';
            return pool.queryParam_None(`UPDATE ${table} SET age = ${age} WHERE userId = ${userId}`)      
        },
        insert: ({
            face,
            age
        }) => {
            const table = 'users';
            const fields = 'face, age';
            const questions = `?, ?`;
            const values = [face, age];
            return pool.queryParam_Parse(`INSERT INTO ${table}(${fields}) VALUES(${questions})`, values)
        }
}