import './summernote.js'
import Function from '../function.js'

export default class SummernoteFunction extends Function{



    handleEditText = (element, deconstructToolbar, constructToolbar) => {
        console.log(element)
        console.log(element.firstChild)
        deconstructToolbar()
        element.classList.add("summernote")
        let top = element.style.top
        let left = element.style.left
        let width = element.style.width
        let height = element.style.height
        let handleDisableEditText = this.handleDisableEditText

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
                fontColor: '#000000'
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

        });
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