export default class ImageToolbar {
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