describe('ImageUtility', () => {
    let imageUtility;
    let mockElement, mockToolbar;

    beforeEach(() => {
        // Conjuring the elements and tools needed for the spell
        mockElement = document.createElement('div');
        document.body.appendChild(mockElement);

        // Mocking the ImageToolbar and ImageFunctions, assuming they are ancient spells well-tested in their own rites
        mockToolbar = {
            constructToolbar: jasmine.createSpy('constructToolbar'),
            fileInputSubmit: document.createElement('button'),
            fileInput: document.createElement('input'),
            dragButton: document.createElement('button'),
            disableDragButton: document.createElement('button'),
            resizeButton: document.createElement('button'),
            disableResizeButton: document.createElement('button')
        };

        // Enchanting our ImageUtility with the forged elements
        imageUtility = new ImageUtility(mockElement);
        imageUtility.toolbar = mockToolbar; // Binding our mock toolbar directly to the conjured utility

        // Assuming ImageFunctions is enchanted properly, mock it if necessary
    });

    afterEach(() => {
        // Cleansing the realm after each incantation
        document.body.removeChild(mockElement);
    });

    describe('Element Selection and Deselection', () => {
        beforeEach(() => {
            // Ensnaring the methods to observe their mystical engagements
            spyOn(imageUtility.functions, 'disableDragMode');
            spyOn(imageUtility.functions, 'enableDragMode');
        });

        it('selectElement should disable drag mode', () => {
            imageUtility.selectElement();
            expect(imageUtility.functions.disableDragMode).toHaveBeenCalled();
        });

        it('deselectElement should enable drag mode', () => {
            imageUtility.deselectElement();
            expect(imageUtility.functions.enableDragMode).toHaveBeenCalled();
        });
    });

    describe('Toolbar Construction and Event Attachment', () => {
        beforeEach(() => {
            // Binding our sorcerous observers to detect the invocation of functions
            spyOn(imageUtility, 'attachFileInputHandler');
            spyOn(imageUtility, 'attachFileInputSubmitHandler');
            spyOn(imageUtility, 'initEnableImageDrag');
            spyOn(imageUtility, 'initDisableImageDrag');
            spyOn(imageUtility, 'initEnableImageResize');
            spyOn(imageUtility, 'initDisableImageResize');
        });

        it('constructToolbar should initialize all toolbar functionalities', () => {
            imageUtility.constructToolbar();

            expect(mockToolbar.constructToolbar).toHaveBeenCalled();
            expect(imageUtility.attachFileInputHandler).toHaveBeenCalledWith(imageUtility.functions.handleFileInput);
            expect(imageUtility.attachFileInputSubmitHandler).toHaveBeenCalled();
            expect(imageUtility.initEnableImageDrag).toHaveBeenCalled();
            expect(imageUtility.initDisableImageDrag).toHaveBeenCalled();
            expect(imageUtility.initEnableImageResize).toHaveBeenCalled();
            expect(imageUtility.initDisableImageResize).toHaveBeenCalled();
        });
    });

    // Here one may continue conjuring further tests for file input handlers, image drag, and resize functionalities
    // Ensure the tapestry of tests covers all enchantments provided by the ImageUtility class

});
