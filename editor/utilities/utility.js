export default class Utility {
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