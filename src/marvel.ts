import request from 'request'
import * as types from './Types'
import {Md5} from 'ts-md5'
import APIKeys from './APIKeys.json'

const {publicKey, privateKey} = APIKeys

function createHash (timestamp:string,privateKey:string, publicKey:string):string {
    const md5 = new Md5()
    return md5.appendStr(timestamp).appendStr(privateKey).appendStr(publicKey).end().toString()
}

function createTimestamp ():string {
    return Date.now().toString()
}

function getCharacterIds (names:string[]):Promise<number[]> {
    return Promise.all(names.map(getCharacterId))
}

function getCharacterId (hero:string):Promise<number> {
    const timestamp = createTimestamp()
    const hash = createHash(timestamp,privateKey,publicKey)
    return new Promise<number>((resolve,reject)=>{
        request(
            `http://gateway.marvel.com/v1/public/characters?name=${hero}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`,
            (error, response)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }
                const body = JSON.parse(response.body) as types.Response<types.Character>
                resolve(body.data.results[0].id)
        })
    })
}


function getStories (charactersIds:number[],quantity:number):Promise<string[]> {
    const timestamp = createTimestamp()
    const hash = createHash(timestamp,privateKey,publicKey)
    return new Promise<string[]>((resolve,reject)=>{
        request(
            `http://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&characters=${charactersIds.join(',')}&limit=${quantity}`,
            (error, response)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }
                const body = JSON.parse(response.body) as types.Response<types.Story>
                const titles = body.data.results.map<string>(story=>story.title)
                resolve(titles)
        })
    })
}

export  {getStories, getCharacterIds}