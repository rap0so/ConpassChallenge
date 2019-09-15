import './index.scss'

/** 
 * @summary Reset dots and message boxes
 * @description Anonymous function to clean and set dots + messageBoxes on the page
 * @param {Object[]} markers - Markers on state pattern
*/
export default (markers, updateMarker) => {
    document.querySelectorAll('.wrapper-dot').forEach(elem => elem.remove())
    if (!markers || !markers.length) {
        return
    }
    markers.forEach(marker => {
        const holderDot = document.createElement('div')
        const dot = document.createElement('div')
        dot.classList.add('dot')
        holderDot.classList.add('wrapper-dot')
        holderDot.style.left = `${marker.target.X}px`
        holderDot.style.top = `${marker.target.Y}px`
        holderDot.appendChild(dot)
        document.body.appendChild(holderDot)
        const messageBox = document.createElement('div')
        messageBox.setAttribute('data-marker', marker.id)
        messageBox.classList.add('message-box')
        if (!marker.title) {
            messageBox.innerHTML = `<span class='wrapper-input'><input placeholder="Digite o titulo"/></span>
            <div class='wrapper-text'><textarea placeholder="Digite a descrição"></textarea></div>
            <div class='wrapper-message-button'>
                <button class='blue-btn' data-marker="${marker.id}">Salvar</button>
            </div>`
            messageBox.querySelector('button').addEventListener('click', function onSaveButton(event) {
                const currentId = event.target.getAttribute('data-marker')
                const parent = document.querySelector(`.message-box[data-marker="${currentId}"]`)
                const input = parent.querySelector('input')
                const textarea = parent.querySelector('textarea')
                if (input.value && textarea.value) {
                    updateMarker({
                        id: currentId,
                        title: input.value,
                        description: textarea.value
                    })
                    messageBox.innerHTML = `<span class='wrapper-message-title'><p class='marker-title'>${marker.title}</p></span>
                    <div class='wrapper-text'><p class='marker-description'>${marker.description}</p></div>`
                } else {
                    messageBox.innerHTML = `<p class='marker-error'>Hotspot não atualizado</p>`
                }
            })
        } else {
            messageBox.innerHTML = `<span class='wrapper-message-title'><p class='marker-title'>${marker.title}</p></span>
            <div class='wrapper-text'><p class='marker-description'>${marker.description}</p></div>`
        }
        holderDot.appendChild(messageBox)
    })
}