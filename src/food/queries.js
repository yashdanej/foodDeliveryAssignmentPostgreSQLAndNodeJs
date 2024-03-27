// Organization
const getOrganization = "select * from Organization";
const addOrganization = "insert into Organization (name) values ($1)";

// Items
const getItems = "select * from Items";
const addItem = "insert into Items (type, description) values ($1, $2)";

// Pricings
const getPricings = "select * from Pricing";
const getPricing = "select * from Pricing where zone = $1 and organization_id = $2";
const getItemType = "select * from Items where id = $1 and type = $2";

module.exports = {
    getOrganization,
    addOrganization,
    getItems,
    addItem,
    getPricings,
    getPricing,
    getItemType
}