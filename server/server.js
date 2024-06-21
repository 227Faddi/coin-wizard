const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors')

app.use(cors());
app.use(express.static('public'))

app.get('/random', (req, res)=>{
    let random = function flip(){
        return Math.random() < 0.5 ? 'Heads' : 'Tails'
    }
    res.json({ result : random()})
})

app.listen(PORT, ()=>{
    console.log(`Server on at port ${PORT}`)
})