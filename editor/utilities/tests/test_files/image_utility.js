class Utility {
    constructor(element) {
        this.element = element
    }

    selectElement = () => {
        console.log("Must override selectElement")
    }

    deselectElement = () => {
        console.log("Must override deselectElement")
    }

    constructToolbar = () => {
        console.log("Must override constructToolbar")
    }

    enableDrag = () => {
        console.log("Must override enableDrag")
    }
}





class ImageUtility extends Utility {
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

class ImageToolbar {
    constructor(element) {
        this.toolbarDiv = document.getElementById("toolbarDiv")
        this.registerElement(element)
        this.page = document.getElementById("page")
    }

    registerElement = (element) => {
        if (element.classList.contains("image")) {
            this.element = element
        } else {
            console.error("element type not suitable for toolbar")
        }
    }
    constructToolbar = () => {
        this.dragButton = document.createElement("button")
        this.dragButton.innerText = "Enable Drag"


        this.disableDragButton = document.createElement("button")
        this.disableDragButton.innerText = "Disable Drag"


        this.resizeButton = document.createElement("button")
        this.resizeButton.innerText = "Resize Image"


        this.disableResizeButton = document.createElement("button")
        this.disableResizeButton.innerText = "Disable Resize"


        this.fileInput = document.createElement("input")
        this.fileInput.type = "file"
        this.fileInput.innerText = "Input Image"
        this.fileInput.style.cursor = "pointer"


        this.img = document.createElement("img")
        this.img.style.width = "25px"
        this.img.style.height = "25px"
        this.img.style.backgroundColor = "grey"
        this.fileInputSubmit = document.createElement("button")
        this.fileInputSubmit.innerText = "Submit Image"
        this.div = document.createElement("div")
        this.div.appendChild(this.fileInput)
        this.div.appendChild(this.img)


        this.toolbarDiv.appendChild(this.dragButton)
        this.toolbarDiv.appendChild(this.disableDragButton)
        this.toolbarDiv.appendChild(this.resizeButton)
        this.toolbarDiv.appendChild(this.disableResizeButton)
        this.toolbarDiv.appendChild(this.fileInputSubmit)
        this.toolbarDiv.appendChild(this.div)


    }





}
class ImageFunctions {
    constructor(element, toolbar) {
        this.element = element
        this.toolbar = toolbar
    }

    enableFileDrop = () => {

    }

    handleFileInputSubmit = () => {
        this.element.src = URL.createObjectURL(this.toolbar.fileInput.files.item(0))
        this.element.style.backgroundColor = "transparent"
    }


    handleFileInput = () => {
        let file = URL.createObjectURL(this.toolbar.fileInput.files.item(0))
        this.toolbar.img.src = file
    }

    enableDragMode = () => {

        this.dragElement(this.element)
    }

    disableDragMode = () => {
        this.disableDragElement(this.element)
       
    }


    disableDragElement = (elmnt) => {

        elmnt.onmousedown = null
    }

    dragElement = (elmnt) => {


        elmnt.onmousedown = this.dragElementDown
        elmnt.onmouseleave = this.stopDrag
        elmnt.onmouseup = this.stopDrag

    }

    stopDrag = (event) => {
        event.currentTarget.removeEventListener("mousemove", this.onMouseDrag)
    }

    dragElementDown = (event) => {

        event.currentTarget.addEventListener("mousemove", this.onMouseDrag)
    }

    onMouseDrag({ movementX, movementY }) {
        let container = document.getElementById("page");
        let containerRect = container.getBoundingClientRect();

        let elementStyles = window.getComputedStyle(this);
        let elementLeft = parseFloat(elementStyles.left) || 0; // Use 0 if left is not defined
        let elementTop = parseFloat(elementStyles.top) || 0; // Use 0 if top is not defined
        let elementRect = this.getBoundingClientRect()

        let newLeft = elementLeft + movementX;
        let newTop = elementTop + movementY;

        // Calculate the boundaries based on the container's position and dimensions
        let minLeft = containerRect.left - elementRect.left; // Adjusted for container's position
        let maxLeft = containerRect.right - containerRect.left - elementRect.width; // Adjusted for container's position
        let minTop = containerRect.top - elementRect.top; // Adjusted for container's position
        let maxTop = containerRect.bottom - containerRect.top - elementRect.height; // Adjusted for container's position

        // Ensure the element stays within the boundaries
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
        newTop = Math.max(minTop, Math.min(newTop, maxTop));

        // Update the element's position
        this.style.left = `${newLeft}px`;
        this.style.top = `${newTop}px`;
    }

    enableImageResize = () => {
        this.dragImageElement(this.element)
    }

    disableImageResize = () => {
        this.element.onmousedown = undefined
    }

    dragImageElement = (elmnt) => {



        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = this.dragImgElement
        elmnt.onmouseleave = this.stopImageDrag
        elmnt.onmouseup = this.stopImageDrag

    }

    stopImageDrag = (event) => {
        event.currentTarget.removeEventListener("mousemove", this.onImageDrag)
    }

    dragImgElement = (event) => {

        event.currentTarget.addEventListener("mousemove", this.onImageDrag)
    }

    onImageDrag({ movementX, movementY }) {
        let container = document.getElementById("page");
        let containerRect = container.getBoundingClientRect();

        let elementStyles = window.getComputedStyle(this);
        let elementWidth = parseFloat(elementStyles.width) || 0; // Use 0 if width is not defined
        let elementHeight = parseFloat(elementStyles.height) || 0; // Use 0 if height is not defined
        let elementRect = this.getBoundingClientRect();

        let newWidth = elementWidth + movementX;
        let newHeight = elementHeight + movementY;

        // Calculate the maximum width and height to avoid overflowing the container
        let maxWidth = containerRect.right - elementRect.left; // Maximum width without overflowing the container horizontally
        let maxHeight = containerRect.bottom - elementRect.top; // Maximum height without overflowing the container vertically

        // Ensure the element stays within the maximum width and height
        newWidth = Math.min(newWidth, maxWidth);
        newHeight = Math.min(newHeight, maxHeight);

        // Update the element's size
        this.style.width = `${newWidth}px`;
        this.style.height = `${newHeight}px`;
    }
}
