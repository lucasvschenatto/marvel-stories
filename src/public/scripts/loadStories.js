const storiesElement = document.getElementById('stories')

function appendListItem (text){
    let storyElement = document.createElement("li")
    storyElement.textContent = text
    storiesElement.appendChild(storyElement)
}

axios.get('stories')
.then(response => response.data.forEach(appendListItem))
.catch(error => console.log(error))