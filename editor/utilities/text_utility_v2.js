import Utility from './utility.js'
import TextFunctions from './functions/text_functions.js'
import TextToolbar from './toolbar/text_toolbar.js'

export default class TextUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = new TextToolbar(element)

        this.functions = new TextFunctions(element, this.deconstructToolbar, this.constructToolbar)
    }

    selectElement = () => {
        this.element.querySelector(".textParagraph").style.border = "solid 1px red"
        this.functions.disableDragMode()
 
    }

    deselectElement = () => {
        this.element.querySelector(".textParagraph").style.border = "none"
        this.functions.handleDisableEditText()
        this.enableDrag()
        this.deconstructToolbar()
     
    }

    deconstructToolbar = () => {
        this.toolbar.deconstructToolbar()
    }

    constructToolbar = () => {
        this.toolbar.constructToolbar()
        this.initBoxResizeBtn()
        this.initEditTextBtn()
        this.initCancelSelectionBtn()
    }

    

    enableDrag = () => {
        this.functions.enableDragMode()
    }

    initCancelSelectionBtn = () => {
        this.toolbar.cancelSelectionBtn.addEventListener("click", this.deselectElement)
    }

    initBoxResizeBtn = () => {
        let onBoxResize = this.functions.onBoxResize
        let element = this.element
        this.toolbar.resizeButton.addEventListener("mousedown", (event) => {
            // Initiate resizing - attach mousemove to document
            element.addEventListener("mousemove", onBoxResize);
            event.preventDefault(); // Prevent default drag behavior
        });

        document.addEventListener("mouseup", () => {
            // End resizing - remove mousemove from document
            element.removeEventListener("mousemove", onBoxResize);
        });

    }

   

    initEditTextBtn = () => {
        this.toolbar.editTextBtn.addEventListener("click", this.functions.handleEditText)
    }


}
