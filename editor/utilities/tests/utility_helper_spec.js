describe('UtilityHelper Integration Tests', () => {
    let utilityHelper;
    let mockTextElement, mockImageElement, mockToolbarDiv;

    beforeEach(() => {
        // Mock DOM elements that would be accessed by document.getElementById
        mockToolbarDiv = document.createElement('div');
        spyOn(document, 'getElementById').and.callFake((id) => {
            if (id === 'toolbarDiv') return mockToolbarDiv;
            return null; // For other ids, you can return null or other mocked elements as necessary
        });

        // Setup for each test
        utilityHelper = new UtilityHelper();

        mockTextElement = document.createElement('div');
        mockImageElement = document.createElement('div');
        mockTextElement.classList.add('text');
        mockImageElement.classList.add('image');

        document.body.appendChild(mockTextElement);
        document.body.appendChild(mockImageElement);

        // Bind handlers - assumed to be part of UtilityHelper's functionality
        utilityHelper.registerAllHandlers();
    });

    afterEach(() => {
        // Cleanup after each test
        document.body.removeChild(mockTextElement);
        document.body.removeChild(mockImageElement);
    });

    describe('select and deselect functionality', () => {
        it('should allow a text element to be selected and deselected upon double clicking', () => {
            expect(utilityHelper.selectedEl).toBeUndefined();

            // Simulate double click to select the text element
            mockTextElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            expect(utilityHelper.selectedEl).not.toBeUndefined();
            expect(utilityHelper.selectedEl.element).toBe(mockTextElement);

            // Simulate another double click to deselect the text element
            mockTextElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            expect(utilityHelper.selectedEl).toBeUndefined();
        });

        it('should allow an image element to be selected and deselected upon double clicking', () => {
            expect(utilityHelper.selectedEl).toBeUndefined();

            // Simulate double click to select the image element
            mockImageElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            expect(utilityHelper.selectedEl).not.toBeUndefined();
            expect(utilityHelper.selectedEl.element).toBe(mockImageElement);

            // Simulate another double click to deselect the image element
            mockImageElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            expect(utilityHelper.selectedEl).toBeUndefined();
        });
    });
});


describe('UtilityHelper Integration Tests', () => {
    let utilityHelper;
    let mockTextElementOne, mockTextElementTwo, mockToolbarDiv,mockPage;

    beforeEach(() => {
        // Mock DOM elements that would be accessed by document.getElementById
        mockToolbarDiv = document.createElement('div');
        mockPage = document.createElement("div")
        spyOn(document, 'getElementById').and.callFake((id) => {
            if (id === 'toolbarDiv') return mockToolbarDiv;
            else if(id == 'page') return mockPage
            return null; // For other ids, you can return null or other mocked elements as necessary
        });

        // Setup for each test
        utilityHelper = new UtilityHelper();

       

        // Bind handlers - assumed to be part of UtilityHelper's functionality
        utilityHelper.registerAllHandlers();
    });

    afterEach(() => {
        // Cleanup after each test
        document.body.removeChild(mockTextElementOne);
        document.body.removeChild(mockTextElementTwo);
    });

    describe('switching selection between text utilities', () => {
        it('should switch selection from one text element to another and then deselect the second one', () => {
            // Initially, no element should be selected
            expect(utilityHelper.selectedEl).toBeUndefined();

            // Simulate double click to select the first text element
            mockTextElementOne.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            expect(utilityHelper.selectedEl).not.toBeUndefined();
            expect(utilityHelper.selectedEl.element).toBe(mockTextElementOne);

            // Simulate double click to select the second text element
            mockTextElementTwo.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            expect(utilityHelper.selectedEl).not.toBeUndefined();
            expect(utilityHelper.selectedEl.element).toBe(mockTextElementTwo);

            console.log("Selected El: " + utilityHelper.selectedEl)
            
            // Simulate another double click to deselect the second text element
            mockTextElementTwo.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            console.log("Selected El: " + utilityHelper.selectedEl)
            expect(utilityHelper.selectedEl).toBeUndefined();
            console.log(utilityHelper)
            expect(utilityHelper.select).toBeFalse()

          
        });
    });
});

