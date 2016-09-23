// TODO: When deleting, prompt for Y/N
// TODO: Add offline storage
// TODO: Add multiple cities
// TODO: Fix colors when you press hieararchy button and the cards are green or orange or grey
// TODO: Similarly, fix colors when you drag to reorder and they cards flash cyan colors

const barnTest = new Barn('Barn02', localStorage);

let idCounter = 1;

const $storage = $('#storage');
// const $work = $('#work'); // TODO: Delete this?
const $producerList = $('#producer-list');
const $shoppingList = $('#shopping-list');
const $todoList = $('#todo-list');

const handleWindowResize = function() {
    const outerMargin = 46;
    const height = $(window).outerHeight() - outerMargin;
    $producerList.css('height', height + 'px');
    $shoppingList.css('height', height + 'px');
    $('.area', $todoList).css('height', height + 'px');
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
        id: "storage-"+item.id,
        class: "card",
        text: item.name
    })
};

const buildStorage = function() {
    for (const producerId in scProducers) {
        const producer = scProducers[producerId];

        $storageProducer = $('<div>', {
            id: "storage-"+producer.id,
            class: "area"
        })
            .append($('<p>', {
                class: "name",
                text: producer.name
            }));

        for (const itemId in scItems) {
            const item = scItems[itemId];
            if (item.producerId !== producerId) {
                continue;
            }
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

const handleClickProducerItem = function() {
    const $this = $(this);
    const itemId = $this.attr('itemid');
    // const item = scData.items[$this.text()];
    console.log(itemId+': That tickles!');
};

const buildProducerList = function() {
    for (const producerId in scProducers) {
        const producer = scProducers[producerId];

        const $producer = $('<div>', {
            class: "producer"
        })
            .append($('<p>', {
                text: producer.name
            }));

        for (const itemId in scItems) {
            const item = scItems[itemId];
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
    for (const producerId in scProducers) {
        const producer = scProducers[producerId];

        $todoProducer = $('<div>', {
            id: "todo-list-"+producer.id,
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
                reorderShoppingList(ui.item);
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

    for (const producerId in scProducers) {
        const producer = scProducers[producerId];
        producer.id = producerId; // Lame, but there it is.
    }

    for (const itemId in scItems) {
        const item = scItems[itemId];
        item.id = itemId; // Lame, but there it is.
    }

    $(window).on('resize', function() {
        handleWindowResize();
    });

    main();

});