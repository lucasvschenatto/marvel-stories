import express from 'express'
import request from 'request'
import {Md5} from 'ts-md5'


const timestamp = Date.now().toString()
const publicKey = '6342bb2f938ce53effd19d116f5c23f0'
const privateKey = '108ae3b64060b90637c1a08f389d9b01e64183b7'
const storiesQuantity = 5
const md5 = new Md5()
const hash = md5.appendStr(timestamp).appendStr(privateKey).appendStr(publicKey).end()
const heroes = ['Iron Man', 'Thor', 'Doctor Strange']
let characters:string[] = []
heroes.forEach(hero=>{
    request(
        `http://gateway.marvel.com/v1/public/characters?name=${hero}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`,
        (error, _, bodyString)=>{
            if(error){
                console.log(error)
            }
            const body = JSON.parse(bodyString)
            characters.push(body.data.results[0].id)
    })

})

const app = express()

app.get('/',(_,res)=>{
    request(
        `http://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&characters=${characters.join(',')}&limit=${storiesQuantity}`,
        (error, _, body)=>{
            res.send(body)
            if(error){
                console.log(error)
            }
    })
})

app.listen(8000,()=>{
    console.log(`[SERVER] Running at http://localhost:8000`)
})