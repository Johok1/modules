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

describe('TextFunctions - Editing functionalities', () => {
    let textFunctions;
    let mockElement;

    beforeEach(() => {
        // Setting up the mystical environment for our tests
        mockElement = document.createElement('div');
        document.body.appendChild(mockElement);
        textFunctions = new TextFunctions(mockElement);
    });

    afterEach(() => {
        // Cleansing our testing environment after each test
        document.body.removeChild(mockElement);
        $('.summernote').summernote('destroy');  // Ensuring Summernote is fully cleansed from our realm
    });

    it('handleEditText should enable summernote on the element', () => {
        // Activating the editing mode, which should add the 'summernote' class
        textFunctions.handleEditText();

        // We must wait for the Summernote to initialize, as it is bound to the document.ready event
        setTimeout(() => {
            // Verifying the mystical transformation
            expect($(mockElement).hasClass('summernote')).toBeTrue();
            // Additionally, we could check if the Summernote editor has been properly initiated
            expect($('.note-editor').length).toBeGreaterThan(0);
        }, 500);  // Adjust the time based on initialization time of Summernote in your realm
    });

    it('handleDisableEditText should disable summernote on the element', () => {
        // First, let's enable the edit mode to have something to disable
        textFunctions.handleEditText();

        // Disabling the editing mode, which should remove the 'summernote' class
        setTimeout(() => {  // We wait for the editor to initialize before we disable it
            textFunctions.handleDisableEditText();

            // Verifying the removal of the mystical enchantment
            expect($(mockElement).hasClass('summernote')).toBeFalse();
            // Ensure the Summernote editor itself is destroyed
            expect($('.note-editor').length).toBe(0);
        }, 500);  // Adjust this timeout as necessary
    });
});
