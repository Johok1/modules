import UtilityHandlerModule from './utility_modules/implements/utility_handler_module.js'
import UtilitySelectionModule from './utility_modules/implements/utility_selection_module.js'
import UtilityTranslationModule from './utility_modules/implements/utility_translation_module.js'

import UtilityFactory from '../utilities/utility_factory.js'


export default class UtilityHelper {
    constructor() {


        this.utilityFactory = new UtilityFactory()
        this.utilityTranslationModule = new UtilityTranslationModule()
       

        this.utilityHandlerModule = new UtilityHandlerModule()
        this.utilitySelectionModule = new UtilitySelectionModule()
      
       
    }

  

    
}
