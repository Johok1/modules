describe('UtilityFactory', () => {
    let utilityFactory;

    beforeEach(() => {
        // Setup a mock "page" element since these methods depend on its existence
        const mockPage = document.createElement('div');
        mockPage.id = 'page';
        document.body.appendChild(mockPage);

        utilityFactory = new UtilityFactory();
    });

    afterEach(() => {
        // Clean up the mock "page" element after each test
        document.body.removeChild(document.getElementById('page'));
    });

    it('createElement should create an element with properties and styles', () => {
        const properties = { id: 'testElement', innerText: 'Hello World' };
        const styles = { color: 'red', fontSize: '20px' };
        const element = utilityFactory.createElement('div', properties, styles);

        expect(element.tagName).toBe('DIV');
        expect(element.id).toBe(properties.id);
        expect(element.innerText).toBe(properties.innerText);
        expect(element.style.color).toBe(styles.color);
        expect(element.style.fontSize).toBe(styles.fontSize);
    });

    it('constructTextUtility should append a text element to the page', () => {
        utilityFactory.constructTextUtility();
        const page = document.getElementById('page');
        expect(page.children.length).toBeGreaterThan(0);
        const textDiv = page.querySelector('.text');
        expect(textDiv).not.toBeNull();
        expect(textDiv.classList.contains('drag')).toBeTrue();
    });

    it('constructImageUtility should append an image element to the page', () => {
        utilityFactory.constructImageUtility();
        const page = document.getElementById('page');
        expect(page.children.length).toBeGreaterThan(0);
        const img = page.querySelector('.image');
        expect(img).not.toBeNull();
        expect(img.classList.contains('drag')).toBeTrue();
    });

    // This test assumes the existence of TextUtility and ImageUtility classes
    it('getUtility should return the correct utility object based on the element class', () => {
        const textElement = utilityFactory.createElement('div', { className: 'text' }, {});
        const imageElement = utilityFactory.createElement('div', { className: 'image' }, {});
        document.getElementById('page').appendChild(textElement);
        document.getElementById('page').appendChild(imageElement);

        const textUtility = utilityFactory.getUtility(textElement);
        const imageUtility = utilityFactory.getUtility(imageElement);

        expect(textUtility instanceof TextUtility).toBeTrue();
        expect(imageUtility instanceof ImageUtility).toBeTrue();
    });

    it('getUtility should return null for invalid elements', () => {
        const invalidElement = utilityFactory.createElement('div', {}, {});
        document.getElementById('page').appendChild(invalidElement);
        const utility = utilityFactory.getUtility(invalidElement);
        expect(utility).toBeNull();
    });
});
describe('UtilityFactory', () => {
    let utilityFactory;

    beforeEach(() => {
        const mockPage = document.createElement('div');
        mockPage.id = 'page';
        document.body.appendChild(mockPage);

        utilityFactory = new UtilityFactory();
    });

    afterEach(() => {
        document.body.removeChild(document.getElementById('page'));
    });

    const checkDragEventListeners = (element) => {
        const hasMousedown = typeof element.onmousedown === 'function';
        const hasMouseleave = typeof element.onmouseleave === 'function';
        const hasMouseup = typeof element.onmouseup === 'function';

        return hasMousedown && hasMouseleave && hasMouseup;
    };

    it('constructTextUtility should create a text utility with drag functionality enabled by default', () => {
        utilityFactory.constructTextUtility();
        const page = document.getElementById('page');
        const textUtilityElement = page.querySelector('.text.drag');

        expect(textUtilityElement).not.toBeNull();
        expect(textUtilityElement.classList.contains('drag')).toBeTrue();
        expect(checkDragEventListeners(textUtilityElement)).toBeTrue();
    });

    it('constructImageUtility should create an image utility with drag functionality enabled by default', () => {
        utilityFactory.constructImageUtility();
        const page = document.getElementById('page');
        const imageUtilityElement = page.querySelector('.image.drag');

        expect(imageUtilityElement).not.toBeNull();
        expect(imageUtilityElement.classList.contains('drag')).toBeTrue();
        expect(checkDragEventListeners(imageUtilityElement)).toBeTrue();
    });
});


