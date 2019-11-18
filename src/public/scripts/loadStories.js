const storiesElement = document.getElementById('stories')
const loadingElement = document.getElementById('loading')

function appendListItem (text){
    let storyElement = document.createElement("li")
    storyElement.textContent = text
    storiesElement.appendChild(storyElement)
}
function loadStories(){
    axios.get('stories')
    .then(response => {
        response.data.forEach(appendListItem)
        loadingElement.hidden = true

    }).catch(error => {
        console.log(error)
        window.alert("Erro, verifique se as chaves da API estão configuradas.")
    })
}