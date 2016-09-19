/* eslint-disable no-unused-vars */

const scProducers = {

    "Factory": {
        "name": "Factory",
        "imageUrl": "a"
    },

    "BuildingSuppliesStore": {
        "name": "Building Supplies Store",
        "imageUrl": ""
    },

    "HardwareStore": {
        "name": "Hardware Store",
        "imageUrl": "cc"
    },

    "FarmersMarket": {
        "name": "Farmer's Market",
        "imageUrl": ""
    },

    "FurnitureStore": {
        "name": "Furniture Store",
        "imageUrl": ""
    },

    "GardeningSupplies": {
        "name": "Gardening Supplies",
        "imageUrl": ""
    },

    "DonutShop": {
        "name": "Donut Shop",
        "imageUrl": ""
    },

    "FashionStore": {
        "name": "Fashion Store",
        "imageUrl": "b"
    },

    "FastFoodRestaurant": {
        "name": "Fast Food Restaurant",
        "imageUrl": ""
    },

    "HomeAppliances": {
        "name": "HomeAppliances",
        "imageUrl": ""
    }

};

const scItems = {

    "Metal": {
        "name": "Metal",
        "producer": "Factory",
        "duration": 1,
        "requirements": []
    },

    "Wood": {
        "name": "Wood",
        "producer": "Factory",
        "duration": 3,
        "requirements": []
    },

    "Plastic": {
        "name": "Plastic",
        "producer": "Factory",
        "duration": 9,
        "requirements": []
    },

    "Seeds": {
        "name": "Seeds",
        "producer": "Factory",
        "duration": 20,
        "requirements": []
    },

    "Minerals": {
        "name": "Minerals",
        "producer": "Factory",
        "duration": 30,
        "requirements": []
    },

    "Chemicals": {
        "name": "Chemicals",
        "producer": "Factory",
        "duration": 120,
        "requirements": []
    },

    "Textiles": {
        "name": "Textiles",
        "producer": "Factory",
        "duration": 180,
        "requirements": []
    },

    "SugarAndSpices": {
        "name": "Sugar & Spices",
        "producer": "Factory",
        "duration": 240,
        "requirements": []
    },

    "Glass": {
        "name": "Glass",
        "producer": "Factory",
        "duration": 300,
        "requirements": []
    },

    "AnimalFeed": {
        "name": "Animal Feed",
        "producer": "Factory",
        "duration": 360,
        "requirements": []
    },

    "ElectronicComponents": {
        "name": "Elec. Compnts",
        "producer": "Factory",
        "duration": 420,
        "requirements": []
    },

    "Nails": {
        "name": "Nails",
        "producer": "BuildingSuppliesStore",
        "duration": 5,
        "requirements": [{"item": "Metal", "amount": 2}]
    },

    "Planks": {
        "name": "Planks",
        "producer": "BuildingSuppliesStore",
        "duration": 30,
        "requirements": [{"item": "Wood", "amount": 2}]
    },

    "Bricks": {
        "name": "Bricks",
        "producer": "BuildingSuppliesStore",
        "duration": 20,
        "requirements": [{"item": "Minerals", "amount": 2}]
    },

    "Cement": {
        "name": "Cement",
        "producer": "BuildingSuppliesStore",
        "duration": 50,
        "requirements": [{"item": "Minerals", "amount": 2}, {"item": "Chemicals", "amount": 1}]
    },

    "Glue": {
        "name": "Glue",
        "producer": "BuildingSuppliesStore",
        "duration": 60,
        "requirements": [{"item": "Plastic", "amount": 1}, {"item": "Chemicals", "amount": 2}]
    },

    "Paint": {
        "name": "Paint",
        "producer": "BuildingSuppliesStore",
        "duration": 60,
        "requirements": [{"item": "Metal", "amount": 2}, {"item": "Minerals", "amount": 1}, {"item": "Chemicals", "amount": 2}]
    },

    "Hammer": {
        "name": "Hammer",
        "producer": "HardwareStore",
        "duration": 14,
        "requirements": [{"item": "Metal", "amount": 1}, {"item": "Wood", "amount": 1}]
    },

    "MeasuringTape": {
        "name": "Measuring Tape",
        "producer": "HardwareStore",
        "duration": 20,
        "requirements": [{"item": "Metal", "amount": 1}, {"item": "Plastic", "amount": 1}]
    },

    "Shovel": {
        "name": "Shovel",
        "producer": "HardwareStore",
        "duration": 30,
        "requirements": [{"item": "Metal", "amount": 1}, {"item": "Wood", "amount": 1}, {"item": "Plastic", "amount": 1}]
    },

    "CookingUtensil": {
        "name": "Cooking Utensil",
        "producer": "HardwareStore",
        "duration": 45,
        "requirements": [{"item": "Metal", "amount": 2}, {"item": "Wood", "amount": 2}, {"item": "Plastic", "amount": 2}]
    },

    "Ladder": {
        "name": "Ladder",
        "producer": "HardwareStore",
        "duration": 60,
        "requirements": [{"item": "Metal", "amount": 2}, {"item": "Planks", "amount": 2}]
    },

    "Drill": {
        "name": "Drill",
        "producer": "HardwareStore",
        "duration": 120,
        "requirements": [{"item": "Metal", "amount": 2}, {"item": "Plastic", "amount": 2}, {"item": "ElectronicComponents", "amount": 1}]
    },

    "Vegetables": {
        "name": "Vegetables",
        "producer": "FarmersMarket",
        "duration": 20,
        "requirements": [{"item": "Seeds", "amount": 2}]
    },

    "FlourBag": {
        "name": "Flour Bag",
        "producer": "FarmersMarket",
        "duration": 30,
        "requirements": [{"item": "Seeds", "amount": 2}, {"item": "Textiles", "amount": 2}]
    },

    "FruitAndBerries": {
        "name": "Fruit & Berries",
        "producer": "FarmersMarket",
        "duration": 90,
        "requirements": [{"item": "Seeds", "amount": 2}, {"item": "TreeSaplings", "amount": 1}]
    },

    "Cream": {
        "name": "Cream",
        "producer": "FarmersMarket",
        "duration": 75,
        "requirements": [{"item": "AnimalFeed", "amount": 1}]
    },

    "Corn": {
        "name": "Corn",
        "producer": "FarmersMarket",
        "duration": 60,
        "requirements": [{"item": "Minerals", "amount": 1}, {"item": "Seeds", "amount": 4}]
    },

    "Cheese": {
        "name": "Cheese",
        "producer": "FarmersMarket",
        "duration": 105,
        "requirements": [{"item": "AnimalFeed", "amount": 2}]
    },

    "Beef": {
        "name": "Beef",
        "producer": "FarmersMarket",
        "duration": 150,
        "requirements": [{"item": "AnimalFeed", "amount": 3}]
    },

    "Chairs": {
        "name": "Chairs",
        "producer": "FurnitureStore",
        "duration": 20,
        "requirements": [{"item": "Wood", "amount": 2}, {"item": "Nails", "amount": 1}, {"item": "Hammer", "amount": 1}]
    },

    "Tables": {
        "name": "Tables",
        "producer": "FurnitureStore",
        "duration": 30,
        "requirements": [{"item": "Nails", "amount": 2}, {"item": "Planks", "amount": 1}, {"item": "Hammer", "amount": 1}]
    },

    "HomeTextiles": {
        "name": "Home Textiles",
        "producer": "FurnitureStore",
        "duration": 75,
        "requirements": [{"item": "Textiles", "amount": 2}, {"item": "MeasuringTape", "amount": 1}]
    },

    "Cupboard": {
        "name": "Cupboard",
        "producer": "FurnitureStore",
        "duration": 45,
        "requirements": [{"item": "Glass", "amount": 2}, {"item": "Planks", "amount": 2}, {"item": "Paint", "amount": 1}]
    },

    "Couch": {
        "name": "Couch",
        "producer": "FurnitureStore",
        "duration": 150,
        "requirements": [{"item": "Textiles", "amount": 3}, {"item": "Glue", "amount": 1}, {"item": "Drill", "amount": 1}]
    },

    "Grass": {
        "name": "Grass",
        "producer": "GardeningSupplies",
        "duration": 30,
        "requirements": [{"item": "Seeds", "amount": 1}, {"item": "Shovel", "amount": 1}]
    },

    "TreeSaplings": {
        "name": "Tree Saplings",
        "producer": "GardeningSupplies",
        "duration": 90,
        "requirements": [{"item": "Seeds", "amount": 2}, {"item": "Shovel", "amount": 1}]
    },

    "GardenFurniture": {
        "name": "Garden Furniture",
        "producer": "GardeningSupplies",
        "duration": 135,
        "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Textiles", "amount": 2}, {"item": "Planks", "amount": 2}]
    },

    "FirePit": {
        "name": "Fire Pit",
        "producer": "GardeningSupplies",
        "duration": 240,
        "requirements": [{"item": "Bricks", "amount": 2}, {"item": "Cement", "amount": 2}, {"item": "Shovel", "amount": 1}]
    },

    "LawnMower": {
        "name": "Lawn Mower",
        "producer": "GardeningSupplies",
        "duration": 120,
        "requirements": [{"item": "Metal", "amount": 3}, {"item": "ElectronicComponents", "amount": 1}, {"item": "Paint", "amount": 1}]
    },

    "GardenGnomes": {
        "name": "Garden Gnomes",
        "producer": "GardeningSupplies",
        "duration": 90,
        "requirements": [{"item": "Cement", "amount": 2}, {"item": "Glue", "amount": 1}]
    },

    "Donuts": {
        "name": "Donuts",
        "producer": "DonutShop",
        "duration": 45,
        "requirements": [{"item": "SugarAndSpices", "amount": 1}, {"item": "FlourBag", "amount": 1}]
    },

    "GreenSmoothie": {
        "name": "Green Smoothie",
        "producer": "DonutShop",
        "duration": 30,
        "requirements": [{"item": "Vegetables", "amount": 1}, {"item": "FruitAndBerries", "amount": 1}]
    },

    "BreadRoll": {
        "name": "BreadRoll",
        "producer": "DonutShop",
        "duration": 60,
        "requirements": [{"item": "FlourBag", "amount": 2}, {"item": "Cream", "amount": 1}]
    },

    "CherryCheesecake": {
        "name": "Cherry Cheesecake",
        "producer": "DonutShop",
        "duration": 90,
        "requirements": [{"item": "FlourBag", "amount": 1}, {"item": "FruitAndBerries", "amount": 1}, {"item": "Cheese", "amount": 1}]
    },

    "FrozenYogurt": {
        "name": "Frozen Yogurt",
        "producer": "DonutShop",
        "duration": 240,
        "requirements": [{"item": "SugarAndSpices", "amount": 1}, {"item": "FruitAndBerries", "amount": 1}, {"item": "Cream", "amount": 1}]
    },

    "Coffee": {
        "name": "Coffee",
        "producer": "DonutShop",
        "duration": 60,
        "requirements": [{"item": "Seeds", "amount": 2}, {"item": "SugarAndSpices", "amount": 1}, {"item": "Cream", "amount": 1}]
    },

    "Cap": {
        "name": "Cap",
        "producer": "FashionStore",
        "duration": 60,
        "requirements": [{"item": "Textiles", "amount": 2}, {"item": "MeasuringTape", "amount": 1}]
    },

    "Shoes": {
        "name": "Shoes",
        "producer": "FashionStore",
        "duration": 75,
        "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Textiles", "amount": 2}, {"item": "Glue", "amount": 1}]
    },

    "Watch": {
        "name": "Watch",
        "producer": "FashionStore",
        "duration": 90,
        "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Chemicals", "amount": 1}, {"item": "Glass", "amount": 1}]
    },

    "BusinessSuits": {
        "name": "Business Suits",
        "producer": "FashionStore",
        "duration": 210,
        "requirements": [{"item": "Textiles", "amount": 3}, {"item": "Glue", "amount": 1}, {"item": "MeasuringTape", "amount": 1}]
    },

    "Backpack": {
        "name": "Backpack",
        "producer": "FashionStore",
        "duration": 150,
        "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Textiles", "amount": 2}, {"item": "MeasuringTape", "amount": 1}]
    },

    "IceCreamSandwich": {
        "name": "Ice Cream Sandwich",
        "producer": "FastFoodRestaurant",
        "duration": 14,
        "requirements": [{"item": "Cream", "amount": 1}, {"item": "BreadRoll", "amount": 1}]
    },

    "Pizza": {
        "name": "Pizza",
        "producer": "FastFoodRestaurant",
        "duration": 24,
        "requirements": [{"item": "FlourBag", "amount": 1}, {"item": "Cheese", "amount": 1}, {"item": "Beef", "amount": 1}]
    },

    "Burgers": {
        "name": "Burgers",
        "producer": "FastFoodRestaurant",
        "duration": 35,
        "requirements": [{"item": "Beef", "amount": 1}, {"item": "BreadRoll", "amount": 1}, {"item": "BBQGrill", "amount": 1}]
    },

    "CheeseFries": {
        "name": "Cheese Fries",
        "producer": "FastFoodRestaurant",
        "duration": 20,
        "requirements": [{"item": "Vegetables", "amount": 1}, {"item": "Cheese", "amount": 1}]
    },

    "LemonadeBottle": {
        "name": "Lemonade Bottle",
        "producer": "FastFoodRestaurant",
        "duration": 60,
        "requirements": [{"item": "SugarAndSpices", "amount": 1}, {"item": "Glass", "amount": 1}, {"item": "FruitAndBerries", "amount": 1}]
    },

    "Popcorn": {
        "name": "Popcorn",
        "producer": "FastFoodRestaurant",
        "duration": 30,
        "requirements": [{"item": "Corn", "amount": 2}, {"item": "MicrowaveOven", "amount": 1}]
    },

    "BBQGrill": {
        "name": "BBQ Grill",
        "producer": "HomeAppliances",
        "duration": 165,
        "requirements": [{"item": "Metal", "amount": 3}, {"item": "CookingUtensil", "amount": 1}]
    },

    "Refrigerator": {
        "name": "Refrigerator",
        "producer": "HomeAppliances",
        "duration": 210,
        "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Chemicals", "amount": 2}, {"item": "ElectronicComponents", "amount": 2}]
    },

    "LightingSystem": {
        "name": "Lighting System",
        "producer": "HomeAppliances",
        "duration": 105,
        "requirements": [{"item": "Chemicals", "amount": 1}, {"item": "Glass", "amount": 1}, {"item": "ElectronicComponents", "amount": 1}]
    },

    "TV": {
        "name": "TV",
        "producer": "HomeAppliances",
        "duration": 150,
        "requirements": [{"item": "Plastic", "amount": 2}, {"item": "Glass", "amount": 1}, {"item": "ElectronicComponents", "amount": 2}]
    },

    "MicrowaveOven": {
        "name": "Microwave Oven",
        "producer": "HomeAppliances",
        "duration": 120,
        "requirements": [{"item": "Metal", "amount": 4}, {"item": "Glass", "amount": 1}, {"item": "ElectronicComponents", "amount": 1}]
    }

};

/* eslint-enable */

