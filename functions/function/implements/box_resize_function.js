import Function from '../function.js'

export default class BoxResizeFunction extends Function {
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
        this.style.height = `${newWidth}px`;

        let imageWidth = parseFloat(this.querySelector(".image-main").style.width) || 0; // Use 0 if width is not defined
        let imageHeight = parseFloat(this.querySelector(".image-main").style.height) || 0; // Use 0 if height is not defined

        let newImageWidth = imageWidth + movementX
        let newImageHeight = imageHeight + movementY

        this.querySelector(".image-main").style.width = newImageWidth + "px"
        this.querySelector(".image-main").style.height = newImageWidth + "px"
    }
}