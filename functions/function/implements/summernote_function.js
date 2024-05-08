import './summernote.js'
import Function from '../function.js'

export default class SummernoteFunction extends Function{



    handleEditText = (element, deconstructToolbar, constructToolbar) => {
        console.log(element)
        console.log(element.firstChild)
        deconstructToolbar()

        element.classList.add("summernote")
        this.element = element
        this.deconstructToolbar = deconstructToolbar
        this.constructToolbar = constructToolbar

        $(document).ready(this.initTextEditor)

    }

    initTextEditor = () => {
        let top = this.element.style.top
        let left = this.element.style.left
        let width = this.element.style.width
        let height = this.element.style.height

        this.createSummernoteEditor(top, left, width, height)


        this.attachDisableEditButton()

        let parList = document.querySelector('.note-editable')

        this.preventSummernoteParagraphDeletion(parList)
        this.preventSummernotePasteWithFormatting(parList)
        this.preventSummernoteSelectAll(parList)
        this.moveSummernoteEditorToLayer(parList)

      

    }

    moveSummernoteEditorToLayer = (editorElement) => {
        editorElement.style.zIndex = this.element.getAttribute("layer")
    }


    createSummernoteEditor = (top, left ,width, height) => {
        $('.summernote').summernote({
            focus: true, airMode: true, popover: {
                air: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['insert', ['link']]
                ]
            },
            fontColor: '#000000',
            keyMap: {
                pc: {
                    'ENTER': ''
                },
                mac: {
                    'ENTER': ''
                }
            }
        });
        $('.note-editor').css({
            color: "black",
            position: "absolute",
            top: top,
            left: left,
            width: width,
            height: height
        })
    }

    attachDisableEditButton = () => {
        let disableEditBtn = $('<button class="disable-edit-button">Disable Edit</button>');

        // Add an event listener to the button


        $('.note-editor').append(disableEditBtn)

        $('.disable-edit-button').on("click", () => this.handleDisableEditText);
    }

    preventSummernoteParagraphDeletion = (parList) => {
        parList.addEventListener("keydown", () => {
            if (event.keyCode === 8 || event.keyCode === 46) {
                if (parList.querySelector(".main").querySelectorAll("p")[0].textContent == "") {
                    event.preventDefault();
                    console.log("no backspace on : " + parList.outerHTML)
                } else {
                    console.log("backspace on : " + parList.outerHTML)
                }
            } else {
                console.log("backspace not detected")
            }
        });
    }

    preventSummernoteSelectAll = (parList) => {
        parList.addEventListener('keydown', event => {
            if (event.ctrlKey && 'a'.indexOf(event.key) !== -1) {
                event.preventDefault()
            }
        })
    } 

    preventSummernotePasteWithFormatting = (parList) => {
        parList.addEventListener("paste", function (e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            var temp = document.createElement("div");
            temp.innerHTML = text;
            document.execCommand("insertHTML", false, temp.textContent);
        });

    }

   

    handleDisableEditText = () => {
        var markup = $('.summernote').summernote('code');

        //  this.element.innerHTML = markup

        $('.summernote').summernote('destroy');

        $('.summernote').removeClass('summernote')

        this.constructToolbar()

        this.element.style.height = (parseInt(element.querySelector(".textParagraph").style.height) + 50) + "px"


    }
}