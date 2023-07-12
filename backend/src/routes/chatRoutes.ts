import express from 'express';
const router = express.Router();

console.log('Starting chat routes...');

router.get('/', (req, res) => {
    res.send('Hello World from chat!');
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