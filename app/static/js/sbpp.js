// TODO: When deleting, prompt for Y/N
// TODO: Add offline storage
// TODO: Add multiple cities
// TODO: Fix colors when you press hieararchy button and the cards are green or orange or grey
// TODO: Similarly, fix colors when you drag to reorder and they cards flash cyan colors

const barnTest = new Barn('Barn02', localStorage);

let idSeq = 1;

const storage = new Storage();

const $storage = $('#storage');
// const $work = $('#work'); // TODO: Delete this?
const $producerList = $('#producer-list');
const $shoppingList = $('#shopping-list');
const $todoList = $('#todo-list');

const producers = {};
const items = {};

/*
storage = {
    "Factory": {
        "Metal": { "building": 0, "have": 0, "need": 0 },
        "Wood": { "building": 0, "have": 0, "need": 0 },
        ...
    },
    ...
};
*/
const storage = {};

/*
shoppingList = {
    "sl-Metal-123": {"itemId": "Metal"},
    "sl-Glass-124": {"itemId": "Glass"},
    ...
};
*/
const shoppingList = {};

/*
shoppingListOrdered = [
    "sl-Metal-123",
    "sl-Glass-124",
    ...
];
*/
const shoppingListOrdered = [];

/*
todoList = {
    "Factory": {
        "todo-Metal-142": { "itemId": "Metal", "parentId": "todo-Nails-141", shoppingListId: "sl-Nails-123" },
        "todo-Metal-143": { "itemId": "Metal", "parentId": "todo-Nails-141", shoppingListId: "sl-Nails-123" },
        ...
    },
    ...
};
*/
const todoList = {};

// Example code: [1, 2, 3].move(0, 1) gives [2, 1, 3]
Array.prototype.move = function(oldIndex, newIndex) {
    if (newIndex >= this.length) {
        let k = newIndex - this.length;
        while ((k--) + 1) {
            /* eslint-disable no-undefined */
            this.push(undefined);
            /* eslint-enable no-undefined */
        }
    }
    this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
    return this; // for testing purposes
};

const scrollDivToBottom = function($div) {
    const height = $shoppingList[0].scrollHeight;
    $div.stop().animate({ scrollTop: height }, 1000);
};

const handleWindowResize = function() {
    const outerMargin = 46;
    const height = $(window).outerHeight() - outerMargin;
    $producerList.css('height', height + 'px');
    $shoppingList.css('height', height + 'px');
    $('.area', $todoList).css('height', height + 'px');
};

const setCardStatusBlocked = function($card) {
    $card.addClass('blocked');
    $card.removeClass('done');
    $card.removeClass('unblocked');
};

const setCardStatusUnblocked = function($card) {
    $card.addClass('unblocked');
    $card.removeClass('done');
    $card.removeClass('blocked');
};

const setCardStatusDone = function($card) {
    $card.addClass('done');
    $card.removeClass('unblocked');
    $card.removeClass('blocked');
};

const createProducerItemCard = function(item) {
    return $('<div>', {
        class: "card",
        text: item.name,
        itemid: item.id
    });
};

const createStorageItemCard = function(item) {
    return $('<div>', {
        id: "storage-" + item.id,
        class: "card",
        text: item.name
    })
    .append($('<div>', {
        class: "clearfix"
    })
        .append($('<div>', {
            class: "building-controls"
        })
            .append($('<img>', {
                class: "plus",
                src: "static/images/plus.png"
            }))
            .append($('<img>', {
                class: "minus",
                src: "static/images/minus.png"
            }))
            .append($('<span>', {
                class: "building-amount",
                text: 0
            })))
        .append($('<div>', {
            class: "amount-controls"
        })
            .append($('<img>', {
                class: "plus",
                src: "static/images/plus.png"
            }))
            .append($('<img>', {
                class: "minus",
                src: "static/images/minus.png"
            }))
            .append($('<span>', {
                class: "have-amount",
                text: 0
            }))
            .append(' / ')
            .append($('<span>', {
                class: "need-amount",
                text: 0
            })))
        );
};

const buildStorage = function() {
    for (const i in scProducers) {

        if (!scProducers.hasOwnProperty(i)) {
            //The current property is not a direct property of scProducers
            continue;
        }

        const producerId = scProducers[i].id;
        const producer = producers[producerId];

        storage[producerId] = {};

        $storageProducer = $('<div>', {
            id: "storage-" + producer.id,
            class: "area"
        })
            .append($('<p>', {
                class: "name",
                text: producer.name
            }));

        for (const i in scItems) {
            const itemId = scItems[i].id;
            const item = items[itemId];
            if (item.producerId !== producerId) {
                continue;
            }

            storage[producerId][itemId] = {};
            storage[producerId][itemId]["building"] = 0;
            storage[producerId][itemId]["have"] = 0;
            storage[producerId][itemId]["need"] = 0;

            const $producerItem = createStorageItemCard(item);
            $storageProducer.append($producerItem);
        }

        $storage.append($('<div>', {
            class: "col-sm-1 nopadding"
        })
            .append($storageProducer));
    }

    $storage.children().first().addClass('col-sm-offset-2');

};

