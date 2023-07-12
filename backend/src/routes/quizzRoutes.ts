import express from 'express';
const router = express.Router();

console.log('Starting quizz routes...');

router.get('/', (req, res) => {
    res.send('Hello World from quizz!');
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