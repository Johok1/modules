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
        //this.element.contentEditable = true
        element.style.userSelect = "default"
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
        this.element.querySelector(".main").style.border = "none"
        document.getElementById("page").classList.remove("dragging")
        event.currentTarget.removeEventListener("mousemove", this.onMouseDrag)
    }

    dragElementDown = (event) => {
        this.element.querySelector(".main").style.border = "2px red solid"
        document.getElementById("page").classList.add("dragging")
        event.currentTarget.addEventListener("mousemove", this.onMouseDrag)

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
        let oldLeft = this.style.left
        let oldTop = this.style.top 
        // Update the element's position
        this.style.left = `${newLeft}px`;
        this.style.top = `${newTop}px`;

        let utilityCollision = false 
        let newRect = this.getBoundingClientRect()
        for (let x = 0; x < utilityList.length; x++) {
            if (utilityList[x].style.zIndex == this.style.zIndex) {
                let utilityRect = utilityList[x].getBoundingClientRect()
                let rect1 = newRect
                let rect2 = utilityRect
                console.log("same layer collision possible")
                if (!(rect2.getX() > rect1.getX() + rect1.getWidth() ||
                    rect.getX() + rect2.getWidth() < rect1.getX() ||
                    rect.getY() > rect1.getY() + rect1.getHeight() ||
                    rect2.getY() + rect2.getHeight < rect1.getY())) {
                    utilityCollision = true
                    console.log("isColliding") 
                }
            } else {
                console.log("no collisions on different layers")
            }
        }

        if (utilityCollision) {
            this.style.left = `${oldLeft}px`;
            this.style.top = `${oldTop}px`;
        }
    }
}