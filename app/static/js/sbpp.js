// TODO: When clicking related, show required for and required by differently
// TODO: When deleting, prompt for Y/N
// TODO: Add offline storage
// TODO: Add multiple cities
// TODO: After dragging shopping list item, highlight/animate related cards briefly
// TODO: Checkbox for item done

const $producers = $('#producers');
const $shoppingList = $('#shopping-list');

let idCounter = 1;

const createShoppingListCards = function(itemList) {

    const $shoppingListCard = $('<div>', {
        id: itemList[itemList.length - 1].id,
        class: "card",
        text: itemList[itemList.length - 1].itemName
    });

    for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        const $card = $('<div>', {
            id: item.id,
            class: "card indent-" + item.indentLevel,
            text: item.itemName
        });
        $shoppingListCard.append($card);
    }

    return $shoppingListCard;

};

// const createTodoListItemCard = function(data) {
//
//     const item = scData.items[data.mainItemName];
//
//     $card = $('<div/>', {
//         class: 'card',
//         "main-item-id": data.mainItemId,
//         text: data.mainItemName + " (" + data.mainItemId + ")"
//     });
//
//     return $card;
// };

const scrollDivToBottom = function($div) {
    const height = $shoppingList[0].scrollHeight;
    $div.stop().animate({ scrollTop: height }, 1000);
};

// item1 and item2 are strings. e.g. "Metal"
const itemComparator = function(item1, item2) {
    const i1 = scData.items[item1];
    const i2 = scData.items[item2];
    const p1Index = Object.keys(scData.producers).indexOf(i1.producer);
    const p2Index = Object.keys(scData.producers).indexOf(i2.producer);
    // If the producers are different, then that is sufficient to sort.
    if (p1Index !== p2Index) {
        return p1Index - p2Index;
    }
    const i1Index = Object.keys(scData.items).indexOf(item1);
    const i2Index = Object.keys(scData.items).indexOf(item2);
    return i1Index - i2Index;
};


// Add required-for class to this item and all ancestor (required) items
const addRequiredFor = function($item) {
    $id = $item.attr('id');

    // Find each item required for this one
    $('div.card[parentid='+$id+']').each(function() {
        const $this = $(this)
        addRequiredFor($this);
    })

    $item.addClass('required-for');
};

// Add required-by class to this item and parent (required by) items
const addRequiredBy = function($item) {
    $parentid = $item.attr('parentid');

    // Find each item required for this one
    $('div.card[id='+$parentid+']').each(function() {
        const $this = $(this)
        addRequiredBy($this);
    })

    $item.addClass('required-by');
};

const handleClickRelated = function(event) {
    const $this = $(this);
    const $card = $this.parents('.card');

    // Check if we're turning it on or off.
    // required-item is the item that was clicked
    const hasClass = $card.hasClass('required-item');
    $('.required-for').removeClass('required-for');
    $('.required-by').removeClass('required-by');
    $('.required-item').removeClass('required-item');
    if (!hasClass) {
        addRequiredFor($card);
        addRequiredBy($card);
        $card.removeClass('required-for');
        $card.removeClass('required-by  ');
        $card.addClass('required-item');
    }
};

// Create a card for one of the producer lists that the user needs to make.
/*
<div class="card" id="Metal-2" parentId="Nails-1">
  <div class="item-name">Metal</div>
  <div>Related</div>              # Clickable
</div>
*/
const createWorkCard = function(item, $id, $parentId, $shoppingListParentId) {
    $card = $('<div/>', {
        class: 'card',
        id: $id,
        parentid: $parentId,
        shoppinglistparentid: $shoppingListParentId
    })
    .append($('<div>', {
        class: "item-name",
        text: item.name
    }))
    .append($('<div>', {
        class: "related-but"
    })
        .click(handleClickRelated))
    .append($('<div>', {
        class: "item-name",
        text: $id
    }));

    return $card;
};

// Recursively add itemName and its dependencies to itemList.
// Recursively add dependent items to todo list, including any dependent items.
const addItemToShoppingList = function(item, $parentId, $shoppingListParentId) {
    // Add the required items, if it has any.
    const $id = item.id + '-' + idCounter++;
    for (const requirement of item.requirements) {
        for (let i = 0; i < requirement.amount; i++) {
            // const qi = {
            //     itemName: requirement.item,
            //     id: encodeName(requirement.item + '-' + idCounter++),
            //     parent: shoppingListItem.id,
            //     indentLevel: shoppingListItem.indentLevel + 1, // TODO: Delete?
            //     producer: item.producer
            // };
            const requirementItem = scData.items[requirement.item];
            addItemToShoppingList(requirementItem, $id, $shoppingListParentId);
        }
    }
    const producerName = item.producer;
    const producer = scData.producers[producerName];
    // Then add the item itself.
    const $producer = $('#' + producer.id);
    const $card = createWorkCard(item, $id, $parentId, $shoppingListParentId);
    $producer.append($card);
};

// Handle when the user clicks the delete icon on the shopping list card.
const handleClickDelete = function() {
    const $this = $(this);
    const $card = $this.parents('.card');
    const $shoppingListParentId = $card.attr('id');

    $('div.card[shoppinglistparentid="'+$shoppingListParentId+'"').remove();
    $card.remove();

};

