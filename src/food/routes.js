const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router
    // Organization
    .get('/', controller.getOrganization)
    .post('/', controller.addOrganization)
    
    // Items
    .get('/items', controller.getItems)
    .post('/items', controller.addItem)

    // Pricing
    .get('/pricings', controller.getPricings)
    .post('/pricings', controller.getTotalPricing) // get total price

module.exports = router;