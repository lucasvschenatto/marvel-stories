import express from 'express'

const app = express()

app.get('/',(_,res)=>{
    res.send('Marvel Stories go here')
})

app.listen(8000,()=>{
    console.log(`[SERVER] Running at http://localhost:8000`)
})