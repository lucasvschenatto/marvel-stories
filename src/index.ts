import express from 'express'
import request from 'request'

const timestamp = Date.now()
request(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}`,(error, response, body)=>{

})
const app = express()

app.get('/',(_,res)=>{
    request(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}`,(error, response, body)=>{
    console.log(error)
    console.log(response)
    res.send(body)

})
    // res.send('Marvel Stories go here')
})

app.listen(8000,()=>{
    console.log(`[SERVER] Running at http://localhost:8000`)
})