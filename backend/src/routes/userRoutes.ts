import express from 'express';
const router = express.Router();

console.log('Starting user routes...');

router.get('/', (req, res) => {
    res.send('Hello World from user!');
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