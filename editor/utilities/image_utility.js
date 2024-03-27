import Utility from './utility.js'
import ImageFunctions from './functions/image_functions.js'
import ImageToolbar from './toolbar/image_toolbar.js'


export default class ImageUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = new ImageToolbar(element)
     
        this.functions = new ImageFunctions(element, element.querySelector('img'), this.toolbar)
    }



    selectElement = () => {
        this.functions.disableDragMode()
        this.element.style.border = "solid 1px red"

    }

    deselectElement = () => {
        this.enableDrag()
        this.element.style.border = "none"
    }

    constructToolbar = () => {
        this.toolbar.constructToolbar()
        this.attachFileInputHandler(this.functions.handleFileInput)
        this.attachFileInputSubmitHandler()
        
        this.initEnableImageResize()
        this.initDisableImageResize()

    }

    deconstructToolbar = () => {
        this.toolbar.deconstructToolbar()
    }

    enableDrag = () => {
        this.functions.enableDragMode()
    }


    attachFileInputSubmitHandler = () => {
        this.toolbar.fileInputSubmit.addEventListener("click", this.functions.handleFileInputSubmit)
    }

    attachFileInputHandler = (handler) => {
        this.toolbar.fileInput.addEventListener("change", handler)
    }

  
    initEnableImageResize = () => {
        this.toolbar.resizeButton.addEventListener("click", this.functions.enableImageResize)
    }

    initDisableImageResize = () => {
        this.toolbar.disableResizeButton.addEventListener("click", this.functions.disableImageResize)
    }

}
