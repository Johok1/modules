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

      

        this.resizeButton = document.createElement("button")
        this.resizeButton.innerText = "Resize"
        this.resizeButton.classList.add("text-popup")

        this.resizeButton.style.position = "absolute"
        this.resizeButton.style.top = (parseInt(this.element.querySelector(".textParagraph").style.height) / 2 +17) +  "px"
        this.resizeButton.style.right = "0px"

 
        this.editTextBtn = document.createElement("button")
        this.editTextBtn.innerText = "Edit"
        this.editTextBtn.classList.add("text-popup")
        this.editTextBtn.style.position = "absolute"
        this.editTextBtn.style.top = "35px"
        this.editTextBtn.style.left = "0px"

        this.cancelSelectionBtn = document.createElement("button")
        this.cancelSelectionBtn.innerText = "Exit"
        this.cancelSelectionBtn.classList.add("text-popup")
        this.cancelSelectionBtn.style.position = "absolute"
        this.cancelSelectionBtn.style.bottom = (parseInt(this.element.style.height) -
            parseInt(this.element.querySelector(".textParagraph").style.height) + 35) + "px"
        this.cancelSelectionBtn.style.left = "0px"


        this.element.appendChild(this.cancelSelectionBtn)
        this.element.appendChild(this.editTextBtn)
        this.element.appendChild(this.resizeButton)
   
      
        
      



    }

   


    deconstructToolbar = () => {
        $('.text-popup').remove()
    }









}


class TextFunctions {

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

