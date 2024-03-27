import ImageUtility from './image_utility.js';
import TextUtility from './text_utility_v2.js';

export default class UtilityFactory {

    // Method to create and return a new HTML element with applied styles and properties
    createElement(tagName, properties = {}, styles = {}) {
        const element = document.createElement(tagName);
        Object.assign(element, properties);
        Object.assign(element.style, styles);
        return element;
    }

    // Method to construct the text utility
    constructTextUtility = () => {
        const page = document.getElementById("page");
        const font = this.createElement('font', { innerText: 'New Text' }, { color: 'black' });
        const label = this.createElement('p', { draggable: false, className: 'textParagraph' }, {});
        label.appendChild(font);

        const labelDivStyles = {
            width: '300px', height: '200px', overflowY: 'auto',
            position: 'absolute', wordWrap: 'break-word', zIndex: '1'
        };
        const labelDiv = this.createElement('div', { className: 'text drag' }, labelDivStyles);
        labelDiv.appendChild(label);
        labelDiv.style.padding = "35px"
        page.appendChild(labelDiv);
        let utility = this.getUtility(labelDiv)
        utility.enableDrag()
    }

    // Method to construct the image utility
    constructImageUtility = () => {
        const page = document.getElementById("page");
        const imgStyles = {padding: "30px" };
        let img = this.createElement('img');
        img.style.backgroundColor = "grey"
        img.style.width = "25px"
        img.style.height = "25px"
        img.draggable = false
        img.style.userSelect = "none"
        let div = this.createElement('div', { className: 'image drag', draggable: false }, imgStyles)
        div.style.width = "250px"
        div.style.height = "250px"
        div.appendChild(img)
        page.appendChild(div);
        let utility = this.getUtility(div)
        utility.enableDrag()
    }

    // Method to get the utility based on the element type
    getUtility = (element) => {
        if (element.classList.contains("text")) {
            return new TextUtility(element);
        } else if (element.classList.contains("image")) {
            return new ImageUtility(element);
        } else {
            console.log("Invalid element");
            return null; // It's better to return null for invalid cases for consistency
        }
    }
}
