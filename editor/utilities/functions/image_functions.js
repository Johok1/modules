export default class ImageFunctions {
    constructor(element, toolbar) {
        this.element = element
        this.toolbar = toolbar
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
