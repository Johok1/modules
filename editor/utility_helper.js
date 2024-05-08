import UtilityHandlerModule from './utility_modules/implements/utility_handler_module.js'
import UtilitySelectionModule from './utility_modules/implements/utility_selection_module.js'
import UtilityTranslationModule from './utility_modules/implements/utility_translation_module.js'

import UtilityFactory from '../utilities/utility_factory.js'
import LayerManagerModule from './utility_modules/implements/layer_manager_module.js'


export default class UtilityHelper {
    constructor() {

        this.layerManagerModule = new LayerManagerModule()
        this.utilityFactory = new UtilityFactory()
        this.utilityTranslationModule = new UtilityLayerTranslationModule()
       

        this.utilityHandlerModule = new UtilityLayerHandlerModule()
        this.utilitySelectionModule = new UtilitySelectionModule()
      
       
    }

  

    
}
