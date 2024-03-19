
class TextFunctions {

    constructor(element) {
        this.element = element
    }

    handleEditText = () => {
        console.log(this.element)
        console.log(this.element.firstChild)
        this.element.classList.add("summernote")
        let top = this.element.style.top
        let left = this.element.style.left
        let width = this.element.style.width
        let height = this.element.style.height
        $(document).ready(function () {
            $('.summernote').summernote({
                focus: true, airMode: true, popover: {
                    air: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['insert', ['link']]
                    ]
                },
                fontColor: '#000000'
            });
            $('.note-editor').css({
                color: "black",
                position: "absolute",
                top: top,
                left: left,
                width: width,
                height: height
            })
        });
    }

    handleDisableEditText = () => {
        var markup = $('.summernote').summernote('code');

        //  this.element.innerHTML = markup

        $('.summernote').summernote('destroy');

        $('.summernote').removeClass('summernote')
    }






    findParentWithTag = (element, tagName) => {
        let parent = element.parentElement;
        while (parent) {
            if (parent.tagName.toLowerCase() === tagName.toLowerCase()) {
                return parent;
            }
            parent = parent.parentElement;
        }
        return null; // If no parent with the specified tag name is found
    }

    checkUndefinedNullEmpty = (check) => {
        if (check == undefined || check == null || check == "") {
            return true
        } else {
            return false
        }
    }



    boxResize = () => {
        this.initResizeBoxElement(this.element)
    }

    boxDisableResize = () => {
        this.element.onmousedown = undefined
    }

    initResizeBoxElement = (elmnt) => {



        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = this.resizeBoxElement
        elmnt.onmouseleave = this.stopBoxResize
        elmnt.onmouseup = this.stopBoxResize

    }

    stopBoxResize = (event) => {
        event.currentTarget.removeEventListener("mousemove", this.onBoxResize)
    }

    resizeBoxElement = (event) => {

        event.currentTarget.addEventListener("mousemove", this.onBoxResize)
    }

    onBoxResize({ movementX, movementY }) {
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


    enableDragMode = () => {
        this.element.contentEditable = false
        this.element.style.userSelect = "none"
        this.dragElement(this.element)
    }

    disableDragMode = () => {
        this.disableDragElement(this.element)
        //this.element.contentEditable = true
        this.element.style.userSelect = "default"
    }


    disableDragElement = (elmnt) => {

        elmnt.onmousedown = undefined
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
}


class TextToolbar {

    constructor(element) {
        this.toolbarDiv = document.getElementById("toolbarDiv")
        this.registerElement(element)
        this.page = document.getElementById("page")
    }



    registerElement = (element) => {
        if (element.classList.contains("text")) {
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
        this.resizeButton.innerText = "Enable Resize"

        this.disableResizeButton = document.createElement("button")
        this.disableResizeButton.innerText = "Disable Resize"

        this.editTextBtn = document.createElement("button")
        this.editTextBtn.innerText = "Edit Text"

        this.disabelEditText = document.createElement("button")
        this.disabelEditText.innerText = "Disable Edit Text"

        this.toolbarDiv.appendChild(this.editTextBtn)
        this.toolbarDiv.appendChild(this.disabelEditText)
        this.toolbarDiv.appendChild(this.dragButton)
        this.toolbarDiv.appendChild(this.disableDragButton)
        this.toolbarDiv.appendChild(this.resizeButton)
        this.toolbarDiv.appendChild(this.disableResizeButton)



    }









}

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
}


class TextUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = new TextToolbar(element)

        this.functions = new TextFunctions(element)
    }

    selectElement = () => {
        this.element.style.border = "solid 1px red"

    }

    deselectElement = () => {
        this.element.style.border = "none"
        this.functions.handleDisableEditText()
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
