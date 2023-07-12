import express from 'express';
const router = express.Router();

console.log('Starting auth routes...');

const middleware = require('../middleware/index.ts');
router.use(middleware.decodeToken);

router.get('/', (req, res) => {
    const userUuid = res.locals.userUuid;
    return res.json({
        userUuid: userUuid,
    });

  });

module.exports = router;