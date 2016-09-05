const $producers = $('#producers');

const $wishList = $('#wish-list');
const $wishListItems = $wishList.children('ul');

const $todoList = $('#todo-list');
const $todoListItems = $todoList.children('ul');

let idCounter = 0;

// Handle when the user clicks the delete icon on the wish list card.
const handleClickDelete = function() {
    const $this = $(this);

    // Delete required items from todo list.
    const $card = $this.parents('.card');
    const id = $card.attr('id');
    $('div[main-item-id="' + id + '"]', '#todo-list').each(function() {
        const $item = $(this);
        $item.parents('li').remove();
    });

    // Now delete the item from the wish list.
    $this.parents('li').remove();
};

/*
<div id="wish-list-1" class="card">
  <div class="item-name">Nails</div>
</div>
*/
const createWishListItemCard = function(itemName) {

    idCounter++;

    $card = $('<div/>', {
        id: "wish-list-" + idCounter,
        class: 'card',
    })
        .append($('<div>', {
            class: "item-name",
            text: itemName
        }))
        .append($('<input>', {
            class: "comment"
        }))
        .append($('<img>', {
            src: 'static/images/delete.png',
            class: 'delete',
            click: handleClickDelete
        }));

    return $card;
};

const createTodoListItemCard = function(data) {

    const item = scData.items[data.mainItemName];

    $card = $('<div/>', {
        class: 'card',
        "main-item-id": data.mainItemId,
        text: data.mainItemName + " (" + data.mainItemId + ")"
    });

    return $card;
};

const scrollDivToBottom = function($div) {
    const height = $wishList[0].scrollHeight;
    $div.stop().animate({ scrollTop: height }, 1000);
};

// Recursively add itemName and its dependencies to itemList.
// Recursively add dependent items to todo list, including any dependent items.
const addItemToTodoList = function(itemName, itemList) {
    // Add the required items.
    for (const requirement of scData.items[itemName].requirements) {
        // console.log('  '+requirement.item+' ('+requirement.amount+')');
        for (let i = 0; i < requirement.amount; i++) {
            itemList = addItemToTodoList(requirement.item, itemList);
        }
    }
    itemList.push(itemName);
    return itemList;
};

// Add item to todo list, including any dependent items.
const addItemToTodoList2 = function($wishListCard) {
    const $mainItemName = $wishListCard.find('.item-name');
    const mainItemId = $wishListCard.attr('id');
    const mainItemName = $mainItemName.text();

    // Add the required items.
    for (const requirement of scData.items[mainItemName].requirements) {
        for (let i = 0; i < requirement.amount; i++) {
            const cardData = {
                "mainItemName": requirement.item,
                "mainItemId": mainItemId,
                "amount": requirement.amount
            };
            const $todoListCard = createTodoListItemCard(cardData);
            $todoListItems.append($('<li>')
                .append($todoListCard)
            );
        }
    }

    // Add the item itself.
    const cardData = {
        "mainItemName": mainItemName,
        "mainItemId": mainItemId,
        "amount": 1
    };
    const $todoListCard = createTodoListItemCard(cardData);
    $todoListItems.append($('<li>')
        .append($todoListCard)
    );

    scrollDivToBottom($todoList);
};

// React when the user clicks an item in the producer list.
const handleClickProducerItem = function() {
    $this = $(this);
    const itemName = $this.text();

    // Add the item that was clicked to the wish list.
    const $wishListCard = createWishListItemCard(itemName);
    $wishListItems.append($('<li>')
        .append($wishListCard)
    );
    scrollDivToBottom($wishList);

    // Add the item and its dependencies to the todo list.
    let itemList = addItemToTodoList(itemName, []);
    console.log(itemList);
    // $todoListItems.append($('<li>', {
    //     text: $this.text()
    // }));
    // scrollDivToBottom($todoList);
};

// Create the items for the given producer on the screen.
const initProducerItems = function(producerName) {
    let $itemList;
    for (const itemName in scData.items) {
        const item = scData.items[itemName];
        if (item.producer === producerName) {
            // Create the parent if this is the first one
            if (typeof $itemList === 'undefined') {
                $itemList = $('<ul>');
            }
            const $item = $('<li>', {
                class: "card",
                text: itemName
            });
            $item.click(handleClickProducerItem);
            $itemList.append($item);
        }
    }
    return $itemList;
};

// Create the producers area on the screen.
const initProducers = function() {
    for (const producerName in scData.producers) {

        // Create a card for each producer.
        const $producerDiv = $('<div>', {
            id: "producer-" + producerName,
            text: producerName
        });

        const itemList = initProducerItems(producerName);
        if (typeof itemList !== 'undefined') {
            $producerDiv.append(itemList);
        }

        $producers.append($producerDiv);
    }
};

// If a wish list item was moved, then move its dependent items
// in the todo list, too.
const reorderTodoList = function($mainItem) {
    const $mainCard = $mainItem.find('.card');
    const mainItemId = $mainCard.attr('id');
    console.log('id=' + mainItemId + ', index=' + $mainItem.index());

    // If we're not the first item, then find the previous one.
    if ($mainItem.index() !== 0) {
        const $prevItem = $wishListItems.children().eq($mainItem.index() - 1);
        console.log('prev=' + $prevItem.find('.card').attr('id'));
    }
    $wishListItems.children().each(function() {
        const $this = $(this);
        const $card = $this.find('.card');
        const itemId = $card.attr('id');
        console.log(itemId + ', index=' + $this.index());
    });
    // }
};

// TODO: Rename this function to something more meaningful.
const initDrag = function() {
    $wishList.sortable({
        items: "li",
        placeholder: "sortable-placeholder",
        revert: 100,
        cursor: "-webkit-grabbing",
        forcePlaceholderSize: true,
        // axis: "y",
        // cursorAt: { left: 5 }
        stop: function( event, ui ) {
            u = ui;
            console.log("stop");
            reorderTodoList(ui.item);
        }
        // beforeStop: function( event, ui ) {
        //     p = ui.position;
        //     console.log("beforeStop ("+ui.position.top+", "+ui.position.left+")");
        //     $( this ).sortable( "cancel" );
        // },
        // deactivate: function( event, ui ) {
        //     p = ui.position;
        //     console.log("deactivate ("+ui.position.top+", "+ui.position.left+")");
        // }
        // over: function(e, ui) { sortableIn = 1; console.log('In'); },
        // out: function(e, ui) { sortableIn = 0; console.log('Out'); },
        // beforeStop: function (event, ui) {
        //     newItem = ui.item;
        //     if (sortableIn == 0) {
        //       ui.item.remove();
        //    }
        // }
    });
    $wishList.disableSelection();
};

const handleWindowResize = function() {
    const outerMargin = 46;
    const height = $(window).outerHeight() - outerMargin;
    $producers.css('height', height + 'px');
    $wishList.css('height', height + 'px');
    $todoList.css('height', height + 'px');
};

$(document).ready(function() {
    initProducers();

    initDrag();

    $(window).on('resize', function() {
        handleWindowResize();
    });
    handleWindowResize();

});