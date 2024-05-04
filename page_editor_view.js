import UtilityHelper from './utilities/utility_helper.js';
import BackendManager from './backend/backend_manager.js';
import PageSubmitTimer from './submit/page_submit_timer.js';


class View {
    constructor() {
        this.initializeViewElements();

        this.backendManager = new BackendManager()
        // Since select mode is enabled by default, ensure select functionalities are initialized
        this.controller = this.backendManager.controller
        this.cookie = this.backendManager.cookie
        this.utilityHelper = new UtilityHelper()
        this.page = document.getElementById("page")


        this.loadPageContent()


        this.pageSubmitTimer = new PageSubmitTimer(page)
        this.pageSubmitTimer.setSubmitTimer(10)

    }

    loadPageContent = () => {
        let page = this.page
        let select = this.utilityHelper.utilitySelectionModule.selectFunc
        let register = this.utilityHelper.utilityHandlerModule.registerAllHandlers
        let reset = this.utilityHelper.utilityHandlerModule.resetAllElementHandlers
        let enableDragAll = this.utilityHelper.utilityTranslationModule.enableDragAll
        let layerManager = this.utilityHelper.layerManagerModule 
        let loadPageImages = this.loadPageImages
        this.controller.getAccountPageContent(this.cookie.getCookie("memberId"), this.cookie.getCookie("pageId"))
            .then(response => response.text())
            .then(response => {
                let layer = layerManager.getCurrentSelectedLayer()
                page.innerHTML = response
           
                reset(select)

                enableDragAll(layer)
              
                register(select, layer)
           
                loadPageImages()
            
            })
    }

    loadPageImages = () => {
        this.controller.getPageUrlList(this.cookie.getCookie("pageId"))
            .then(response => response.text())
            .then(response => {
                console.log(response)
                let parsed = JSON.parse(response)
                parsed.forEach((obj, index) => {
                    // Access properties of each object
                    const filename = obj.filename;
                    const file = obj.file;
                    let imgList = document.querySelectorAll(".image-main")
                    for (let y = 0; y < imgList.length; y++) {

                        let imgId = imgList[y].getAttribute("id");
                        console.log("imgList[y] " + imgList[y])
                        console.log("imgList[y] " + imgId)
                        console.log("filename  " + filename)
                        if (imgId === filename) {
                            console.log("imgId === filename true")
                            const binaryString = atob(file);

                            // Create ArrayBuffer from binary string
                            const arrayBuffer = new ArrayBuffer(binaryString.length);
                            const uint8Array = new Uint8Array(arrayBuffer);
                            for (let i = 0; i < binaryString.length; i++) {
                                uint8Array[i] = binaryString.charCodeAt(i);
                            }
                            let url = URL.createObjectURL(new Blob([uint8Array], { type: "image/webp" }));

                            imgList[y].src = url
                        } else {
                            console.log("imgId === filename false")
                        }
                        
                    }
                    // You can perform further processing with the filename and data here
                    console.log(`Object ${index + 1}:`);
                    console.log(`Filename: ${filename}`);
                    console.log(`File: ${file}`);
                    console.log(''); // Just for spacing between objects
                });

            })
    }



    initializeViewElements() {

        this.page = document.getElementById("page");
        this.toolbarDiv = document.getElementById("toolbarDiv");


    }

    registerAllHandlersSelect = () => {
        const select = this.utilityHelper.utilitySelectionModule.selectFunc
        const register = this.utilityHelper.utilityHandlerModule.registerAllHandlers
        const layerManager = this.utilityHelper.layerManagerModule
        console.log("select " + select)
        console.log("register " + register)
        register(select, layerManager.getCurrentSelectedLayer())
    }


    createTextBtnHandler() {
        let layerManager = this.utilityHelper.layerManagerModule
        this.utilityHelper.utilityFactory.constructTextUtility(layerManager.getCurrentSelectedLayer())
        this.registerAllHandlersSelect()

    }

    createImageBtnHandler() {
        let layerManager = this.utilityHelper.layerManagerModule
        this.utilityHelper.utilityFactory.constructImageUtility(layerManager.getCurrentSelectedLayer())
        this.registerAllHandlersSelect()
    }

    hideLayer(layer) {
        let layerManager = this.utilityHelper.layerManagerModule
        layerManager.toggleHideLayer(layer)
    }

    selectLayer(layer) {
        let layerManager = this.utilityHelper.layerManagerModule
        layerManager.setSelectedLayer(layer)
        this.utilityHelper.utilityHandlerModule.resetAllElementHandlers()
        this.registerAllHandlersSelect()
        this.utilityHelper.utilityTranslationModule.enableDragAll(layer)
    }

 



}

const app = new View();