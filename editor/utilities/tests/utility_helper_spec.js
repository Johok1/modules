describe('UtilityHelper', () => {
    let utilityHelper;
    let mockPage, mockToolbarDiv;

    beforeEach(() => {
        // Create and append mock elements individually instead of overwriting innerHTML of the body
        mockPage = document.createElement('div');
        mockPage.id = 'page';
        document.body.appendChild(mockPage);

        mockToolbarDiv = document.createElement('div');
        mockToolbarDiv.id = 'toolbarDiv';
        document.body.appendChild(mockToolbarDiv);

        utilityHelper = new UtilityHelper();
    });

    afterEach(() => {
        // Remove the mock elements individually to avoid affecting other elements
        document.body.removeChild(mockPage);
        document.body.removeChild(mockToolbarDiv);
    });

    it('toggleSelect should toggle the select state', () => {
        expect(utilityHelper.select).toBeFalse();
        utilityHelper.toggleSelect();
        expect(utilityHelper.select).toBeTrue();
        utilityHelper.toggleSelect();
        expect(utilityHelper.select).toBeFalse();
    });

    it('disableAllDrag should remove drag functionalities from all elements with class .drag', () => {
        const mockDragElement = document.createElement('div');
        mockDragElement.classList.add('drag');
        mockPage.appendChild(mockDragElement); // Append to mockPage instead of document directly

        utilityHelper.disableAllDrag();
        expect(mockDragElement.classList.contains("drag")).toBeFalse();
    });

    it('registerElementHandlers should attach handlers based on selector', () => {
        const mockElement = document.createElement('div');
        mockElement.classList.add('image');
        mockPage.appendChild(mockElement); // Append to mockPage instead of document directly

        spyOn(mockElement, 'addEventListener');
        utilityHelper.registerElementHandlers('.image', utilityHelper.registerImageHandlers);

        expect(mockElement.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
    });

    it('should correctly toggle selectability for a given selector', () => {
        const mockElementText = document.createElement('div');
        mockElementText.classList.add('text');
        mockPage.appendChild(mockElementText); // Append to mockPage instead of document directly

        const deselectElementSpy = jasmine.createSpy('deselectElement');
        spyOn(utilityHelper.utilityFactory, 'getUtility').and.returnValue({ deselectElement: deselectElementSpy });

        utilityHelper.disableAllSelect();
        expect(deselectElementSpy).toHaveBeenCalled();
    });

   
});

describe('UtilityHelper', () => {
    let utilityHelper;
    let mockPage, mockToolbarDiv;

    beforeEach(() => {
        mockPage = document.createElement('div');
        mockPage.id = 'page';
        document.body.appendChild(mockPage);

        mockToolbarDiv = document.createElement('div');
        mockToolbarDiv.id = 'toolbarDiv';
        document.body.appendChild(mockToolbarDiv);

        utilityHelper = new UtilityHelper();
    });

    afterEach(() => {
        document.body.removeChild(mockPage);
        document.body.removeChild(mockToolbarDiv);
    });

    it('should disable drag mode when an text utility is selected', () => {
        const mockElement = utilityHelper.utilityFactory.createElement('div', { className: 'text' }, {});
        mockPage.appendChild(mockElement);
        utilityHelper.utilityFactory.constructTextUtility(); // Construct and append text utility

        const textUtility = utilityHelper.utilityFactory.getUtility(mockElement);

        // Enable drag mode initially
        textUtility.functions.enableDragMode();
        expect(mockElement.onmousedown).not.toBeNull(); // Drag should be enabled initially

        // Simulate selecting the element, which should disable drag mode
        textUtility.selectElement();
        expect(mockElement.onmousedown).toBeNull(); // Drag should be disabled upon selection
        console.log(mockElement.onmousedown)
        console.log(mockElement)
    });

    it('should re-enable drag mode when an text utility is deselected', () => {
        const mockElement = utilityHelper.utilityFactory.createElement('div', { className: 'text' }, {});
        mockPage.appendChild(mockElement);
        utilityHelper.utilityFactory.constructTextUtility(); // Construct and append text utility

        const textUtility = utilityHelper.utilityFactory.getUtility(mockElement);

        // Simulate selecting the element
        textUtility.functions.enableDragMode(); // Enable drag mode first
        textUtility.selectElement(); // Then select the element which should disable drag mode
        expect(mockElement.onmousedown).toBeNull(); // Confirm drag mode is disabled

        // Now, simulate deselecting the element
        textUtility.deselectElement();
        expect(mockElement.onmousedown).toBeTruthy(); // Confirm drag mode is re-enabled
    });
});

describe('UtilityHelper', () => {
    let utilityHelper;
    let mockPage, mockToolbarDiv;

    beforeEach(() => {
        mockPage = document.createElement('div');
        mockPage.id = 'page';
        document.body.appendChild(mockPage);

        mockToolbarDiv = document.createElement('div');
        mockToolbarDiv.id = 'toolbarDiv';
        document.body.appendChild(mockToolbarDiv);

        utilityHelper = new UtilityHelper();
    });

    afterEach(() => {
        document.body.removeChild(mockPage);
        document.body.removeChild(mockToolbarDiv);
    });

    it('should disable drag mode when an image element is selected', () => {
        const mockElement = utilityHelper.utilityFactory.createElement('div', { className: 'image' }, {});
        mockPage.appendChild(mockElement);
        utilityHelper.utilityFactory.constructImageUtility(); // Construct and append image utility

        const imageUtility = utilityHelper.utilityFactory.getUtility(mockElement);

        // Enable drag mode initially
        imageUtility.functions.enableDragMode();
        expect(mockElement.onmousedown).not.toBeNull(); // Drag should be enabled initially

        // Simulate selecting the image element, which should disable drag mode
        imageUtility.selectElement();
        expect(mockElement.onmousedown).toBeNull(); // Drag should be disabled upon selection
    });

    it('should re-enable drag mode when an image element is deselected', () => {
        const mockElement = utilityHelper.utilityFactory.createElement('div', { className: 'image' }, {});
        mockPage.appendChild(mockElement);
        utilityHelper.utilityFactory.constructImageUtility(); // Construct and append image utility

        const imageUtility = utilityHelper.utilityFactory.getUtility(mockElement);

        // Simulate selecting the image element
        imageUtility.functions.enableDragMode(); // Enable drag mode first
        imageUtility.selectElement(); // Then select the element which should disable drag mode
        expect(mockElement.onmousedown).toBeNull(); // Confirm drag mode is disabled

        // Now, simulate deselecting the image element
        imageUtility.deselectElement();
        expect(mockElement.onmousedown).toBeTruthy(); // Confirm drag mode is re-enabled
    });

    describe('registerAllHandlers method', () => {
        it('should register element handlers for .image and .text selectors', () => {
            spyOn(utilityHelper, 'registerElementHandlers');

            utilityHelper.registerAllHandlers();
            expect(utilityHelper.registerElementHandlers).toHaveBeenCalledWith('.image', utilityHelper.registerImageHandlers);
            expect(utilityHelper.registerElementHandlers).toHaveBeenCalledWith('.text', utilityHelper.registerTextHandlers);
        });
    });

});



describe('UtilityHelper - selectHandler method', () => {
    let utilityHelper;
    let mockElement, utilityElementMock, anotherUtilityElementMock;

    beforeEach(() => {
        // Conjuring the elements and their arcane utilities
        mockElement = document.createElement('div');
        document.body.appendChild(mockElement);

        // Mocking utility elements for our sorcery
        utilityElementMock = {
            element: mockElement,
            selectElement: jasmine.createSpy('selectElement'),
            deselectElement: jasmine.createSpy('deselectElement'),
            constructToolbar: jasmine.createSpy('constructToolbar'),
            enableDrag: jasmine.createSpy('enableDrag'),
            functions: {
                disableDragMode: jasmine.createSpy('disableDragMode')
            }
        };

        anotherUtilityElementMock = {
            element: document.createElement('div'),
            selectElement: jasmine.createSpy('selectElement'),
            deselectElement: jasmine.createSpy('deselectElement'),
            constructToolbar: jasmine.createSpy('constructToolbar'),
            enableDrag: jasmine.createSpy('enableDrag'),
            functions: {
                disableDragMode: jasmine.createSpy('disableDragMode')
            }
        };
        // Create the toolbarDiv element before instantiating UtilityHelper
        const toolbarDiv = document.createElement('div');
        toolbarDiv.id = 'toolbarDiv';
        document.body.appendChild(toolbarDiv);
        // Summoning the UtilityHelper
        utilityHelper = new UtilityHelper();
    });

  

    afterEach(() => {
        // Cleansing the realm after our testing rituals
        document.body.removeChild(mockElement);
    });

    it('should not perform selection actions if select mode is disabled', () => {
        utilityHelper.select = false; // Ensuring select mode is off
        utilityHelper.selectHandler(utilityElementMock);

        expect(utilityElementMock.selectElement).not.toHaveBeenCalled();
    });

    it('should select and deselect elements appropriately', () => {
        utilityHelper.select = true; // Ensuring select mode is on

        // Simulating the selection of a utility element
        utilityHelper.selectHandler(utilityElementMock);
        expect(utilityElementMock.selectElement).toHaveBeenCalled();
        expect(utilityElementMock.constructToolbar).toHaveBeenCalled();
        expect(utilityHelper.selectedEl).toBe(utilityElementMock);

        // Now, simulating the selection of another utility element
        utilityHelper.selectHandler(anotherUtilityElementMock);
        expect(utilityElementMock.deselectElement).toHaveBeenCalled(); // Previous element should be deselected
        expect(anotherUtilityElementMock.selectElement).toHaveBeenCalled(); // New element should be selected
        expect(anotherUtilityElementMock.constructToolbar).toHaveBeenCalled();
        expect(utilityHelper.selectedEl).toBe(anotherUtilityElementMock);
    });

    it('should disable drag mode on the newly selected element', () => {
        utilityHelper.select = true; // Ensuring select mode is on

        // Simulating the selection of a utility element
        utilityHelper.selectHandler(utilityElementMock);
        expect(utilityElementMock.functions.disableDragMode).toHaveBeenCalled();
    });

    it('should not clear toolbar or deselect if the same element is selected again', () => {
        utilityHelper.select = true; // Ensuring select mode is on

        // Simulating the selection of the same utility element twice
        utilityHelper.selectHandler(utilityElementMock);
        expect(utilityElementMock.selectElement).toHaveBeenCalledTimes(1);

        // Reset the toolbar HTML to test if it remains unchanged
        utilityHelper.toolbarDiv.innerHTML = 'Magic Wand';
        utilityHelper.selectHandler(utilityElementMock);

        // Since the same element is selected again, these methods should not be called again
        expect(utilityElementMock.deselectElement).not.toHaveBeenCalled();
        expect(utilityHelper.toolbarDiv.innerHTML).toBe('Magic Wand', 'Toolbar should remain unchanged');
        expect(utilityElementMock.selectElement).toHaveBeenCalledTimes(1, 'selectElement should not be called again');
    });

    // Add additional cases as necessary for thorough examination of the arcane
});
describe('UtilityHelper - dblclick event handling', () => {
    let utilityHelper;
    let mockElement, textUtilityMock, imageUtilityMock;

    beforeEach(() => {
        // Setup the environment similar to previous tests
        mockElement = document.createElement('div');
        document.body.appendChild(mockElement);

        utilityHelper = new UtilityHelper();

        // Creating mock utilities
        textUtilityMock = {
            element: mockElement,
            selectElement: jasmine.createSpy('selectElement'),
        };
        imageUtilityMock = {
            element: mockElement,
            selectElement: jasmine.createSpy('selectElement'),
        };

        spyOn(utilityHelper.utilityFactory, 'getUtility').and.callFake((element) => {
            if (element.classList.contains('text')) {
                return textUtilityMock;
            } else if (element.classList.contains('image')) {
                return imageUtilityMock;
            }
        });

        // Assuming select mode is always enabled for these tests
        utilityHelper.select = true;
    });

    afterEach(() => {
        document.body.removeChild(mockElement);
    });

    it('should trigger selectElement for text utility on dblclick', () => {
        const mockTextElement = utilityHelper.utilityFactory.createElement('div', { className: 'text' }, {});
        mockElement.appendChild(mockTextElement);
        utilityHelper.registerTextHandlers(mockTextElement);

        mockTextElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        expect(textUtilityMock.selectElement).toHaveBeenCalled();
    });

    it('should trigger selectElement for image utility on dblclick', () => {
        const mockImageElement = utilityHelper.utilityFactory.createElement('div', { className: 'image' }, {});
        mockElement.appendChild(mockImageElement);
        utilityHelper.registerImageHandlers(mockImageElement);

        mockImageElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        expect(imageUtilityMock.selectElement).toHaveBeenCalled();
    });
});
