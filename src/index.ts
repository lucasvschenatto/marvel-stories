import express from 'express'
import request from 'request'
import APIKeys from './APIKeys'
import UserPreferences from './UserPreferences'
import {Md5} from 'ts-md5'


const timestamp = Date.now().toString()
const {publicKey, privateKey} = APIKeys
const {storiesQuantity, heroes} = UserPreferences
const md5 = new Md5()
const hash = md5.appendStr(timestamp).appendStr(privateKey).appendStr(publicKey).end()
let characters:string[] = []

const getHeroId = (hero:string):Promise<string> =>{
    return new Promise<string>((resolve,reject)=>{
        request(
            `http://gateway.marvel.com/v1/public/characters?name=${hero}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`,
            (error, _, bodyString)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }
                const body = JSON.parse(bodyString)
                resolve(body.data.results[0].id)
        })
    })
}


// heroes.forEach(hero=>{
//     request(
//         `http://gateway.marvel.com/v1/public/characters?name=${hero}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`,
//         (error, _, bodyString)=>{
//             if(error){
//                 console.log(error)
//             }
//             const body = JSON.parse(bodyString)
//             characters.push(body.data.results[0].id)
//     })

// })

const app = express()

app.get('/',(_,res)=>{
    Promise.all(heroes.map(getHeroId))
    .then(charactersIds=>{
        request(
            `http://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&characters=${charactersIds.join(',')}&limit=${storiesQuantity}`,
            (error, _, body)=>{
                res.send(body)
                if(error){
                    console.log(error)
                }
        })
    })
    // request(
    //     `http://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&characters=${characters.join(',')}&limit=${storiesQuantity}`,
    //     (error, _, body)=>{
    //         res.send(body)
    //         if(error){
    //             console.log(error)
    //         }
    // })
})

app.listen(8000,()=>{
    console.log(`[SERVER] Running at http://localhost:8000`)
})