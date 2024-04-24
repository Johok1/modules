import UtilityHandlerModule from './utility_modules/implements/utility_handler_module.js'
import UtilitySelectionModule from './utility_modules/implements/utility_selection_module.js'
import UtilityTranslationModule from './utility_modules/implements/utility_translation_module.js'
import EditorUtilityInterface from './interfaces/editor_utility_interface.js'
import UtilityFactory from '../utilities/utility_factory.js'


export default class UtilityHelper {
    constructor() {
        
        let editorUtilityInterface = new EditorUtilityInterface()

        this.utilityFactory = new UtilityFactory()
        this.utilityTranslationModule = new UtilityTranslationModule(editorUtilityInterface)
       

        this.utilityHandlerModule = new UtilityHandlerModule(editorUtilityInterface)
        this.utilitySelectionModule = new UtilitySelectionModule(editorUtilityInterface)
      
       
    }

  

    
}
