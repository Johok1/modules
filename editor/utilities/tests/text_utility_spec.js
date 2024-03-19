describe('TextUtility', () => {
    let textUtility;
    let mockElement, mockToolbar;

    beforeEach(() => {
        // Create mock elements for the test
        mockElement = document.createElement('div');
        document.body.appendChild(mockElement); // Append to body directly since we're controlling it individually

        // Assuming TextToolbar and TextFunctions are already tested elsewhere or mocked
        mockToolbar = {
            resizeButton: document.createElement('button'),
            disableResizeButton: document.createElement('button'),
            editTextBtn: document.createElement('button'),
            disabelEditText: document.createElement('button'),
            dragButton: document.createElement('button'),
            disableDragButton: document.createElement('button'),
            constructToolbar: jasmine.createSpy('constructToolbar')
        };

      

        textUtility = new TextUtility(mockElement);
    });

    afterEach(() => {
        // Clean up by removing the mock element from the body
        document.body.removeChild(mockElement);
    });

    it('should select and deselect element correctly', () => {
        textUtility.selectElement();
        expect(mockElement.style.border).toBe('1px solid red');

        textUtility.deselectElement();
        expect(mockElement.style.border).not.toBe('1px solid red')
      
    });

    // Further tests for other methods like initBoxResizeBtn, initDisableEditTextBtn, etc.
    // Similar pattern to the toolbar construction test, verifying the correct function is attached to the correct event
});