const createTodoCard = function(item) {

    return $('<div>', {
        id: "???",
        class: "card",
        text: item.name
    });
};

/*
todoList = {
    "Factory": {
        "todo-Metal-142": { "itemId": "Metal", "parentId": "todo-Nails-141", shoppingListId: "sl-Nails-123" },
        "todo-Metal-143": { "itemId": "Metal", "parentId": "todo-Nails-141", shoppingListId: "sl-Nails-123" },
        ...
    },
    ...
};
*/
// Recursively add dependent items to todo list, including any dependent items.
const addItemToShoppingList = function(item, parentId, shoppingListId) {

    for (const i in item.requirements) {
        if (!item.requirements.hasOwnProperty(i)) {
            //The current property is not a direct property of scProducers
            continue;
        }

        const reqItemId = item.requirements[i].itemId;
        const reqItem = items[reqItemId];
        const reqItemAmount = parseInt(item.requirements[i].amount)
        for (let j = 0; j < reqItemAmount; j++) {
            addItemToShoppingList(reqItem, item.id, shoppingListId);
        }

    }

    const todoItemId = 'todo-' + item.id + idSeq++;
    const todoItem = {
        "itemId": item.id,
        "parentId": parentId,
        "shoppingListId": shoppingListId
    };
    todoList[item.producerId].push(todoItem);

    const $card = $('<div>', {
        id: "",
        class: "card",
        text: item.name
    })
    setCardStatusBlocked($card);
};

const handleClickProducerItem = function() {
    const itemId = $(this).attr('itemid');
    const item = items[itemId];

    const shoppinglistId = 'sl-' + itemId + '-' + idSeq++

    shoppingList[shoppinglistId] = { "itemId": item.id };

    shoppingListOrdered.push(shoppinglistId);

    const $card = $('<div>', {
        class: "card",
        shoppinglistid: shoppinglistId,
        text: item.name
    });
    setCardStatusBlocked($card);
    $shoppingList.append($card);
    scrollDivToBottom($shoppingList);

    // Build up the item list, which includes the item itself plus dependencies.
    addItemToShoppingList(item, null, shoppinglistId);
};

const buildProducerList = function() {
    for (const i in scProducers) {
        if (!scProducers.hasOwnProperty(i)) {
            //The current property is not a direct property of scProducers
            continue;
        }

        const producerId = scProducers[i].id;
        const producer = producers[producerId];

        const $producer = $('<div>', {
            class: "producer"
        })
            .append($('<p>', {
                text: producer.name
            }));

        for (const i in scItems) {
            const itemId = scItems[i].id;
            const item = items[itemId];
            if (item.producerId !== producerId) {
                continue;
            }
            const $producerItem = createProducerItemCard(item);
            $producerItem.click(handleClickProducerItem);
            $producer.append($producerItem);
        }

        $producerList.append($producer);
    }

};

const buildTodoList = function() {
    for (const i in scProducers) {
        const producerId = scProducers[i].id;
        const producer = producers[producerId];

        $todoProducer = $('<div>', {
            id: "todo-list-" + producer.id,
            class: "area"
        })
            .append($('<p>', {
                class: "name",
                text: producer.name
            }));

        $todoList.append($('<div>', {
            class: "col-sm-1 nopadding"
        })
            .append($todoProducer));

        const todoProducer = {
            "producerId": producerId
        };
        todoList[producerId] = [];
    }
};

const initDrag = function() {
    $shoppingList.sortable({
        items: "div.card",
        placeholder: "sortable-placeholder",
        revert: 100,
        cursor: "-webkit-grabbing",
        forcePlaceholderSize: true,
        cancel: "input,textarea,button,select,option,div.related-but,div.delete-but",
        // axis: "y",
        // cursorAt: { left: 5 }
        start: function(event, ui) {
            // creates a temporary attribute on the element with the old index
            $(this).attr('data-previndex', ui.item.index());
        },
        update: function(e, ui) {
            // gets the new and old index then removes the temporary attribute
            const newIndex = ui.item.index();
            const oldIndex = $(this).attr('data-previndex');
            $(this).removeAttr('data-previndex');
            // Only reorder if the item actually moved.
            if (newIndex !== oldIndex) {
                // reorderShoppingList(ui.item);
                console.log('It moved!');
            }
        },
    });
    $shoppingList.disableSelection();
};

const main = function() {

    $storage.empty();
    $producerList.empty();
    $('div.card', $shoppingList).remove();
    $todoList.empty();

    buildStorage();
    buildProducerList();
    buildTodoList();

    handleWindowResize();

};


$(document).ready(function() {

    // Initialize the producers object
    for (const i in scProducers) {
        const producer = scProducers[i];
        producers[producer.id] = producer;
    }

    // Initialize the items object
    for (const i in scItems) {
        const item = scItems[i];
        items[item.id] = item;
    }

    $(window).on('resize', function() {
        handleWindowResize();
    });

    main();

    initDrag();


});