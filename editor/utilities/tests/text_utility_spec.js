describe('TextUtility', () => {
    let textUtility;
    let mockElement;

    beforeEach(() => {
        // Conjuring up the testing environment
        mockElement = document.createElement('div');
        document.body.appendChild(mockElement); // Securely anchoring our test element in the mortal realm

        // Crafting our magical instruments, assuming auxiliary utilities are already enchanted
        mockToolbar = {
            resizeButton: document.createElement('button'),
            disableResizeButton: document.createElement('button'),
            editTextBtn: document.createElement('button'),
            disableEditTextBtn: document.createElement('button'),
            dragButton: document.createElement('button'),
            disableDragButton: document.createElement('button'),
            constructToolbar: jasmine.createSpy('constructToolbar')
        };

        // Summoning the TextUtility with our mock element
        textUtility = new TextUtility(mockElement, mockToolbar);
    });

    afterEach(() => {
        // Purifying our testing grounds post-examination
        document.body.removeChild(mockElement);
    });

    describe('Element Selection', () => {
        it('selectElement should add a red border to the element, indicating selection', () => {
            // Employing the arcane method to select an element
            textUtility.selectElement();

            // Deciphering the runes - should the border manifest as foretold?
            expect(mockElement.style.border).toBe('1px solid red', 'The selected element should have a 1px solid red border.');
        });

        it('deselectElement should remove the red border from the element, indicating deselection', () => {
            // Initially marking the element as selected
            textUtility.selectElement();
            // Now, reversing the spell to test the element's liberation
            textUtility.deselectElement();

            // The border should vanish, as if by magic
            expect(mockElement.style.border).not.toBe('1px solid red', 'The deselected element should not retain the 1px solid red border.');
        });
    });

    // Craft additional tests for other enchantments and methods, such as initBoxResizeBtn, initDisableEditTextBtn, etc.
    // Each spell (test) should clearly articulate its purpose and expected outcome.

    // Remember to continue the pattern of verbose and precise descriptions for the rest of the tests.
});
