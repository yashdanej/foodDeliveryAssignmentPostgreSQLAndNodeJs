const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router
    // Organization
    .get('/', controller.getOrganization)
    .post('/', controller.addOrganization)
    
    // Items
    .get('/items', controller.getItems)
    .post('/item', controller.addItem)

    // Pricing
    .get('/pricings', controller.getPricings)
    .post('/pricing', controller.getTotalPricing)

module.exports = router;