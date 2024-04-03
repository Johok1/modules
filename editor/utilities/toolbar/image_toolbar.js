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
      


        this.resizeButton = document.createElement("button")
        this.resizeButton.innerText = "Resize Image"
        this.resizeButton.classList.add("image-popup")
        this.resizeButton.style.position = "absolute"
        this.resizeButton.style.bottom = "30px"
        this.resizeButton.style.right = "10px"


        this.fileInput = document.createElement("input")
        this.fileInput.type = "file"
        this.fileInput.innerText = "Input Image"
        this.fileInput.style.cursor = "pointer"
        this.fileInput.classList.add("image-popup")

        this.img = document.createElement("img")
        this.img.style.width = "25px"
        this.img.style.height = "25px"
        this.img.style.backgroundColor = "grey"
        this.img.classList.add("image-popup")

        this.fileInputSubmit = document.createElement("button")
        this.fileInputSubmit.innerText = "Submit Image"
        this.fileInputSubmit.classList.add("image-popup")

        this.div = document.createElement("div")
        this.div.classList.add("image-popup")
        
        this.div.appendChild(this.fileInput)
        this.div.appendChild(this.img)

        this.cancelSelectionBtn = document.createElement("button")
        this.cancelSelectionBtn.innerText = "Exit"
        this.cancelSelectionBtn.classList.add("image-popup")
        this.cancelSelectionBtn.style.position = "absolute"
        this.cancelSelectionBtn.style.bottom = "0px"
        this.cancelSelectionBtn.style.left = "0px"


        this.element.appendChild(this.cancelSelectionBtn)
      
        this.element.appendChild(this.resizeButton)

      //  this.element.appendChild(this.fileInputSubmit)
      //  this.element.appendChild(this.div)


    }

    deconstructToolbar = () => {
        $('.image-popup').remove()
    }



}