        this.element.style.height = (parseInt(this.element.querySelector(".textParagraph").style.height) + 50) + "px"
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
        //this.style.height = `${newHeight}px`;
    }

    boxResizeLeft = (resizeButton) => {
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



class UtilityHelper {
    constructor() {
        this.selectedEl = undefined;
        this.toolbarDiv = document.getElementById("toolbarDiv");
        this.select = false;
        this.utilityFactory = new UtilityFactory(); // Initialize once to avoid repeated instantiations
    }

    toggleSelect = () => {
        this.select = true
    }

    // Combining the enable/disable functions for better DRY compliance
    toggleSelectability = (selector, enable) => {
        document.querySelectorAll(selector).forEach(element => {
            const utility = this.utilityFactory.getUtility(element);
            if (enable) {

            } else {
                utility.deselectElement();
            }
        });
    }

    enableAllSelect = () => {
        // If there's functionality for enabling, add here

    }

    disableAllSelect = () => {
        this.toggleSelectability(".image", false);
        this.toggleSelectability(".text", false);
        this.disableAllDrag();
    }

    disableAllDrag = () => {
        document.querySelectorAll(".drag").forEach(this.disableDragElement);
    }

    disableDragElement = (element) => {
        element.classList.remove("drag")

    }

    registerAllHandlers = () => {
        this.registerElementHandlers(".image", this.registerImageHandlers);
        this.registerElementHandlers(".text", this.registerTextHandlers);
    }

    registerElementHandlers = (selector, handlerFunction) => {
        document.querySelectorAll(selector).forEach(element => {
            handlerFunction.call(this, element); // using call() to maintain 'this' context
        });
    }

    registerImageHandlers = (imgElement) => {
        if (imgElement.getAttribute('data-dblclick-attached') !== 'true') {
        const imageUtility = this.utilityFactory.getUtility(imgElement);

        // Attach the dblclick event listener
        imgElement.addEventListener("dblclick", () => this.selectHandler(imageUtility));

        // Set a custom attribute to indicate that the event listener has been attached
        imgElement.setAttribute('data-dblclick-attached', 'true');
    }
    }

    registerTextHandlers = (textElement) => {
      
           
        // Check if the dblclick handler has not already been attached
        if (!textElement.hasAttribute('data-dblclick-attached')) {
            const textUtility = this.utilityFactory.getUtility(textElement);
            this.registerCompHandlers(textUtility, textElement.querySelectorAll(".style"));
            textElement.addEventListener("dblclick", () => this.selectHandler(textUtility));
            textElement.setAttribute('data-dblclick-attached', 'true'); // Mark it as attached
        }
        

    }

    registerCompHandlers = (textUtility, compList) => {
        compList.forEach(comp => textUtility.attachCompClickHandler(comp));
    }

    selectHandler = (utilityElement) => {
        console.log(this.select)
        console.log(this.selectedEl)
        console.log(utilityElement.element)


        if (this.selectedEl && !(this.selectedEl === utilityElement)) {
            console.log("select case 1")
            this.selectedEl.deselectElement();
            this.selectedEl.enableDrag()
            this.toolbarDiv.innerHTML = ""; // Clear once when changing
            this.selectedEl.deconstructToolbar()
            utilityElement.constructToolbar()
            utilityElement.selectElement()
            this.selectedEl = utilityElement
            this.selectedEl.functions.disableDragMode()
            this.select = true
        }

        else if (!this.selectedEl && !(this.selectedEl === utilityElement)) {
           // Assuming necessary for debugging
            console.log("select case 2")
            utilityElement.constructToolbar();
            utilityElement.selectElement();
            this.selectedEl = utilityElement;
            this.selectedEl.functions.disableDragMode()
            this.select = true
        }

        else if (this.select && (this.selectedEl === utilityElement)) {
            console.log("select case 3")
            if ((document.querySelectorAll(".text-popup").length <= 0) && (document.querySelectorAll(".image-popup").length <= 0)) {
                utilityElement.constructToolbar();
                utilityElement.selectElement();
                this.selectedEl = utilityElement;
                this.selectedEl.functions.disableDragMode()
                this.select = true
            }
            /*
            utilityElement.constructToolbar();
            utilityElement.selectElement();
            this.selectedEl = utilityElement;
            this.selectedEl.functions.disableDragMode()
            this.select = true
            */

        }
    }
}




class UtilityFactory {

    // Method to create and return a new HTML element with applied styles and properties
    createElement(tagName, properties = {}, styles = {}) {
        const element = document.createElement(tagName);
        Object.assign(element, properties);
        Object.assign(element.style, styles);
        return element;
    }

    // Method to construct the text utility
    constructTextUtility = () => {
        const page = document.getElementById("page");
        const font = this.createElement('font', { innerText: 'New Text' }, { color: 'black' });
        const label = this.createElement('p', { draggable: false, className: 'textParagraph' }, {});
        label.appendChild(font);
   

        const labelDivStyles = {
            width: '300px',  overflowY: 'auto',
            position: 'absolute', wordWrap: 'break-word', zIndex: '1'
        };
        const labelDiv = this.createElement('div', { className: 'text drag' }, labelDivStyles);
        labelDiv.appendChild(label);
        labelDiv.style.padding = "35px"
        page.appendChild(labelDiv);
        let utility = this.getUtility(labelDiv)
        utility.enableDrag()
    }

    // Method to construct the image utility
    constructImageUtility = () => {
        const page = document.getElementById("page");
        const imgStyles = {padding: "30px" };
        let img = this.createElement('img');
        img.style.backgroundColor = "grey"
        img.style.width = "75px"
        img.style.height = "75px"
        img.draggable = false
        img.classList.add("image-main")
        img.style.userSelect = "none"
        let input = document.createElement("input")
        input.classList.add("image-input")
        input.type = "file"
        input.accept = "image/jpeg, image/png, image/jpg"
        input.classList.add("hidden")
        img.appendChild(input)
        let div = this.createElement('div', { className: 'image drag', draggable: false }, imgStyles)
        div.style.width = "150px"
        div.style.height = "150px"
        div.appendChild(img)
        page.appendChild(div);
        let utility = this.getUtility(div)
        utility.enableDrag()
    }

    // Method to get the utility based on the element type
    getUtility = (element) => {
        if (element.classList.contains("text")) {
            return new TextUtility(element);
        } else if (element.classList.contains("image")) {
            return new ImageUtility(element);
        } else {
            console.log("Invalid element");
            return null; // It's better to return null for invalid cases for consistency
        }
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





class TextUtility extends Utility {
    constructor(element) {
        super(element)
        this.toolbar = new TextToolbar(element)

        this.functions = new TextFunctions(element, this.deconstructToolbar, this.constructToolbar)
    }

    selectElement = () => {
        this.element.querySelector(".textParagraph").style.border = "solid 1px red"
        this.functions.disableDragMode()
 
    }

    deselectElement = () => {
        this.element.querySelector(".textParagraph").style.border = "none"
        this.functions.handleDisableEditText()
        this.enableDrag()
        this.deconstructToolbar()
     
    }

    deconstructToolbar = () => {
        this.toolbar.deconstructToolbar()
    }

    constructToolbar = () => {
        this.toolbar.constructToolbar()
        this.initBoxResizeBtn()
        this.initEditTextBtn()
        this.initCancelSelectionBtn()
      
    }

    

    enableDrag = () => {
        this.functions.enableDragMode()
    }

    initCancelSelectionBtn = () => {
        this.toolbar.cancelSelectionBtn.addEventListener("click", this.deselectElement)
    }

    initBoxResizeBtn = () => {
        let onBoxResize = this.functions.onBoxResize
        let element = this.element
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

   

   

    initEditTextBtn = () => {
        this.toolbar.editTextBtn.addEventListener("click", this.functions.handleEditText)
    }


}