// React when the user clicks an item in the producer list.
const handleClickProducerItem = function() {
    const $this = $(this);
    const item = scData.items[$this.text()];

    // Build up the item list, which includes the item itself plus dependencies.
    const $id = 'sl-' + item.id + '-' + idCounter++;
    addItemToShoppingList(item, $id, $id);

    // Add the item that was clicked to the shoppingList.
    // const $shoppingListCards = createShoppingCards(itemList);
    const $card = $('<div>', {
        class: "card",
        id: $id,
    })
    .append($('<div>', {
        class: "item-name",
        text: item.name
    }))
    .append($('<div>', {
        class: "related-but"
    })
    .click(handleClickRelated))
    .append($('<div>', {
        class: "delete-but",
    })
    .click(handleClickDelete));

    $shoppingList.append($card);

    scrollDivToBottom($shoppingList);
};

// Create the items for the given producer on the screen.
const initProducerItems = function(producerName) {
    let $itemList = $('<div>');
    for (const itemName in scData.items) {
        const item = scData.items[itemName];
        if (item.producer === producerName) {
            // Create the parent if this is the first one
            const $item = $('<div>', {
                class: "card",
                text: itemName
            });
            $item.click(handleClickProducerItem);
            $itemList.append($item);
        }
    }
    return $itemList.children();
};

// Convert a string to alphanumeric and numbers only and hyphens.
// e.g. Farmer's Market => FarmersMarket
// Useful for generating id's.
const encodeName = function(name) {
    return name.replace(/[^0-9a-z\-]/gi, '');
};

// Create the producers area on the screen.
const initProducers = function() {
    for (const producerName in scData.producers) {

        // Add an id to each producer for future reference
        const producer = scData.producers[producerName];
        producer.id = encodeName(producerName);
        producer.name = producerName; // Lame, but there it is.

        // Create a card for each producer.
        const $producerDiv = $('<div>', {
            class: "producer",
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

const initItems = function() {
    for (const itemName in scData.items) {
        // Add an id to each item for future reference
        const item = scData.items[itemName];
        item.id = encodeName(itemName);
        item.name = itemName; // Lame, but there it is.
    }
};

// If a shopping list item was moved, then move its dependent items
// in the todo list, too.
// $item will be the <li> containing the card.
const reorderShoppingList = function($item) {
    i = $item; // TODO: Delete
    const $itemId = $item.attr('id');
    if ($item.index() === 0) {
        // $item was moved to the first element.
        $('.work-list').each(function() {
            const $producerList = $(this)
            const $producerId = $producerList.attr('id')
            const $firstItem = $producerList.children('div.card').first();
            // If there are no other items, then nothing to do.
            if ($firstItem.length === 0) {
                return;
            }
            const $itemToMove = $('div.card[shoppinglistparentid="'+$itemId+'"]', $producerList);
            $itemToMove.insertBefore($firstItem);
        });
    } else if ($item.index() === $shoppingList.children('div.card').length - 1) {
        // $item was moved to the last element.
        $('.work-list').each(function() {
            const $producerList = $(this)
            const $producerId = $producerList.attr('id')
            const $lastItem = $producerList.children('div.card').last();
            // If there are no other items, then nothing to do.
            if ($lastItem.length === 0) {
                return;
            }
            const $itemToMove = $('div.card[shoppinglistparentid="'+$itemId+'"]', $producerList);
            $itemToMove.insertAfter($lastItem);
        });
    } else {
        // $item was moved to somewhere in between. It must have at least one
        // item above it and at least one item below it.
        $('.work-list').each(function() {
            const $producerList = $(this)
            const $producerId = $producerList.attr('id')
            const $nextShoppingListItem = $item.next();
            const $nextItem = $producerList.children('div.card[shoppinglistparentid="'+$nextShoppingListItem.attr('id')+'"]').first();
            // If there are no other items, then nothing to do.
            if ($nextItem.length === 0) {
                return;
            }
            const $itemToMove = $('div.card[shoppinglistparentid="'+$itemId+'"]', $producerList);
            $itemToMove.insertBefore($nextItem);
        });
    }
};

// TODO: Rename this function to something more meaningful.
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
            var newIndex = ui.item.index();
            var oldIndex = $(this).attr('data-previndex');
            $(this).removeAttr('data-previndex');
            // Only reorder if the item actually moved.
            if (newIndex !== oldIndex) {
                reorderShoppingList(ui.item);
            }
        },
        stop: function(event, ui) {
            // reorderShoppingList(ui.item);
        }
    });
    $shoppingList.disableSelection();
};

const handleWindowResize = function() {
    const outerMargin = 46;
    const height = $(window).outerHeight() - outerMargin;
    $('div.area').css('height', height + 'px');
    // $producers.css('height', height + 'px');
    // $shoppingList.css('height', height + 'px');
};

$(document).ready(function() {
    initItems();
    initProducers();

    initDrag();

    $(window).on('resize', function() {
        handleWindowResize();
    });
    handleWindowResize();

});