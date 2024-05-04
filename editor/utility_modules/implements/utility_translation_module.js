import UtilityTranslationModuleInterface from "../utility_translation_module_interface";

export default class UtilityTranslationModule extends UtilityTranslationModuleInterface{

    constructor() {
        super()
    }

    enableDragAll = (layer) => {
        this.enableAllSelect(layer)
    }

    enableAllSelect = (layer) => {
        this.registerElementHandlers(".image", this.enableDrag, layer)
        this.registerElementHandlers(".text", this.enableDrag, layer)
    }

    enableDrag = (element,layer) => {
        if (element.getAttribute("layer") == layer) {
            this.editorUtilityInterface.utilityFactory.getUtility(element).enableDrag()
        }
    }

    registerElementHandlers = (selector, handlerFunction, layer) => {
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element, layer); // using call() to maintain 'this' context
        });
    }
}