import express from 'express'
import request from 'request'
import APIKeys from './APIKeys'
import UserPreferences from './UserPreferences'
import * as types from './Types'
import {Md5} from 'ts-md5'


const timestamp = Date.now().toString()
const {publicKey, privateKey} = APIKeys
const {storiesQuantity, heroes} = UserPreferences
const md5 = new Md5()
const hash = md5.appendStr(timestamp).appendStr(privateKey).appendStr(publicKey).end()
let characters:string[] = []

const getCharacterId = (hero:string):Promise<number> =>{
    return new Promise<number>((resolve,reject)=>{
        request(
            `http://gateway.marvel.com/v1/public/characters?name=${hero}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`,
            (error, _, bodyString)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }
                const body = JSON.parse(bodyString) as types.Response<types.Character>
                resolve(body.data.results[0].id)
        })
    })
}

const getCharacterIds = async (names:string[]):Promise<number[]>=>{
    return Promise.all(names.map(getCharacterId))
}

const app = express()

app.get('/', async(_,res)=>{
    const charactersIds = await getCharacterIds(heroes)
    request(
        `http://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&characters=${charactersIds.join(',')}&limit=${storiesQuantity}`,
        (error, _, bodyString)=>{
            const body = JSON.parse(bodyString) as types.Response<types.Story>
            const titles = body.data.results.map<string>(story=>story.title)
            res.send(titles)
            if(error){
                console.log(error)
            }
    })
})

app.listen(8000,()=>{
    console.log(`[SERVER] Running at http://localhost:8000`)
})