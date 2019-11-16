import express from 'express'
import path from 'path'
import settings from './settings.json'
import * as marvel from './marvel'


const app = express()

app.use(express.static( path.join(__dirname,'public') ))

app.get('/stories', async (req,res)=>{
    const {storiesQuantity, heroes} = settings
    try{
        const ids = await marvel.getCharacterIds(heroes)
        const stories = await marvel.getStories(ids,storiesQuantity)
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