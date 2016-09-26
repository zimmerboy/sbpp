/* eslint-disable no-unused-vars */

const scProducers = [

    {
        "id": "Factory",
        "name": "Factory",
        "imageUrl": "a"
    },

    {
        "id": "BuildingSuppliesStore",
        "name": "Building Supplies Store",
        "imageUrl": "b"
    },

    {
        "id": "HardwareStore",
        "name": "Hardware Store",
        "imageUrl": "c"
    },

    {
        "id": "FarmersMarket",
        "name": "Farmer's Market",
        "imageUrl": "d"
    },

    {
        "id": "FurnitureStore",
        "name": "Furniture Store",
        "imageUrl": "e"
    },

    {
        "id": "GardeningSupplies",
        "name": "Gardening Supplies",
        "imageUrl": "f"
    },

    {
        "id": "DonutShop",
        "name": "Donut Shop",
        "imageUrl": "g"
    },

    {
        "id": "FashionStore",
        "name": "Fashion Store",
        "imageUrl": "h"
    },

    {
        "id": "FastFoodRestaurant",
        "name": "Fast Food Restaurant",
        "imageUrl": "i"
    },

    {
        "id": "HomeAppliances",
        "name": "Home Appliances",
        "imageUrl": "j"
    }

];

const scItems = [

    {
        "id": "Metal",
        "name": "Metal",
        "producerId": "Factory",
        "duration": 1,
        "requirements": []
    },

    {
        "id": "Wood",
        "name": "Wood",
        "producerId": "Factory",
        "duration": 3,
        "requirements": []
    },

    {
        "id": "Plastic",
        "name": "Plastic",
        "producerId": "Factory",
        "duration": 9,
        "requirements": []
    },

    {
        "id": "Seeds",
        "name": "Seeds",
        "producerId": "Factory",
        "duration": 20,
        "requirements": []
    },

    {
        "id": "Minerals",
        "name": "Minerals",
        "producerId": "Factory",
        "duration": 30,
        "requirements": []
    },

    {
        "id": "Chemicals",
        "name": "Chemicals",
        "producerId": "Factory",
        "duration": 120,
        "requirements": []
    },

    {
        "id": "Textiles",
        "name": "Textiles",
        "producerId": "Factory",
        "duration": 180,
        "requirements": []
    },

    {
        "id": "SugarAndSpices",
        "name": "Sugar & Spices",
        "producerId": "Factory",
        "duration": 240,
        "requirements": []
    },

    {
        "id": "Glass",
        "name": "Glass",
        "producerId": "Factory",
        "duration": 300,
        "requirements": []
    },

    {
        "id": "AnimalFeed",
        "name": "Animal Feed",
        "producerId": "Factory",
        "duration": 360,
        "requirements": []
    },

    {
        "id": "ElectronicComponents",
        "name": "Elec. Compnts",
        "producerId": "Factory",
        "duration": 420,
        "requirements": []
    },

    {
        "id": "Nails",
        "name": "Nails",
        "producerId": "BuildingSuppliesStore",
        "duration": 5,
        "requirements": [{"itemId": "Metal", "amount": 2}]
    },

    {
        "id": "Planks",
        "name": "Planks",
        "producerId": "BuildingSuppliesStore",
        "duration": 30,
        "requirements": [{"itemId": "Wood", "amount": 2}]
    },

    {
        "id": "Bricks",
        "name": "Bricks",
        "producerId": "BuildingSuppliesStore",
        "duration": 20,
        "requirements": [{"itemId": "Minerals", "amount": 2}]
    },

    {
        "id": "Cement",
        "name": "Cement",
        "producerId": "BuildingSuppliesStore",
        "duration": 50,
        "requirements": [{"itemId": "Minerals", "amount": 2}, {"itemId": "Chemicals", "amount": 1}]
    },

    {
        "id": "Glue",
        "name": "Glue",
        "producerId": "BuildingSuppliesStore",
        "duration": 60,
        "requirements": [{"itemId": "Plastic", "amount": 1}, {"itemId": "Chemicals", "amount": 2}]
    },

    {
        "id": "Paint",
        "name": "Paint",
        "producerId": "BuildingSuppliesStore",
        "duration": 60,
        "requirements": [{"itemId": "Metal", "amount": 2}, {"itemId": "Minerals", "amount": 1}, {"itemId": "Chemicals", "amount": 2}]
    },

    {
        "id": "Hammer",
        "name": "Hammer",
        "producerId": "HardwareStore",
        "duration": 14,
        "requirements": [{"itemId": "Metal", "amount": 1}, {"itemId": "Wood", "amount": 1}]
    },

    {
        "id": "MeasuringTape",
        "name": "Measuring Tape",
        "producerId": "HardwareStore",
        "duration": 20,
        "requirements": [{"itemId": "Metal", "amount": 1}, {"itemId": "Plastic", "amount": 1}]
    },

    {
        "id": "Shovel",
        "name": "Shovel",
        "producerId": "HardwareStore",
        "duration": 30,
        "requirements": [{"itemId": "Metal", "amount": 1}, {"itemId": "Wood", "amount": 1}, {"itemId": "Plastic", "amount": 1}]
    },

    {
        "id": "CookingUtensil",
        "name": "Cooking Utensil",
        "producerId": "HardwareStore",
        "duration": 45,
        "requirements": [{"itemId": "Metal", "amount": 2}, {"itemId": "Wood", "amount": 2}, {"itemId": "Plastic", "amount": 2}]
    },

    {
        "id": "Ladder",
        "name": "Ladder",
        "producerId": "HardwareStore",
        "duration": 60,
        "requirements": [{"itemId": "Metal", "amount": 2}, {"itemId": "Planks", "amount": 2}]
    },

    {
        "id": "Drill",
        "name": "Drill",
        "producerId": "HardwareStore",
        "duration": 120,
        "requirements": [{"itemId": "Metal", "amount": 2}, {"itemId": "Plastic", "amount": 2}, {"itemId": "ElectronicComponents", "amount": 1}]
    },

    {
        "id": "Vegetables",
        "name": "Vegetables",
        "producerId": "FarmersMarket",
        "duration": 20,
        "requirements": [{"itemId": "Seeds", "amount": 2}]
    },

    {
        "id": "FlourBag",
        "name": "Flour Bag",
        "producerId": "FarmersMarket",
        "duration": 30,
        "requirements": [{"itemId": "Seeds", "amount": 2}, {"itemId": "Textiles", "amount": 2}]
    },

    {
        "id": "FruitAndBerries",
        "name": "Fruit & Berries",
        "producerId": "FarmersMarket",
        "duration": 90,
        "requirements": [{"itemId": "Seeds", "amount": 2}, {"itemId": "TreeSaplings", "amount": 1}]
    },

    {
        "id": "Cream",
        "name": "Cream",
        "producerId": "FarmersMarket",
        "duration": 75,
        "requirements": [{"itemId": "AnimalFeed", "amount": 1}]
    },

    {
        "id": "Corn",
        "name": "Corn",
        "producerId": "FarmersMarket",
        "duration": 60,
        "requirements": [{"itemId": "Minerals", "amount": 1}, {"itemId": "Seeds", "amount": 4}]
    },

    {
        "id": "Cheese",
        "name": "Cheese",
        "producerId": "FarmersMarket",
        "duration": 105,
        "requirements": [{"itemId": "AnimalFeed", "amount": 2}]
    },

    {
        "id": "Beef",
        "name": "Beef",
        "producerId": "FarmersMarket",
        "duration": 150,
        "requirements": [{"itemId": "AnimalFeed", "amount": 3}]
    },

    {
        "id": "Chairs",
        "name": "Chairs",
        "producerId": "FurnitureStore",
        "duration": 20,
        "requirements": [{"itemId": "Wood", "amount": 2}, {"itemId": "Nails", "amount": 1}, {"itemId": "Hammer", "amount": 1}]
    },

    {
        "id": "Tables",
        "name": "Tables",
        "producerId": "FurnitureStore",
        "duration": 30,
        "requirements": [{"itemId": "Nails", "amount": 2}, {"itemId": "Planks", "amount": 1}, {"itemId": "Hammer", "amount": 1}]
    },

    {
        "id": "HomeTextiles",
        "name": "Home Textiles",
        "producerId": "FurnitureStore",
        "duration": 75,
        "requirements": [{"itemId": "Textiles", "amount": 2}, {"itemId": "MeasuringTape", "amount": 1}]
    },

    {
        "id": "Cupboard",
        "name": "Cupboard",
        "producerId": "FurnitureStore",
        "duration": 45,
        "requirements": [{"itemId": "Glass", "amount": 2}, {"itemId": "Planks", "amount": 2}, {"itemId": "Paint", "amount": 1}]
    },

    {
        "id": "Couch",
        "name": "Couch",
        "producerId": "FurnitureStore",
        "duration": 150,
        "requirements": [{"itemId": "Textiles", "amount": 3}, {"itemId": "Glue", "amount": 1}, {"itemId": "Drill", "amount": 1}]
    },

    {
        "id": "Grass",
        "name": "Grass",
        "producerId": "GardeningSupplies",
        "duration": 30,
        "requirements": [{"itemId": "Seeds", "amount": 1}, {"itemId": "Shovel", "amount": 1}]
    },

    {
        "id": "TreeSaplings",
        "name": "Tree Saplings",
        "producerId": "GardeningSupplies",
        "duration": 90,
        "requirements": [{"itemId": "Seeds", "amount": 2}, {"itemId": "Shovel", "amount": 1}]
    },

    {
        "id": "GardenFurniture",
        "name": "Garden Furniture",
        "producerId": "GardeningSupplies",
        "duration": 135,
        "requirements": [{"itemId": "Plastic", "amount": 2}, {"itemId": "Textiles", "amount": 2}, {"itemId": "Planks", "amount": 2}]
    },

    {
        "id": "FirePit",
        "name": "Fire Pit",
        "producerId": "GardeningSupplies",
        "duration": 240,
        "requirements": [{"itemId": "Bricks", "amount": 2}, {"itemId": "Cement", "amount": 2}, {"itemId": "Shovel", "amount": 1}]
    },

    {
        "id": "LawnMower",
        "name": "Lawn Mower",
        "producerId": "GardeningSupplies",
        "duration": 120,
        "requirements": [{"itemId": "Metal", "amount": 3}, {"itemId": "ElectronicComponents", "amount": 1}, {"itemId": "Paint", "amount": 1}]
    },

    {
        "id": "GardenGnomes",
        "name": "Garden Gnomes",
        "producerId": "GardeningSupplies",
        "duration": 90,
        "requirements": [{"itemId": "Cement", "amount": 2}, {"itemId": "Glue", "amount": 1}]
    },

    {
        "id": "Donuts",
        "name": "Donuts",
        "producerId": "DonutShop",
        "duration": 45,
        "requirements": [{"itemId": "SugarAndSpices", "amount": 1}, {"itemId": "FlourBag", "amount": 1}]
    },

    {
        "id": "GreenSmoothie",
        "name": "Green Smoothie",
        "producerId": "DonutShop",
        "duration": 30,
        "requirements": [{"itemId": "Vegetables", "amount": 1}, {"itemId": "FruitAndBerries", "amount": 1}]
    },

    {
        "id": "BreadRoll",
        "name": "BreadRoll",
        "producerId": "DonutShop",
        "duration": 60,
        "requirements": [{"itemId": "FlourBag", "amount": 2}, {"itemId": "Cream", "amount": 1}]
    },

    {
        "id": "CherryCheesecake",
        "name": "Cherry Cheesecake",
        "producerId": "DonutShop",
        "duration": 90,
        "requirements": [{"itemId": "FlourBag", "amount": 1}, {"itemId": "FruitAndBerries", "amount": 1}, {"itemId": "Cheese", "amount": 1}]
    },

    {
        "id": "FrozenYogurt",
        "name": "Frozen Yogurt",
        "producerId": "DonutShop",
        "duration": 240,
        "requirements": [{"itemId": "SugarAndSpices", "amount": 1}, {"itemId": "FruitAndBerries", "amount": 1}, {"itemId": "Cream", "amount": 1}]
    },

    {
        "id": "Coffee",
        "name": "Coffee",
        "producerId": "DonutShop",
        "duration": 60,
        "requirements": [{"itemId": "Seeds", "amount": 2}, {"itemId": "SugarAndSpices", "amount": 1}, {"itemId": "Cream", "amount": 1}]
    },

    {
        "id": "Cap",
        "name": "Cap",
        "producerId": "FashionStore",
        "duration": 60,
        "requirements": [{"itemId": "Textiles", "amount": 2}, {"itemId": "MeasuringTape", "amount": 1}]
    },

    {
        "id": "Shoes",
        "name": "Shoes",
        "producerId": "FashionStore",
        "duration": 75,
        "requirements": [{"itemId": "Plastic", "amount": 2}, {"itemId": "Textiles", "amount": 2}, {"itemId": "Glue", "amount": 1}]
    },

    {
        "id": "Watch",
        "name": "Watch",
        "producerId": "FashionStore",
        "duration": 90,
        "requirements": [{"itemId": "Plastic", "amount": 2}, {"itemId": "Chemicals", "amount": 1}, {"itemId": "Glass", "amount": 1}]
    },

    {
        "id": "BusinessSuits",
        "name": "Business Suits",
        "producerId": "FashionStore",
        "duration": 210,
        "requirements": [{"itemId": "Textiles", "amount": 3}, {"itemId": "Glue", "amount": 1}, {"itemId": "MeasuringTape", "amount": 1}]
    },

    {
        "id": "Backpack",
        "name": "Backpack",
        "producerId": "FashionStore",
        "duration": 150,
        "requirements": [{"itemId": "Plastic", "amount": 2}, {"itemId": "Textiles", "amount": 2}, {"itemId": "MeasuringTape", "amount": 1}]
    },

    {
        "id": "IceCreamSandwich",
        "name": "Ice Cream Sandwich",
        "producerId": "FastFoodRestaurant",
        "duration": 14,
        "requirements": [{"itemId": "Cream", "amount": 1}, {"itemId": "BreadRoll", "amount": 1}]
    },

    {
        "id": "Pizza",
        "name": "Pizza",
        "producerId": "FastFoodRestaurant",
        "duration": 24,
        "requirements": [{"itemId": "FlourBag", "amount": 1}, {"itemId": "Cheese", "amount": 1}, {"itemId": "Beef", "amount": 1}]
    },

    {
        "id": "Burgers",
        "name": "Burgers",
        "producerId": "FastFoodRestaurant",
        "duration": 35,
        "requirements": [{"itemId": "Beef", "amount": 1}, {"itemId": "BreadRoll", "amount": 1}, {"itemId": "BBQGrill", "amount": 1}]
    },

    {
        "id": "CheeseFries",
        "name": "Cheese Fries",
        "producerId": "FastFoodRestaurant",
        "duration": 20,
        "requirements": [{"itemId": "Vegetables", "amount": 1}, {"itemId": "Cheese", "amount": 1}]
    },

    {
        "id": "LemonadeBottle",
        "name": "Lemonade Bottle",
        "producerId": "FastFoodRestaurant",
        "duration": 60,
        "requirements": [{"itemId": "SugarAndSpices", "amount": 1}, {"itemId": "Glass", "amount": 1}, {"itemId": "FruitAndBerries", "amount": 1}]
    },

    {
        "id": "Popcorn",
        "name": "Popcorn",
        "producerId": "FastFoodRestaurant",
        "duration": 30,
        "requirements": [{"itemId": "Corn", "amount": 2}, {"itemId": "MicrowaveOven", "amount": 1}]
    },

    {
        "id": "BBQGrill",
        "name": "BBQ Grill",
        "producerId": "HomeAppliances",
        "duration": 165,
        "requirements": [{"itemId": "Metal", "amount": 3}, {"itemId": "CookingUtensil", "amount": 1}]
    },

    {
        "id": "Refrigerator",
        "name": "Refrigerator",
        "producerId": "HomeAppliances",
        "duration": 210,
        "requirements": [{"itemId": "Plastic", "amount": 2}, {"itemId": "Chemicals", "amount": 2}, {"itemId": "ElectronicComponents", "amount": 2}]
    },

    {
        "id": "LightingSystem",
        "name": "Lighting System",
        "producerId": "HomeAppliances",
        "duration": 105,
        "requirements": [{"itemId": "Chemicals", "amount": 1}, {"itemId": "Glass", "amount": 1}, {"itemId": "ElectronicComponents", "amount": 1}]
    },

    {
        "id": "TV",
        "name": "TV",
        "producerId": "HomeAppliances",
        "duration": 150,
        "requirements": [{"itemId": "Plastic", "amount": 2}, {"itemId": "Glass", "amount": 1}, {"itemId": "ElectronicComponents", "amount": 2}]
    },

    {
        "id": "MicrowaveOven",
        "name": "Microwave Oven",
        "producerId": "HomeAppliances",
        "duration": 120,
        "requirements": [{"itemId": "Metal", "amount": 4}, {"itemId": "Glass", "amount": 1}, {"itemId": "ElectronicComponents", "amount": 1}]
    }

];

/* eslint-enable no-unused-vars */