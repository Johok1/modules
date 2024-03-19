import Utility from './utility.js'
import TextFunctions from './functions/text_functions.js'
import TextToolbar from './toolbar/text_toolbar.js'

export default class TextUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = new TextToolbar(element)

        this.functions = new TextFunctions(element)
    }

    selectElement = () => {
        this.element.style.border = "solid 1px red"
        this.functions.disableDragMode()

    }

    deselectElement = () => {
        this.element.style.border = "none"
        this.functions.handleDisableEditText()
        this.enableDrag()
    }

    constructToolbar = () => {
        this.toolbar.constructToolbar()
        this.initBoxResizeBtn()
        this.initBoxDisableResizeBtn()
        this.initEditTextBtn()
        this.initDisableEditTextBtn()
        this.initEnableDragBtn()
        this.initDisableDragBtn()
    }

    enableDrag = () => {
        this.functions.enableDragMode()
    }


    initBoxResizeBtn = () => {
        this.toolbar.resizeButton.addEventListener("click", this.functions.boxResize)
    }

    initBoxDisableResizeBtn = () => {
        this.toolbar.disableResizeButton.addEventListener("click", this.functions.boxDisableResize)
    }

    initEditTextBtn = () => {
        this.toolbar.editTextBtn.addEventListener("click", this.functions.handleEditText)
    }

    initDisableEditTextBtn = () => {
        this.toolbar.disabelEditText.addEventListener("click", this.functions.handleDisableEditText)
    }

    initEnableDragBtn = () => {
        this.toolbar.dragButton.addEventListener("click", this.functions.enableDragMode)
    }

    initDisableDragBtn = () => {
        this.toolbar.disableDragButton.addEventListener("click", this.functions.disableDragMode)
    }

}
