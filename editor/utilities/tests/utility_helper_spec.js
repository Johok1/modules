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
});

