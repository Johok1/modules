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
        this.element.querySelector(".image-main").style.border = "3px solid red"
        this.functions.attachFileInputHandler()

    }

    deselectElement = () => {
        this.enableDrag()
        this.element.querySelector(".image-main").style.border = "none"
        this.functions.removeFileInputHandler()
        this.deconstructToolbar()
    }

    constructToolbar = () => {
        this.toolbar.constructToolbar()
       // this.attachFileInputHandler(this.functions.handleFileInput)
      //  this.attachFileInputSubmitHandler()

        this.initCancelSelectionBtn()
        this.initEnableImageResize()
       
       

    }

    deconstructToolbar = () => {
        this.toolbar.deconstructToolbar()
    }

   

    enableDrag = () => {
        this.functions.enableDragMode()
    }
    initCancelSelectionBtn = () => {
        this.toolbar.cancelSelectionBtn.addEventListener("click", this.deselectElement)
    }

    attachFileInputSubmitHandler = () => {
        this.toolbar.fileInputSubmit.addEventListener("click", this.functions.handleFileInputSubmit)
    }

    attachFileInputHandler = (handler) => {
        this.toolbar.fileInput.addEventListener("change", handler)
    }

  
    initEnableImageResize = () => {
        let onBoxResize = this.functions.onImageDrag
        let element = this.element
      //  console.log(element)
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

   

}
