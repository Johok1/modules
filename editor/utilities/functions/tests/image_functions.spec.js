describe('ImageFunctions', () => {
    let imageFunctions;
    let mockElement;
    let mockToolbar;
    let file;
    let fileUrl = 'mocked_blob_url';

    beforeEach(() => {
        mockElement = document.createElement('img');
        file = new Blob(['test'], { type: 'image/png' });
        mockToolbar = {
            fileInput: {
                files: {
                    item: () => file
                }
            },
            img: document.createElement('img')
        };
        document.body.appendChild(mockElement);
        imageFunctions = new ImageFunctions(mockElement, mockToolbar);

        spyOn(URL, 'createObjectURL').and.returnValue(fileUrl);
    });

    afterEach(() => {
        document.body.removeChild(mockElement);
    });

    it('should handle file input submission by setting element src', () => {
        imageFunctions.handleFileInputSubmit();
        expect(imageFunctions.element.src).toContain(fileUrl); // Using toContain for partial match due to potential blob URL specifics
        expect(imageFunctions.element.style.backgroundColor).toBe("transparent");
    });

    it('should handle file input by setting toolbar img src', () => {
        imageFunctions.handleFileInput();
        expect(mockToolbar.img.src).toContain(fileUrl);
    });

    it('enableDragMode should setup drag functionalities', () => {
        imageFunctions.enableDragMode();
        expect(mockElement.onmousedown).toBeTruthy(); // Verifying the function is assigned
    });

    it('disableDragMode should remove drag functionalities', () => {
        imageFunctions.enableDragMode(); // Setup drag first
        imageFunctions.disableDragMode();
        expect(mockElement.onmousedown).toBeNull(); // Expecting it to be cleared
    });

    it('enableImageResize should setup resize functionalities', () => {
        imageFunctions.enableImageResize();
        expect(mockElement.onmousedown).toBeTruthy(); // Verifying the function is assigned
    });

    it('disableImageResize should remove resize functionalities', () => {
        imageFunctions.enableImageResize(); // Setup resize first
        imageFunctions.disableImageResize();
        expect(mockElement.onmousedown).toBeNull(); // Expecting it to be cleared
    });
});

describe('ImageFunctions - file drop handling', () => {
    let imageFunctions;
    let mockElement;
    let mockToolbar;
    let file;
    let fileUrl = 'mocked_blob_url';

    beforeEach(() => {
        mockElement = document.createElement('img');
        document.body.appendChild(mockElement);
        file = new Blob(['test'], { type: 'image/png' });
        mockToolbar = {
            fileInput: {
                files: {
                    item: () => file
                }
            },
            img: document.createElement('img')
        };
        imageFunctions = new ImageFunctions(mockElement, mockToolbar);
        spyOn(URL, 'createObjectURL').and.returnValue(fileUrl);

        // Assuming enableFileDrop method exists and is responsible for setting up the drop event listener
        imageFunctions.enableFileDrop();
    });

    afterEach(() => {
        document.body.removeChild(mockElement);
    });

    it('should update element src on file drop', () => {
        // Create a basic DragEvent without the dataTransfer property
        const dropEvent = new DragEvent('drop', {
            bubbles: true
        });

        // Manually define the dataTransfer property with the necessary details
        Object.defineProperty(dropEvent, 'dataTransfer', {
            value: {
                files: [file]
            },
        });

        // Dispatch the event with the now properly mocked dataTransfer property
        mockElement.dispatchEvent(dropEvent);

        // Proceed with your assertions as before
        expect(imageFunctions.element.src).toContain(fileUrl);
    });

});

