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
        const label = this.createElement('p', { draggable: false, className: 'comp' }, {});
        label.appendChild(font);

        const labelDivStyles = {
            width: '300px', height: '200px', overflowY: 'auto',
            position: 'absolute', wordWrap: 'break-word', zIndex: '1'
        };
        const labelDiv = this.createElement('div', { className: 'text drag' }, labelDivStyles);
        labelDiv.appendChild(label);
        page.appendChild(labelDiv);
        let utility = this.getUtility(labelDiv)
        utility.enableDrag()
    }

    // Method to construct the image utility
    constructImageUtility = () => {
        const page = document.getElementById("page");
        const imgStyles = { backgroundColor: 'grey', zIndex: '1' };
        const img = this.createElement('img', { className: 'image drag', draggable: false }, imgStyles);
        page.appendChild(img);
        let utility = this.getUtility(img)
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
