describe('TextFunctions', () => {
    let textFunctions;
    let mockElement;

    beforeEach(() => {
        mockElement = document.createElement('div');
        mockElement.id = "testElement";
        mockElement.style.top = "10px";
        mockElement.style.left = "10px";
        mockElement.style.width = "100px";
        mockElement.style.height = "100px";
        document.body.appendChild(mockElement);
        textFunctions = new TextFunctions(mockElement);
    });

    afterEach(() => {
        document.body.removeChild(mockElement);
    });

    it('constructor should assign the element', () => {
        expect(textFunctions.element).toBe(mockElement);
    });


    it('checkUndefinedNullEmpty should correctly identify values', () => {
        expect(textFunctions.checkUndefinedNullEmpty(undefined)).toBeTrue();
        expect(textFunctions.checkUndefinedNullEmpty(null)).toBeTrue();
        expect(textFunctions.checkUndefinedNullEmpty('')).toBeTrue();
        expect(textFunctions.checkUndefinedNullEmpty('content')).toBeFalse();
    });

    it('boxResize should allow element resizing initialization', () => {
        textFunctions.boxResize();
        expect(typeof mockElement.onmousedown).toBe('function');
    });

    it('boxDisableResize should disable resizing of the element', () => {
        textFunctions.boxDisableResize();
        expect(mockElement.onmousedown).toBeNull();
    });

    it('enableDragMode should make the element not editable and disable user selection', () => {
        textFunctions.enableDragMode();
        expect(mockElement.contentEditable).toBe('false');
        expect(mockElement.style.userSelect).toBe('none');
    });

   

});
describe('TextFunctions - Drag functionality', () => {
    let textFunctions;
    let mockElement;

    beforeEach(() => {
        // Setup mock element
        mockElement = document.createElement('div');
        mockElement.id = "testElement";
        document.body.appendChild(mockElement);
        textFunctions = new TextFunctions(mockElement);
    });

    afterEach(() => {
        document.body.removeChild(mockElement);
    });

    it('enableDragMode should allow element dragging initialization', () => {
        textFunctions.enableDragMode();
        // Checking if the onmousedown event handler is set to a function,
        // which indicates that the drag functionality has been initialized.
        expect(typeof mockElement.onmousedown).toBe('function');
    });

    it('disableDragMode should disable dragging of the element', () => {
        // First enable drag mode to ensure there's something to disable
        textFunctions.enableDragMode();
        // Now disable drag mode
        textFunctions.disableDragMode();
        // Verifying that disabling drag mode sets the onmousedown event handler back to null or undefined
        // Here, both null and undefined are considered as not having an event handler set.
        expect(mockElement.onmousedown).toBeNull();
    });
});