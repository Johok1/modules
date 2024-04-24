export default class UtilitySelectionModuleInterface {
    constructor(editorUtilityInterface) {
        this.editorUtilityInterface = editorUtilityInterface
        this.selectedEl = null
  
    }

    selectHandler = (element) => {
        console.error("implementation required for selectHandler from type UtilitySelectionMouduleInterface")
    }
}