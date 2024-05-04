import FunctionPrototype from './function_prototype.js'
export default class Function extends FunctionPrototype{

    constructor() {
        super()

    }

    enableDragMode = (element) => {
        element.contentEditable = false
        element.style.userSelect = "none"

        this.element = element

        this.dragElement(element)

    }

    disableDragMode = (element) => {

        this.disableDragElement(element)
        element.querySelector(".main").style.border = "2px red solid"
        //this.element.contentEditable = true
        element.style.userSelect = "default"
    }


    disableDragElement = (elmnt) => {
        
        elmnt.querySelector(".main").onmousedown = null
        
    }

    dragElement = (elmnt) => {


        elmnt.querySelector(".main").onmousedown = this.dragElementDown
        elmnt.querySelector(".main").onmouseleave = this.stopDrag
        elmnt.querySelector(".main").onmouseup = this.stopDrag

    }

    stopDrag = (event) => {
        this.element.querySelector(".main").style.border = "none"
        document.getElementById("page").classList.remove("dragging")
        event.currentTarget.removeEventListener("mousemove", this.drag)
        this.element.style.zIndex = document.getElementById("page").querySelectorAll(".utility").length + 1 + "";
    }

    dragElementDown = (event) => {
        let page = document.getElementById("page")
        page.classList.add("dragging")
        this.drag = this.onMouseDrag.bind(this.element)
       
        this.element.querySelector(".main").style.border = "2px red solid"
        let utilities = page.querySelectorAll(".utility")
        for (let y = 0; y < utilities.length; y++) {
            
        }
        this.element.style.zIndex = "999"
        event.currentTarget.addEventListener("mousemove", this.drag)
      

    }


    onMouseDrag({ movementX, movementY }) {
        let container = document.getElementById("page");
        let containerRect = container.getBoundingClientRect();
        let utilityList = container.querySelectorAll(".utility")

       
        
        let elementStyles = window.getComputedStyle(this);
        let elementLeft = parseFloat(elementStyles.left) || 0; // Use 0 if left is not defined
        let elementTop = parseFloat(elementStyles.top) || 0; // Use 0 if top is not defined
        let elementRect = this.querySelector(".main").getBoundingClientRect()

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
        const oldLeft = this.style.left
        const oldTop = this.style.top 
        // Update the element's position
        this.style.left = `${newLeft}px`;
        this.style.top = `${newTop}px`;

        let utilityCollision = false 
        let newRect = this.getBoundingClientRect()
        
        for (let x = 0; x < utilityList.length; x++) {
            if ((utilityList[x].getAttribute("layer") == this.getAttribute("layer")) && utilityList[x] != this) {
                let utilityRect = utilityList[x].getBoundingClientRect()
                let rect1 = newRect
                let rect2 = utilityRect
                console.log("same layer collision possible")
                if (!(rect2.x > rect1.x + rect1.width ||
                    rect2.x + rect2.width < rect1.x ||
                    rect2.y > rect1.y + rect1.height ||
                    rect2.y + rect2.height < rect1.y)) {
                    utilityCollision = true
                    console.log("isColliding") 
                }
            } else {
                console.log("no collisions on different layers")
            }
        }

        if (utilityCollision) {
            console.log("resetting old positions")
            this.style.left = oldLeft
            this.style.top = oldTop
        }
    }
}