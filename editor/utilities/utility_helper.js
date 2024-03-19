import UtilityFactory from './utility_factory.js';

export default class UtilityHelper {
    constructor() {
        this.selectedEl = undefined;
        this.toolbarDiv = document.getElementById("toolbarDiv");
        this.select = false;
        this.utilityFactory = new UtilityFactory(); // Initialize once to avoid repeated instantiations
    }

    toggleSelect = () => {
        this.select = !this.select;
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
        const imageUtility = this.utilityFactory.getUtility(imgElement);
        imgElement.addEventListener("click", () => this.selectHandler(imageUtility));
    }

    registerTextHandlers = (textElement) => {
        const textUtility = this.utilityFactory.getUtility(textElement);
        console.log(textElement); // Consider whether this log is needed; if for debugging, it's okay.
        this.registerCompHandlers(textUtility, textElement.querySelectorAll(".style"));
        textElement.addEventListener("click", () => this.selectHandler(textUtility));
    }

    registerCompHandlers = (textUtility, compList) => {
        compList.forEach(comp => textUtility.attachCompClickHandler(comp));
    }

    selectHandler = (utilityElement) => {
        if (!this.select) return; // Early return to reduce nesting

        if (this.selectedEl && this.selectedEl !== utilityElement) {
            this.selectedEl.deselectElement();
            this.selectedEl.enableDrag()
            this.toolbarDiv.innerHTML = ""; // Clear once when changing
        }

        if (!this.selectedEl || this.selectedEl !== utilityElement) {
            console.log(utilityElement.element); // Assuming necessary for debugging
            
            utilityElement.constructToolbar();
            utilityElement.selectElement();
            this.selectedEl = utilityElement;
            this.selectedEl.functions.disableDragMode()
        }
    }
}
