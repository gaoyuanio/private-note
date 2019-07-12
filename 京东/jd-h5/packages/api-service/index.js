import tokenService from './services/token.service';
import skuImageService from './services/sku-image.service';
import addressService from './services/address.service';
import availableNumberService from './services/available-number-comp.service';
import batgetService from './services/batget.service';
import freightService from './services/order-freight.service';
import skuDetailService from './services/sku-detail.service';
import wareReturnService from './services/ware-return.service';
import categoriesService from './services/categories.service';

angular.module('JDApiService', [])
    .factory(skuImageService.name, skuImageService.service)
    .factory(tokenService.name, tokenService.service)
    .factory(addressService.name, addressService.service)
    .factory(availableNumberService.name, availableNumberService.service)
    .factory(batgetService.name, batgetService.service)
    .factory(freightService.name, freightService.service)
    .factory(skuDetailService.name, skuDetailService.service)
    .factory(wareReturnService.name, wareReturnService.service)
    .factory(categoriesService.name, categoriesService.service);
