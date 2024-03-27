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

   

    // Add more tests as necessary for other methods and behaviors
});

describe('Utility Creation and Event Handling', () => {
    let view;
    let mockTextElement, mockImageElement;

    beforeEach(() => {
        // Mock elements
        mockTextElement = document.createElement('div');
        mockImageElement = document.createElement('div');
        mockTextElement.className = 'text';
        mockImageElement.className = 'image';
        const mockSelectBtn = document.createElement('button');

        // Spies and stubs
        spyOn(document, 'getElementById').and.callFake((id) => {
            if (id === 'textBtn') return mockTextElement;
            if (id === 'imgBtn') return mockImageElement;
            if (id === 'toggleSelectBtn') return mockSelectBtn;
            // Add more cases as needed
        });
        spyOn(document, 'querySelectorAll').and.callFake((selector) => {
            if (selector === '.text') return [mockTextElement];
            if (selector === '.image') return [mockImageElement];
            // Add more cases as needed
            return [];
        });

        // Initialize View and its elements
        view = new View();
    });

    describe('when utilities are created', () => {
        beforeEach(() => {
            // Mocking the utility creation process to avoid side effects
            spyOn(view.utilityFactory, 'constructTextUtility').and.callFake(() => {
                // Simulate the creation of a text utility, possibly appending a mock element to the DOM or similar
                let mockTextElement = document.createElement('div');
                mockTextElement.className = 'text';
                document.body.appendChild(mockTextElement);
                // Simulating the registration of handlers as it would happen in the actual method
                view.utilityHelper.registerElementHandlers('.text', view.utilityHelper.registerTextHandlers);
            });
            spyOn(view.utilityFactory, 'constructImageUtility').and.callFake(() => {
                let mockImageElement = document.createElement('img');
                mockImageElement.className = 'image';
                document.body.appendChild(mockImageElement);
                view.utilityHelper.registerElementHandlers('.image', view.utilityHelper.registerImageHandlers);
            });

            spyOn(view.utilityHelper, 'registerElementHandlers').and.callThrough();
            view.initializeEventListeners();
        });

        it('should apply selection handlers to text utilities', () => {
            view.textBtn.click(); // Simulate text button click to create text utility
            expect(view.utilityHelper.registerElementHandlers).toHaveBeenCalledWith('.text', jasmine.any(Function));

        });

        it('should apply selection handlers to image utilities', () => {
            view.imgBtn.click(); // Simulate image button click to create image utility
            expect(view.utilityHelper.registerElementHandlers).toHaveBeenCalledWith('.image', jasmine.any(Function));
        });

        afterEach(() => {
            // Clean up any mock elements added to the DOM
            document.body.querySelectorAll('.text, .image').forEach(el => el.remove());
        });
    });


    // Add more tests as necessary
});
