const pool = require('../../db');
const queries = require('./queries');

// ORGANIZATION START
const getOrganization = (req, res) => {
    try {
        pool.query(queries.getOrganization, (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
        })
    } catch (error) {
        console.log("error", error);
    }
}

const addOrganization = (req, res) => {
    try {
        const { name } = req.body;
        pool.query(queries.addOrganization, [name], (error, results) => {
            if(error) throw error;
            res.status(201).send("Organization added successfully");
        })
    } catch (error) {
        console.log("error", error);
    }
}


// ITEMS START
const getItems = (req, res) => {
    try {
        pool.query(queries.getItems, (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
        })
    } catch (error) {
        console.log("error", error);
    }
}

const addItem = (req, res) => {
    try {
        const { type, description } = req.body;
        pool.query(queries.addItem, [type, description], (error, results) => {
            if(error) throw error;
            res.status(201).send("Items added successfully");
        })
    } catch (error) {
        console.log("error", error);
    }
}

// Pricing START
const getPricings = (req, res) => {
    try {
        pool.query(queries.getPricings, (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
        })
    } catch (error) {
        console.log("error", error);
    }
}

const getTotalPricing = (req, res) => {
    try {
        const { zone, organization_id, total_distance, item_type } = req.body;
        if(item_type !== "perishable" && item_type !== "non-perishable"){
            return res.status(400).json("item_type should be either perishable or non-perishable");
        }
    
        let base_distance_in_km;
        let km_price_cents;
        let fix_price_cents;
    
        pool.query(queries.getPricing, [zone, organization_id], (error, results) => {
            if (error) {
                throw error;
            }
            if(results.rows == undefined || results.rows.length == 0){
                return res.status(400).json("no rows found");
            }
            const itemId = results.rows[0].item_id;
            base_distance_in_km = results.rows[0].base_distance_in_km;
            km_price_cents = results.rows[0].km_price_cents.split("/");
            fix_price_cents = results.rows[0].fix_price_cents/100;
    
            // second query inside the callback function
            pool.query(queries.getItemType, [itemId, item_type], (error, results) => {
                if (error) {
                    throw error;
                }
                if(results.rows == undefined || results.rows.length == 0){
                    return res.status(400).json("no rows found");
                }
                const itemtype = results.rows[0].type;
    
                const remainingDistance = total_distance - base_distance_in_km;
                const priceAbove = itemtype === "perishable" ? km_price_cents[0] : km_price_cents[1];
                const addPriceAbove = remainingDistance * (parseInt(priceAbove)/100);
                const totalPrice = fix_price_cents + addPriceAbove;
    
                return res.json({ totalPrice: totalPrice });
            });
        });
    } catch (error) {
        console.log("error", error);
    }
};




module.exports = {
    getOrganization,
    addOrganization,
    getItems,
    addItem,
    getPricings,
    getTotalPricing
}