import './index.scss'

export default {
    turnInspectorOn: setMarker => {
        const inspectorOn = 'inspector-on'
        const allElements = document.querySelectorAll('*[class]')
    
        listenerElements(allElements, 'add')
    
        /**
         * Setup marker on clicked position and close inspector mode
         *
         * @param {Event} event - click event
         */
        function onClickBody(event) {
            setMarker({
                X: event.x - 15,
                Y: event.y - 15
            })
            listenerElements(allElements, 'remove')
        }
    
        /**
         * Configure enter/out inspector mode by setting listeners and class on body
         * @param {HTMLElement} elements
         * @param {add|remove} action - add or remove
         */
        function listenerElements(elements, action) {
            elements.forEach(element => element[action + 'EventListener']('click', onClickBody));
            document.body.classList[action](inspectorOn)
        }
        return true
    }
}