const $producers = $('#producers');

const $shoppingList = $('#shopping-list');
const $shoppingListItems = $shoppingList.children('ul');

const $workList = $('#work-list');
const $workListItems = $workList.children('ul');

let idCounter = 0;

// Handle when the user clicks the delete icon on the shopping list card.
const handleClickDelete = function() {
    const $this = $(this);

    // Delete required items from work list.
    const $card = $this.parents('.card');
    const id = $card.attr('id');
    $('div[main-item-id="'+id+'"]', '#work-list').each(function() {
        const $item = $(this);
        $item.parents('li').remove();
    });

    // Now delete the item from the shopping list.
    $this.parents('li').remove();
};

/*
<div id="shopping-list-1" class="card">
  <div class="item-name">Nails</div>
</div>
*/
const createShoppingListItemCard = function(itemName) {

    idCounter++;

    $card = $('<div/>', {
        id: "shopping-list-" + idCounter,
        class: 'card',
    })
        .append($('<div>', {
            class: "item-name",
            text: itemName
        }))
        .append($('<input>'), {

        })
        .append($('<a>', {
            href: "http://yahoo.com",
            text: "Info"
        }))
        .append($('<img>', {
            src: 'static/images/delete.png',
            class: 'delete',
            click: handleClickDelete
        }));

    return $card;
};

const createWorkListItemCard = function(data) {

    const item = scData.items[data.mainItemName];

    $card = $('<div/>', {
        class: 'card',
        "main-item-id": data.mainItemId,
        text: data.mainItemName + " (" + data.mainItemId + ")"
    });

    return $card;
};

const scrollDivToBottom = function($div) {
    const height = $shoppingList[0].scrollHeight;
    $div.stop().animate({ scrollTop: height }, 1000);
};

// Add item to work list, including any dependent items.
const addItemToWorkList = function($shoppingListCard) {
    const $mainItemName = $shoppingListCard.find('.item-name');
    const mainItemId = $shoppingListCard.attr('id');
    const mainItemName = $mainItemName.text();

    // Add the required items.
    for (const requirement of scData.items[mainItemName].requirements) {
        for (let i = 0; i < requirement.amount; i++) {
            const cardData = {
                "mainItemName": requirement.item,
                "mainItemId": mainItemId,
                "amount": requirement.amount
            };
            const $workListCard = createWorkListItemCard(cardData);
            $workListItems.append($('<li>')
                .append($workListCard)
            );
        }
    }

    // Add the item itself.
    const cardData = {
        "mainItemName": mainItemName,
        "mainItemId": mainItemId,
        "amount": 1
    };
    const $workListCard = createWorkListItemCard(cardData);
    $workListItems.append($('<li>')
        .append($workListCard)
    );

    scrollDivToBottom($workList);
};

// React when the user clicks an item in the producer list.
const handleClickProducerItem = function() {
    $this = $(this);

    // Add the item that was clicked to the shopping list.
    const $shoppingListCard = createShoppingListItemCard($this.text());
    $shoppingListItems.append($('<li>')
        .append($shoppingListCard)
    );
    scrollDivToBottom($shoppingList);

    // Add the item and its dependencies to the work list.
    addItemToWorkList($shoppingListCard);
    // $workListItems.append($('<li>', {
    //     text: $this.text()
    // }));
    // scrollDivToBottom($workList);
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

// If a shopping list item was moved, then move its dependent items
// in the work list, too.
const reorderWorkList = function($mainItem) {
    const $mainCard = $mainItem.find('.card');
    const mainItemId = $mainCard.attr('id');
    console.log('id='+mainItemId+', index='+$mainItem.index());

    // If we're not the first item, then find the previous one.
    if ($mainItem.index() !== 0) {
        const $prevItem = $shoppingListItems.children().eq($mainItem.index()-1);
        console.log('prev='+$prevItem.find('.card').attr('id'));
    }
    $shoppingListItems.children().each(function(){
        const $this = $(this);
        const $card = $this.find('.card');
        const itemId = $card.attr('id');
        console.log(itemId+', index='+$this.index());
    });
    // }
};

// TODO: Rename this function to something more meaningful.
const initDrag = function() {
    $shoppingList.sortable({
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
            reorderWorkList(ui.item);
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
    $shoppingList.disableSelection();
};

const handleWindowResize = function() {
    const margin = 66;
    $producers.css('height', ($(window).outerHeight() - margin) + 'px');
    $shoppingList.css('height', ($(window).outerHeight() - margin) + 'px');
    $workList.css('height', ($(window).outerHeight() - margin) + 'px');
};

$(document).ready(function() {
    initProducers();

    initDrag();

    $(window).on('resize', function() {
        handleWindowResize();
    });
    handleWindowResize();

});