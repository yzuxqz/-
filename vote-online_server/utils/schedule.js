const schedule = require('node-schedule');
const ipDao = require('../dao/ipDao');
module.exports = {
    scheduleCronstyle() {
        schedule.scheduleJob('0 0 0 * * *', async function () {
            try {
                await ipDao.resetVoteNum();
                (`${new Date()}：已发票`);
            } catch (err) {
                (`${new Date()}：发票失败-${err}`);
            }
        });
    }
};