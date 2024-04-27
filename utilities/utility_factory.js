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
        const label = this.createElement('p', { draggable: false, className: 'textParagraph main' }, {});
        label.appendChild(font);
   

        const labelDivStyles = {
            width: '300px',  overflowY: 'auto',
            position: 'absolute', wordWrap: 'break-word', zIndex: '1'
        };
        const labelDiv = this.createElement('div', { className: 'text drag' }, labelDivStyles);
        labelDiv.appendChild(label);
        labelDiv.style.height = "235px"
        labelDiv.style.width = "335px"
        page.appendChild(labelDiv);
        let utility = this.getUtility(labelDiv)
        utility.enableDrag()
    }

    // Method to construct the image utility
    constructImageUtility = () => {
        const page = document.getElementById("page");
        const imgStyles = { };
        let img = this.createElement('img');
        img.style.backgroundColor = "transparent"
        img.style.width = "75px"
        img.style.height = "75px"
        img.draggable = false
        img.classList.add("image-main")
        img.classList.add("main")
        img.style.userSelect = "none"
        let input = document.createElement("input")
        input.classList.add("image-input")
        input.type = "file"
        input.accept = "image/jpeg, image/png, image/jpg"
        input.classList.add("hidden")
        img.appendChild(input)
        let div = this.createElement('div', { className: 'image drag', draggable: false }, imgStyles)
        div.style.width = "150px"
        div.style.height = "150px"
        
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
