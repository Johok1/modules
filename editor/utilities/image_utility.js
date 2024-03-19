import Utility from './utility.js'
import ImageFunctions from './functions/image_functions.js'
import ImageToolbar from './toolbar/image_toolbar.js'


export default class ImageUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = new ImageToolbar(element)

        this.functions = new ImageFunctions(element, this.toolbar)
    }



    selectElement = () => {
        this.functions.disableDragMode()

    }

    deselectElement = () => {
        this.enableDrag()
    }

    constructToolbar = () => {
        this.toolbar.constructToolbar()
        this.attachFileInputHandler(this.functions.handleFileInput)
        this.attachFileInputSubmitHandler()
        this.initEnableImageDrag()
        this.initDisableImageDrag()
        this.initEnableImageResize()
        this.initDisableImageResize()

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

    initEnableImageDrag = () => {
        this.toolbar.dragButton.addEventListener("click", this.functions.enableDragMode)
    }

    initDisableImageDrag = () => {
        this.toolbar.disableDragButton.addEventListener("click", this.functions.disableDragMode)
    }

    initEnableImageResize = () => {
        this.toolbar.resizeButton.addEventListener("click", this.functions.enableImageResize)
    }

    initDisableImageResize = () => {
        this.toolbar.disableResizeButton.addEventListener("click", this.functions.disableImageResize)
    }

}
