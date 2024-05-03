import Toolbar from './toolbar.js'
export default class TextToolbar extends Toolbar{


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
        this.resizeButton.classList.add("resize-popup")

        this.resizeButton.style.position = "absolute"
       // this.resizeButton.style.top = (parseInt(this.element.querySelector(".textParagraph").style.height) / 2 +17) +  "px"
        //this.resizeButton.style.right = "0px"

 
        this.editTextBtn = document.createElement("button")
        this.editTextBtn.innerText = "Edit"
        this.editTextBtn.classList.add("text-popup")
        this.editTextBtn.style.position = "absolute"
       
     //   this.editTextBtn.style.left = "0px"

        this.cancelSelectionBtn = document.createElement("button")
        this.cancelSelectionBtn.innerText = "Exit"
        this.cancelSelectionBtn.classList.add("text-popup")
        this.cancelSelectionBtn.style.position = "absolute"
      //  this.cancelSelectionBtn.style.marginTop = "40px"
        
     //   this.cancelSelectionBtn.style.left = "0px"

        let page = document.getElementById("page")
        page.appendChild(this.editTextBtn)
        page.appendChild(this.cancelSelectionBtn)
        page.appendChild(this.resizeButton)


        this.positionEditBtn(this.element, this.editTextBtn)
        this.positionExitBtn(this.element, this.cancelSelectionBtn)
        this.positionResizeElement(this.element, this.resizeButton)
   
      
        
      



    }

    updateToolbarPosition = () => {

        this.positionEditBtn(this.element, this.editTextBtn)
        this.positionExitBtn(this.element, this.cancelSelectionBtn)
        this.positionResizeElement(this.element, this.resizeButton)
    }

    positionEditBtn = (element1, element2) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.getBoundingClientRect();
        var top = rect.top + rect.height

        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = (rect.left-200) + 'px';
        element2.style.top = (top - 10) + 'px';
    }

    positionExitBtn = (element1, element2, spacing) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.getBoundingClientRect();
        var top = rect.top + rect.height 

        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = (rect.left - 200) + 'px';
        element2.style.top = (top - 45) + 'px';
    }

    positionResizeElement = (element1, element2) => {
        // Get computed styles of the first element
        var styles = window.getComputedStyle(element1);

        // Get dimensions and position of the first element
        var rect = element1.getBoundingClientRect();
        var top = rect.top + rect.height 

        // Set position of the second element
        element2.style.position = 'absolute';
        element2.style.left = (rect.left-100+rect.width) + 'px';
        element2.style.top = (top -(rect.height/2)) + 'px';
    }


    deconstructToolbar = () => {
        $('.text-popup').remove()
    }









}