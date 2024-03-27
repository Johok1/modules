import './summernote.js'

export default class TextFunctions {

    constructor(element,func,func2) {
        this.element = element
        this.deconstructToolbar = func
        this.constructToolbar = func2
    }

    handleEditText = () => {
        console.log(this.element)
        console.log(this.element.firstChild)
        this.deconstructToolbar()
        this.element.classList.add("summernote")
        let top = this.element.style.top
        let left = this.element.style.left
        let width = this.element.style.width
        let height = this.element.style.height
        let handleDisableEditText = this.handleDisableEditText
        
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
            let disableEditBtn = $('<button class="disable-edit-button">Disable Edit</button>');

            // Add an event listener to the button
           

            $('.note-editor').append(disableEditBtn)

            $('.disable-edit-button').on("click", handleDisableEditText);
            
        });
    }

    handleDisableEditText = () => {
        var markup = $('.summernote').summernote('code');

        //  this.element.innerHTML = markup

        $('.summernote').summernote('destroy');

        $('.summernote').removeClass('summernote')

        this.constructToolbar()
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


     boxResize = (resizeButton) => {
        // Initiate resizing - attach mousemove to document
        resizeButton.onmousedown = (event) => {
            document.addEventListener("mousemove", this.onBoxResize);
            event.preventDefault(); // Prevent default drag behavior
        };

        // End resizing - remove mousemove from document
        document.onmouseup = () => {
            document.removeEventListener("mousemove", this.onBoxResize);
        };
    }

    boxDisableResize = (resizeButton) => {
        // Just in case you want to explicitly remove the ability to resize
        resizeButton.onmousedown = undefined;
        document.onmouseup = undefined;
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
}