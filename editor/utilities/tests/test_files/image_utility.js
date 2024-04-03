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
class ImageFunctions {
    constructor(element,img, toolbar) {
        this.element = element
        this.toolbar = toolbar
        this.img = img 
    }

    enableFileDrop = () => {

    }

    handleFileInputSubmit = () => {
        this.img.src = URL.createObjectURL(this.toolbar.fileInput.files.item(0))
        this.img.style.backgroundColor = "transparent"
    }


    attachFileInputHandler = () => {

        let image = this.element.querySelector(".image-main")


        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        // Prevent default drag behaviors
        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            image.addEventListener(eventName, preventDefaults, false)
            document.body.addEventListener(eventName, preventDefaults, false)
        })

        this.element.querySelector(".image-main").addEventListener("drop", this.handleFileInput, false)
    }

    removeFileInputHandler = () => {
        this.element.querySelector(".image-main").removeEventListener("drop", this.handleFileInput)
    }

    handleFileInput = (e) => {
        this.element.querySelector(".image-main").style.backgroundColor = "transparent"
        let file = e.dataTransfer.files.item(0)
        this.processFile(file)
            .then(result => {
                console.log("process file result " + result)
                this.element.querySelector(".image-main").src = result
            })
      
       
    }

    processFile = (file) => {
    if (!file) {
        return;
    }
    console.log(file);


    // Load the data into an image
    return new Promise(function (resolve, reject) {
        let rawImage = new Image();

        rawImage.addEventListener("load", function () {
            resolve(rawImage);
        });

        rawImage.src = URL.createObjectURL(file);
    })
        .then(function (rawImage) {
            // Convert image to webp ObjectURL via a canvas blob
            return new Promise(function (resolve, reject) {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");

                canvas.width = rawImage.width;
                canvas.height = rawImage.height;
                ctx.drawImage(rawImage, 0, 0);

                canvas.toBlob(function (blob) {
                    resolve(URL.createObjectURL(blob));
                }, "image/webp");
            });
        })
        .then(function (imageURL) {
            // Load image for display on the page
            return new Promise(function (resolve, reject) {
                let scaledImg = new Image();

                scaledImg.addEventListener("load", function () {
                    resolve({ imageURL, scaledImg });
                });

                scaledImg.setAttribute("src", imageURL);
            });
        })
        .then(function (data) {

             return data.imageURL
            
        });
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
        this.dragImageElement(this.img)
        this.dragImageElement(this.element)
    }

    disableImageResize = () => {
        this.img.onmousedown = undefined
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
        this.style.height = `${newWidth}px`;

        let imageWidth = parseFloat(this.querySelector(".image-main").style.width) || 0; // Use 0 if width is not defined
        let imageHeight = parseFloat(this.querySelector(".image-main").style.height) || 0; // Use 0 if height is not defined

        let newImageWidth = imageWidth + movementX
        let newImageHeight = imageHeight + movementY

        this.querySelector(".image-main").style.width = newImageWidth + "px"
        this.querySelector(".image-main").style.height = newImageWidth + "px"
    }
}
