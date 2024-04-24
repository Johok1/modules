import UtilityTranslationModuleInterface from "../utility_translation_module_interface";

export default class UtilityTranslationModule extends UtilityTranslationModuleInterface{

    constructor(editorUtilityInterface) {
        super(editorUtilityInterface)
    }

    enableDragAll = () => {
        this.enableAllSelect()
    }

    enableAllSelect = () => {
        this.registerElementHandlers(".image", this.enableDrag)
        this.registerElementHandlers(".text", this.enableDrag)
    }

    enableDrag = (element) => {
        this.editorUtilityInterface.utilityFactory.getUtility(element).enableDrag()
    }

    registerElementHandlers = (selector, handlerFunction) => {
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element); // using call() to maintain 'this' context
        });
    }
}