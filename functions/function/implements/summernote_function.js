import './summernote.js'
import Function from '../function.js'

export default class SummernoteFunction extends Function{



    handleEditText = (element, deconstructToolbar, constructToolbar) => {
        console.log(element)
        console.log(element.firstChild)
        deconstructToolbar()
        element.classList.add("summernote")
        this.element = element
        let top = element.style.top
        let left = element.style.left
        let width = element.style.width
        let height = element.style.height
        let handleDisableEditText = this.handleDisableEditText
        let removeSummernoteParagraph = this.removeSummernoteParagraph
        $(document).ready(function () {
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
            let disableEditBtn = $('<button class="disable-edit-button">Disable Edit</button>');

            // Add an event listener to the button
           

            $('.note-editor').append(disableEditBtn)

            $('.disable-edit-button').on("click", () => { handleDisableEditText(element, constructToolbar) });

            let parList = document.querySelector('.note-editable')
          
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

            parList.addEventListener('keydown', event => {
                if (event.ctrlKey && 'a'.indexOf(event.key) !== -1) {
                    event.preventDefault()
                }
            })

            parList.addEventListener("paste", function (e) {
                e.preventDefault();
                var text = e.clipboardData.getData("text/plain");
                var temp = document.createElement("div");
                temp.innerHTML = text;
                document.execCommand("insertHTML", false, temp.textContent);
            });
           
            

           //  $('.note-editable').off('keydown')
       
           
           /* 
            $('.note-editable').on("keyup", (e) => {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    console.log("enter check")
                    e.preventDefault()
                    console.log('Enter/Return key pressed');
                    removeSummernoteParagraph()   
                   
                    
                } })
             */   
        });

    }

    removeSummernoteParagraph = () => {
        let parList = document.querySelector('.note-editable').querySelectorAll("*")
        
       
        for (let x = 0; x < parList.length; x++) {
            if (parList[x].id != "par") {
                parList[x].remove()
            } else {
               
            }
        }

       
    }



    handleDisableEditText = (element, constructToolbar) => {
        var markup = $('.summernote').summernote('code');

        //  this.element.innerHTML = markup

        $('.summernote').summernote('destroy');

        $('.summernote').removeClass('summernote')

        constructToolbar()

        element.style.height = (parseInt(element.querySelector(".textParagraph").style.height) + 50) + "px"


    }
}