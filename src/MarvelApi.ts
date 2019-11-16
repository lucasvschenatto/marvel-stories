import request from 'request'
import * as types from './Types'
import {Md5} from 'ts-md5'
import APIKeys from './APIKeys'
import UserPreferences from './UserPreferences'

const createHash = (timestamp:string,privateKey:string, publicKey:string):string =>{
    const md5 = new Md5()
    return md5.appendStr(timestamp).appendStr(privateKey).appendStr(publicKey).end().toString()
}

const createTimestamp = ():string=>{
    return Date.now().toString()
}


const {publicKey, privateKey} = APIKeys
const timestamp = createTimestamp()
const hash = createHash(timestamp,privateKey,publicKey)


const getCharacterId = (hero:string):Promise<number> => {
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

const getCharacterIds = async (names:string[]):Promise<number[]> => {
    return Promise.all(names.map(getCharacterId))
}

const getStories = async (charactersIds:number[],quantity:number):Promise<string[]> => {
    return new Promise<string[]>((resolve,reject)=>{
        request(
            `http://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&characters=${charactersIds.join(',')}&limit=${quantity}`,
            (error, _, bodyString)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }
                const body = JSON.parse(bodyString) as types.Response<types.Story>
                const titles = body.data.results.map<string>(story=>story.title)
                resolve(titles)
        })
    })
}

export  {getStories, getCharacterIds}