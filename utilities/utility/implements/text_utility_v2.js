import Utility from './utility.js'


export default class TextUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = this.toolbarInterface.textToolbar;
        this.toolbar.registerElement(this.element)
        this.functions = this.utilityFunctionInterface.functionFacade.textFunctionFacade
    }

    selectElement = () => {
        this.element.querySelector(".textParagraph").style.border = "solid 1px red"
        this.functions.summernoteFunction.disableDragMode(this.element)
 
    }

    deselectElement = () => {
        this.element.querySelector(".textParagraph").style.border = "none"
        this.functions.summernoteFunction.handleDisableEditText(this.element, this.constructToolbar)
        this.functions.summernoteFunction.enableDragMode(this.element)
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
        this.functions.summernoteFunction.enableDragMode(this.element)
    }

    initCancelSelectionBtn = () => {
        this.toolbar.cancelSelectionBtn.addEventListener("click", this.deselectElement)
    }

    initBoxResizeBtn = () => {
        let onBoxResize = this.functions.horizontalResizeFunction.onBoxResize
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
        this.toolbar.editTextBtn.addEventListener("click", this.summernoteHandleEditText)
    }

    summernoteHandleEditText = () => {
        this.functions.summernoteFunction.handleEditText(this.element, this.deconstructToolbar, this.constructToolbar)
    }


}
