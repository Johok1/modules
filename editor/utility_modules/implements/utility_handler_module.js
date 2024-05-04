export default class UtilityHandlerModule extends UtilityHandlerModuleInterface {

    constructor() {
        super()
    }

    registerAllHandlers = (select, layer) => {

        this.registerElementHandlers(".image", this.registerImageHandlers, select, layer);
        this.registerElementHandlers(".text", this.registerTextHandlers, select, layer);
    }

    resetAllElementHandlers = (select) => {
        this.registerElementResetHandlers(".image", this.resetImageElementHandlers, select)
        this.registerElementResetHandlers(".text", this.resetTextElementHandlers, select)
    }

    registerImageHandlers = (imgElement, select, layer) => {
        if (imgElement.getAttribute('data-dblclick-attached') !== 'true') {
            const imageUtility = this.editorUtilityInterface.utilityFactory.getUtility(imgElement);

            if (imgElement.getAttribute("layer") == layer) {
                // Attach the dblclick event listener
                imgElement.addEventListener("dblclick", () => select(imageUtility));

                // Set a custom attribute to indicate that the event listener has been attached
                imgElement.setAttribute('data-dblclick-attached', 'true');
            }
        }
    }

    registerTextHandlers = (textElement, select, layer) => {


        // Check if the dblclick handler has not already been attached
        if (!textElement.hasAttribute('data-dblclick-attached')) {
            const textUtility = this.editorUtilityInterface.utilityFactory.getUtility(textElement);

            if (textElement.getAttribute("layer") == layer) {
                textElement.addEventListener("dblclick", () => select(textUtility));
                textElement.setAttribute('data-dblclick-attached', 'true'); // Mark it as attached
            }
        }


    }

    resetImageElementHandlers = (element,select) => {
        if (element.hasAttribute('data-dblclick-attached')) {
            let newElement = element.cloneNode(true)
            newElement.removeAttribute('data-dblclick-attached');
            element.parentNode.replaceChild(newElement, element);
        }
    }

    resetTextElementHandlers = (element,select) => {
        if (element.hasAttribute("data-dblclick-attached")) {
            let newElement = element.cloneNode(true)
           
            newElement.removeAttribute("data-dblclick-attached")

            element.parentNode.replaceChild(newElement, element)
        }
    }

    registerElementHandlers = (selector, handlerFunction, select, layer) => {
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element, select, layer); // using call() to maintain 'this' context
        });
    }

    registerElementResetHandlers = (selector, handlerFunction, select) => {
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element, select); // using call() to maintain 'this' context
        });
    }
}