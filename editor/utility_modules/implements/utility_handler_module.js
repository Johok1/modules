export default class UtilityHandlerModule extends UtilityHandlerModuleInterface {

    constructor(editorUtilityInterface) {
        super(editorUtilityInterface)
    }

    registerAllHandlers = (select) => {
        this.registerElementHandlers(".image", this.registerImageHandlers, select);
        this.registerElementHandlers(".text", this.registerTextHandlers, select);
    }

    resetAllElementHandlers = (select) => {
        this.registerElementHandlers(".image", this.resetImageElementHandlers, select)
        this.registerElementHandlers(".text", this.resetTextElementHandlers, select)
    }

    registerImageHandlers = (imgElement, select) => {
        if (imgElement.getAttribute('data-dblclick-attached') !== 'true') {
            const imageUtility = this.editorUtilityInterface.utilityFactory.getUtility(imgElement);

            // Attach the dblclick event listener
            imgElement.addEventListener("dblclick", () => select(imageUtility));

            // Set a custom attribute to indicate that the event listener has been attached
            imgElement.setAttribute('data-dblclick-attached', 'true');
        }
    }

    registerTextHandlers = (textElement, select) => {


        // Check if the dblclick handler has not already been attached
        if (!textElement.hasAttribute('data-dblclick-attached')) {
            const textUtility = this.editorUtilityInterface.utilityFactory.getUtility(textElement);
           
            textElement.addEventListener("dblclick", () => select(textUtility));
            textElement.setAttribute('data-dblclick-attached', 'true'); // Mark it as attached
        }


    }

    resetImageElementHandlers = (element) => {
        if (element.getAttribute('data-dblclick-attached') == 'true') {

            // Set a custom attribute to indicate that the event listener has been attached
            element.setAttribute('data-dblclick-attached', 'false');
        }
    }

    resetTextElementHandlers = (element) => {
        if (element.hasAttribute("data-dblclick-attached")) {
            element.removeAttribute("data-dblclick-attached")
        }
    }

    registerElementHandlers = (selector, handlerFunction, select) => {
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element, select); // using call() to maintain 'this' context
        });
    }
}