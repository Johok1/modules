describe('View Class Tests', () => {
    let view;
    let mockElement;

    beforeEach(() => {
        mockElement = document.createElement('div');
        spyOn(document, 'getElementById').and.callFake((id) => {
            return mockElement;
        });

        view = new View();
    });

    describe('initializeViewElements', () => {
        it('should initialize view elements correctly', () => {
            view.initializeViewElements();
            expect(view.selectBtn).toBe(mockElement);
            expect(view.toggleDragBtn).toBe(mockElement);
            expect(view.page).toBe(mockElement);
            expect(view.toolbarDiv).toBe(mockElement);
            expect(view.textBtn).toBe(mockElement);
            expect(view.imgBtn).toBe(mockElement);
            // Add checks for all initialized properties
        });
    });

    describe('initializeEventListeners', () => {
        beforeEach(() => {
            spyOn(mockElement, 'addEventListener');
            view.initializeViewElements();
        });

        it('should attach event listeners', () => {
            view.initializeEventListeners();
            expect(mockElement.addEventListener.calls.count()).toEqual(3); // Adjust based on actual event listeners
            // Add checks to ensure correct event listeners are added
        });
    });

    describe('createTextBtnHandler and createImageBtnHandler', () => {
        beforeEach(() => {
            spyOn(view.utilityFactory, 'constructTextUtility');
            spyOn(view.utilityFactory, 'constructImageUtility');
        });

        it('should construct text utility on text button click', () => {
            view.createTextBtnHandler();
            expect(view.utilityFactory.constructTextUtility).toHaveBeenCalled();
        });

        it('should construct image utility on image button click', () => {
            view.createImageBtnHandler();
            expect(view.utilityFactory.constructImageUtility).toHaveBeenCalled();
        });
    });

    describe('Selection Handling', () => {
        beforeEach(() => {
            spyOn(view.utilityHelper, 'enableAllSelect');
            spyOn(view.utilityHelper, 'disableAllSelect');
            spyOn(view.utilityHelper, 'toggleSelect');
            spyOn(view.utilityHelper, 'registerAllHandlers');
            spyOn(console, 'log'); // To prevent actual logging
        });

        it('should toggle select state', () => {
            view.toggleSelect();
            expect(view.select).toBeTruthy();
            view.toggleSelect();
            expect(view.select).toBeFalsy();
        });

        it('should handle select enablement and disablement', () => {
            view.handleSelectToggle();
            expect(view.utilityHelper.toggleSelect).toHaveBeenCalled();
            // Add checks for both enabled and disabled states
        });
    });

    // Add more tests as necessary for other methods and behaviors
});
