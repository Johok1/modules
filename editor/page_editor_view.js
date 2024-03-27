import UtilityFactory from './utilities/utility_factory.js';
import UtilityHelper from './utilities/utility_helper.js';

class View {
    constructor() {
        this.initializeViewElements();
        this.initializeEventListeners();
        this.select = true; // Enabled by default
        this.drag = false;

        // Since select mode is enabled by default, ensure select functionalities are initialized
        this.handleSelectEnabled();
    }

    initializeViewElements =()=> {
        this.selectBtn = document.getElementById("toggleSelectBtn");
        this.toggleDragBtn = document.getElementById("toggleDragBtn");
        this.page = document.getElementById("page");
        this.toolbarDiv = document.getElementById("toolbarDiv");
        this.textBtn = document.getElementById("textBtn");
        this.imgBtn = document.getElementById("imgBtn");
        this.utilityHelper = new UtilityHelper();
        this.utilityFactory = new UtilityFactory();
      //  this.utilityHelper.select = true 
    }
    initializeViewElementsTestNoDOM = () => {
        this.selectBtn = document.createElement("div")
        this.toggleDragBtn = document.createElement("div")
        this.page = document.createElement("div")
        this.toolbarDiv = document.createElement("div")
        this.textBtn = document.createElement("div")
        this.imgBtn = document.createElement("div")
        this.utilityHelper = new UtilityHelper();
        this.utilityFactory = new UtilityFactory();
       // this.utilityHelper.select = true
    }

    initializeEventListeners = () => {
        this.imgBtn.addEventListener("click", () => this.createImageBtnHandler());
        this.textBtn.addEventListener("click", () => this.createTextBtnHandler());
        this.selectBtn.addEventListener('click', () => this.handleSelectToggle());
        // Initialize other event listeners as needed
    }

    createTextBtnHandler() {
        this.utilityFactory.constructTextUtility();
       
            this.utilityHelper.registerAllHandlers();
        
    }

    createImageBtnHandler() {
        this.utilityFactory.constructImageUtility();
       
            this.utilityHelper.registerAllHandlers();
        
    }

    handleSelectToggle() {
        this.toggleSelect(); // Toggle the select state
        this.isSelect() ? this.handleSelectEnabled() : this.handleSelectDisabled();
    }

    handleSelectEnabled() {
        this.utilityHelper.enableAllSelect();
        console.log("Selected state enabled");
        this.utilityHelper.registerAllHandlers(); // Ensure the select handlers are attached to all utilities
    }

    handleSelectDisabled() {
        this.utilityHelper.disableAllSelect();
        this.clearToolbar();
        console.log("Selected state disabled");
    }

    clearToolbar() {
        this.toolbarDiv.innerHTML = ""; // Clear the toolbar content
    }

    toggleSelect() {
        this.select = !this.select;
        // It might not be necessary to toggle select in utilityHelper here, since we are controlling select mode at the view level
        // However, if utilityHelper's select state is referenced elsewhere or for consistency, it can be toggled.
      //  this.utilityHelper.toggleSelect();
    }

    isDrag() {
        return this.drag;
    }

    isSelect() {
        return this.select;
    }
}

const app = new View();
