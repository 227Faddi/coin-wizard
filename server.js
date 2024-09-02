import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/random', (req, res)=>{
    let random = function flip(){
        return Math.random() < 0.5 ? 'Heads' : 'Tails';
    }
    res.json({ result : random()})
})

app.listen(PORT, ()=>{
    console.log(`Server on at port ${PORT}`)
})