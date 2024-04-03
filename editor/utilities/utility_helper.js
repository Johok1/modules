import UtilityFactory from './utility_factory.js';

export default class UtilityHelper {
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
