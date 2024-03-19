import UtilityFactory from './utilities/utility_factory.js'
import UtilityHelper from './utilities/utility_helper.js'

class View {
    constructor() {
        this.initializeViewElements();
        this.initializeEventListeners();
        this.select = false;
        this.drag = false;
    }

    initializeViewElements() {
        this.selectBtn = document.getElementById("toggleSelectBtn");
        this.toggleDragBtn = document.getElementById("toggleDragBtn");
        this.page = document.getElementById("page");
        this.toolbarDiv = document.getElementById("toolbarDiv");
        this.textBtn = document.getElementById("textBtn");
        this.imgBtn = document.getElementById("imgBtn");
        this.utilityHelper = new UtilityHelper();
        this.utilityFactory = new UtilityFactory();
    }

    initializeEventListeners() {
        this.imgBtn.addEventListener("click", () => this.createImageBtnHandler());
        this.textBtn.addEventListener("click", () => this.createTextBtnHandler());
        this.selectBtn.addEventListener('click', () => this.handleSelectToggle());
        // Initialize other event listeners as needed
    }

    createTextBtnHandler() {
        this.utilityFactory.constructTextUtility();
    }

    createImageBtnHandler() {
        this.utilityFactory.constructImageUtility();
    }

    handleSelectToggle() {
        this.toggleSelect(); // Toggle the select state
        this.isSelect() ? this.handleSelectEnabled() : this.handleSelectDisabled();
    }

    handleSelectEnabled() {
        this.utilityHelper.enableAllSelect();
        console.log("Selected state enabled");
        this.utilityHelper.registerAllHandlers(); // Attach the select handlers to elements
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
        this.utilityHelper.toggleSelect();
    }

    isDrag() {
        return this.drag;
    }

    isSelect() {
        return this.select;
    }

}

const app = new View()