export default class UtilityHandlerModuleInterface {

    constructor(editorUtilityInterface) {
        this.editorUtilityInterface = editorUtilityInterface
    }

    registerAllHandlers = () => {
        console.error("implementation required on registerAllHandlers from type UtilityHandlerModuleInterface")
    }

    resetAllElementHandlers = () => {
        console.error("implementation required on resetAllElementHandlers from type UtilityHandlerModuleInterface") 
    }
}