

export default class TextToolbar {

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