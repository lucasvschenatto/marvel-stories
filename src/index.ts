import express from 'express'
import path from 'path'
import UserPreferences from './UserPreferences'
import * as marvelApi from './MarvelApi'

const {storiesQuantity, heroes} = UserPreferences

const app = express()

app.use(express.static( path.join(__dirname,'public') ))

app.get('/stories', async (_,res)=>{
    try{
        const ids = await marvelApi.getCharacterIds(heroes)
        const stories = await marvelApi.getStories(ids,storiesQuantity)
        res.send(stories)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

app.listen(8000,()=>{
    console.log(`[MARVEL-STORIES] Running at http://localhost:8000`)
})