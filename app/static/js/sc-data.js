/* eslint-disable no-unused-vars */

const scData = {

    "producers" : {

        "Factory": {
            "imageUrl": "a"
        },

        "Building Supplies Store": {
            "imageUrl": ""
        },

        "Hardware Store": {
            "imageUrl": "cc"
        },

        "Farmer's Market": {
            "imageUrl": ""
        },

        "Furniture Store": {
            "imageUrl": ""
        },

        "Gardening Supplies": {
            "imageUrl": ""
        },

        "Donut Shop": {
            "imageUrl": ""
        },

        "Fashion Store": {
            "imageUrl": "b"
        },

        "Fast Food Restaurant": {
            "imageUrl": ""
        },

        "Home Appliances": {
            "imageUrl": ""
        }

    },

    "items": {

        "Metal": {
            "producer": "Factory",
            "duration": 1,
            "requirements": []
        },

        "Wood": {
            "producer": "Factory",
            "duration": 3,
            "requirements": []
        },

        "Plastic": {
            "producer": "Factory",
            "duration": 9,
            "requirements": []
        },

        "Seeds": {
            "producer": "Factory",
            "duration": 20,
            "requirements": []
        },

        "Minerals": {
            "producer": "Factory",
            "duration": 30,
            "requirements": []
        },

        "Chemicals": {
            "producer": "Factory",
            "duration": 120,
            "requirements": []
        },

        "Textiles": {
            "producer": "Factory",
            "duration": 180,
            "requirements": []
        },

        "Sugar & Spices": {
            "producer": "Factory",
            "duration": 240,
            "requirements": []
        },

        "Glass": {
            "producer": "Factory",
            "duration": 300,
            "requirements": []
        },

        "Animal Feed": {
            "producer": "Factory",
            "duration": 360,
            "requirements": []
        },

        "Electrical Components": {
            "producer": "Factory",
            "duration": 420,
            "requirements": []
        },

        "Nails": {
            "producer": "Building Supplies Store",
            "duration": 5,
            "requirements": [{"item": "Metal", "amount": 2}]
        },

        "Planks": {
            "producer": "Building Supplies Store",
            "duration": 30,
            "requirements": [{"item": "Wood", "amount": 2}]
        },

        "Bricks": {
            "producer": "Building Supplies Store",
            "duration": 20,
            "requirements": [{"item": "Minerals", "amount": 2}]
        },

        "Cement": {
            "producer": "Building Supplies Store",
            "duration": 50,
            "requirements": [{"item": "Minerals", "amount": 2}, {"item": "Chemicals", "amount": 1}]
        },

        "Glue": {
            "producer": "Building Supplies Store",
            "duration": 60,
            "requirements": [{"item": "Plastic", "amount": 1}, {"item": "Chemicals", "amount": 2}]
        },

        "Paint": {
            "producer": "Building Supplies Store",
            "duration": 60,
            "requirements": [{"item": "Metal", "amount": 2}, {"item": "Minerals", "amount": 1}, {"item": "Chemicals", "amount": 2}]
        },

        "Hammer": {
            "producer": "Hardware Store",
            "duration": 14,
            "requirements": [{"item": "Metal", "amount": 1}, {"item": "Wood", "amount": 1}]
        },

        "Measuring Tape": {
            "producer": "Hardware Store",
            "duration": 20,
            "requirements": [{"item": "Metal", "amount": 1}, {"item": "Plastic", "amount": 1}]
        },

        "Shovel": {
            "producer": "Hardware Store",
            "duration": 30,
            "requirements": [{"item": "Metal", "amount": 1}, {"item": "Wood", "amount": 1}, {"item": "Plastic", "amount": 1}]
        },

        "Cooking Utensil": {
            "producer": "Hardware Store",
            "duration": 45,
            "requirements": [{"item": "Metal", "amount": 2}, {"item": "Wood", "amount": 2}, {"item": "Plastic", "amount": 2}]
        },

        "Ladder": {
            "producer": "Hardware Store",
            "duration": 60,
            "requirements": [{"item": "Metal", "amount": 2}, {"item": "Planks", "amount": 2}]
        },

        "Drill": {
            "producer": "Hardware Store",
            "duration": 120,
            "requirements": [{"item": "Metal", "amount": 2}, {"item": "Plastic", "amount": 2}, {"item": "Electrical Components", "amount": 1}]
        },

        "Vegetables": {
            "producer": "Farmer's Market",
            "duration": 20,
            "requirements": [{"item": "Seeds", "amount": 2}]
        },

        "Flour Bag": {
            "producer": "Farmer's Market",
            "duration": 30,
            "requirements": [{"item": "Seeds", "amount": 2}, {"item": "Textiles", "amount": 2}]
        },

        "Fruit and Berries": {
            "producer": "Farmer's Market",
            "duration": 90,
            "requirements": [{"item": "Seeds", "amount": 2}, {"item": "Tree Saplings", "amount": 1}]
        },

        "Cream": {
            "producer": "Farmer's Market",
            "duration": 75,
            "requirements": [{"item": "Animal Feed", "amount": 1}]
        },

        "Corn": {
            "producer": "Farmer's Market",
            "duration": 60,
            "requirements": [{"item": "Minerals", "amount": 1}, {"item": "Seeds", "amount": 4}]
        },

        "Cheese": {
            "producer": "Farmer's Market",
            "duration": 105,
            "requirements": [{"item": "Animal Feed", "amount": 2}]
        },

        "Beef": {
            "producer": "Farmer's Market",
            "duration": 150,
            "requirements": [{"item": "Animal Feed", "amount": 3}]
        },

        "Chairs": {
            "producer": "Furniture Store",
            "duration": 20,
            "requirements": [{"item": "Wood", "amount": 2}, {"item": "Nails", "amount": 1}, {"item": "Hammer", "amount": 1}]
        },

        "Tables": {
            "producer": "Furniture Store",
            "duration": 30,
            "requirements": [{"item": "Nails", "amount": 2}, {"item": "Planks", "amount": 1}, {"item": "Hammer", "amount": 1}]
        },

        "Home Textiles": {
            "producer": "Furniture Store",
            "duration": 75,
            "requirements": [{"item": "Textiles", "amount": 2}, {"item": "Measuring Tape", "amount": 1}]
        },

        "Cupboard": {
            "producer": "Furniture Store",
            "duration": 45,
            "requirements": [{"item": "Glass", "amount": 2}, {"item": "Planks", "amount": 2}, {"item": "Paint", "amount": 1}]
        },

        "Couch": {
            "producer": "Furniture Store",
            "duration": 150,
            "requirements": [{"item": "Textiles", "amount": 3}, {"item": "Glue", "amount": 1}, {"item": "Drill", "amount": 1}]
        },

        "Grass": {
            "producer": "Gardening Supplies",
            "duration": 30,
            "requirements": [{"item": "Seeds", "amount": 1}, {"item": "Shovel", "amount": 1}]
        },

        "Tree Saplings": {
            "producer": "Gardening Supplies",
            "duration": 90,
            "requirements": [{"item": "Seeds", "amount": 2}, {"item": "Shovel", "amount": 1}]
        },

        "Garden Furniture": {
            "producer": "Gardening Supplies",
            "duration": 135,
            "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Textiles", "amount": 2}, {"item": "Planks", "amount": 2}]
        },

        "Fire Pit": {
            "producer": "Gardening Supplies",
            "duration": 240,
            "requirements": [{"item": "Bricks", "amount": 2}, {"item": "Cement", "amount": 2}, {"item": "Shovel", "amount": 1}]
        },

        "Lawn Mower": {
            "producer": "Gardening Supplies",
            "duration": 120,
            "requirements": [{"item": "Metal", "amount": 3}, {"item": "Electrical Components", "amount": 1}, {"item": "Paint", "amount": 1}]
        },

        "Garden Gnomes": {
            "producer": "Gardening Supplies",
            "duration": 90,
            "requirements": [{"item": "Cement", "amount": 2}, {"item": "Glue", "amount": 1}]
        },

        "Donuts": {
            "producer": "Donut Shop",
            "duration": 45,
            "requirements": [{"item": "Sugar & Spices", "amount": 1}, {"item": "Flour Bag", "amount": 1}]
        },

        "Green Smoothie": {
            "producer": "Donut Shop",
            "duration": 30,
            "requirements": [{"item": "Vegetables", "amount": 1}, {"item": "Fruit and Berries", "amount": 1}]
        },

        "Bread Roll": {
            "producer": "Donut Shop",
            "duration": 60,
            "requirements": [{"item": "Flour Bag", "amount": 2}, {"item": "Cream", "amount": 1}]
        },

        "Cherry Cheesecake": {
            "producer": "Donut Shop",
            "duration": 90,
            "requirements": [{"item": "Flour Bag", "amount": 1}, {"item": "Fruit and Berries", "amount": 1}, {"item": "Cheese", "amount": 1}]
        },

        "Frozen Yogurt": {
            "producer": "Donut Shop",
            "duration": 240,
            "requirements": [{"item": "Sugar & Spices", "amount": 1}, {"item": "Fruit and Berries", "amount": 1}, {"item": "Cream", "amount": 1}]
        },

        "Coffee": {
            "producer": "Donut Shop",
            "duration": 60,
            "requirements": [{"item": "Seeds", "amount": 2}, {"item": "Sugar & Spices", "amount": 1}, {"item": "Cream", "amount": 1}]
        },

        "Cap": {
            "producer": "Fashion Store",
            "duration": 60,
            "requirements": [{"item": "Textiles", "amount": 2}, {"item": "Measuring Tape", "amount": 1}]
        },

        "Shoes": {
            "producer": "Fashion Store",
            "duration": 75,
            "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Textiles", "amount": 2}, {"item": "Glue", "amount": 1}]
        },

        "Watch": {
            "producer": "Fashion Store",
            "duration": 90,
            "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Chemicals", "amount": 1}, {"item": "Glass", "amount": 1}]
        },

        "Business Suits": {
            "producer": "Fashion Store",
            "duration": 210,
            "requirements": [{"item": "Textiles", "amount": 3}, {"item": "Glue", "amount": 1}, {"item": "Measuring Tape", "amount": 1}]
        },

        "Backpack": {
            "producer": "Fashion Store",
            "duration": 150,
            "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Textiles", "amount": 2}, {"item": "Measuring Tape", "amount": 1}]
        }

    }

};

/* eslint-enable */

