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