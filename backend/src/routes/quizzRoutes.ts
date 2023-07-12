import express from 'express';
const router = express.Router();

console.log('Starting quizz routes...');

const middleware = require('../middleware/index.ts');
router.use(middleware.decodeToken);

router.get('/', (req, res) => {
    
    const uuid = res.locals.userUuid;
    return res.json({
        userUuid: uuid,
    });
});
  
router.get('/tasks', (req, res) => {
    return res.json({
        tasks: [
            {title: 'Task1',},
            {title: 'Task2',},
        ],
    });
});

module.exports = router;