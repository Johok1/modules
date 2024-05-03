import Toolbar from './toolbar.js'
export default class ImageToolbar extends Toolbar{
  

    registerElement = (element) => {
        if (element.classList.contains("image")) {
            this.element = element
        } else {
            console.error("element type not suitable for toolbar")
        }
    }
    constructToolbar = () => {
      

        let page = document.getElementById("page")
        this.resizeButton = document.createElement("button")
        this.resizeButton.innerText = "Resize Image"
        this.resizeButton.classList.add("image-popup")
        this.resizeButton.classList.add("resize-popup")
        this.resizeButton.style.position = "absolute"
       

        this.cancelSelectionBtn = document.createElement("button")
        this.cancelSelectionBtn.innerText = "Exit"
        this.cancelSelectionBtn.classList.add("image-popup")
        this.cancelSelectionBtn.style.position = "absolute"

        page.appendChild(this.resizeButton)
        page.appendChild(this.cancelSelectionBtn)

        this.updateToolbarPosition()


    }

    updateToolbarPosition = () => {


        this.positionExitBtn(this.element, this.cancelSelectionBtn)
        this.positionResizeElement(this.element, this.resizeButton)
    }

    positionResizeElement = (element1, element2) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.getBoundingClientRect();
        var top = rect.top + rect.height

        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = (rect.left - 100 + rect.width) + 'px';
        element2.style.top = (top - (rect.height / 2)) + 'px';
    }


   
    positionExitBtn = (element1, element2) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.getBoundingClientRect();
        var top = rect.top + rect.height

        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = (rect.left - 200) + 'px';
        element2.style.top = (top - 10) + 'px';
    }

    deconstructToolbar = () => {
        $('.image-popup').remove()
    }



}