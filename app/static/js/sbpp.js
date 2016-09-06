const $producers = $('#producers');

const $shoppingList = $('#shopping-list');
const $shoppingListItems = $shoppingList.children('ul');

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

    // $card = $('<div/>', {
    //     id: "shoppingList-" + idCounter++,
    //     class: 'card',
    // })
    //     .append($('<div>', {
    //         class: "item-name",
    //         text: itemName
    //     }))
    //     .append($('<input>', {
    //         class: "comment"
    //     }))
    //     .append($('<img>', {
    //         src: 'static/images/delete.png',
    //         class: 'delete',
    //         click: handleClickDelete
    //     }));

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

const handleClickRelated = function(event) {
    // Check if this is a shopping list card or work card.
    const $this = $(this);
    const $card = $this.parents('.card');
    let $shoppingListParentId = $card.attr('shoppinglistparentid');
    let $shoppingListParent;
    if (typeof($shoppingListParentId) === 'undefined') {
        $shoppingListParentId = $card.attr('id');
        $shoppingListParent = $card;
    } else {
        $shoppingListParent = $('div.card[id="'+$shoppingListParentId+'"');
    }

    // Toggle showing related
    if ($shoppingListParent.hasClass('related')) {
        $shoppingListParent.removeClass('related');
        $('div.card[shoppinglistparentid="'+$shoppingListParentId+'"').removeClass('related');
    } else {
        // Remove the class from any other items in case the user clicked a different item this time.
        $('.related').removeClass('related');

        $shoppingListParent.addClass('related');
        $('div.card[shoppinglistparentid="'+$shoppingListParentId+'"').addClass('related');
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
            class: "show-related",
            text: "Related"
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
    const $producer = $('#' + producer.id + ' > ul');
    const $card = createWorkCard(item, $id, $parentId, $shoppingListParentId);
    $producer.append($('<li>')
        .append($card));
};

// Handle when the user clicks the delete icon on the shopping list card.
const handleClickDelete = function() {
    const $this = $(this);
    const $card = $this.parents('.card');
    const $shoppingListParentId = $card.attr('id');

    $('div.card[shoppinglistparentid="'+$shoppingListParentId+'"').parent('li').remove();
    $card.parent('li').remove();

};

// React when the user clicks an item in the producer list.
const handleClickProducerItem = function() {
    const $this = $(this);
    const item = scData.items[$this.text()];

    // Build up the item list, which includes the item itself plus dependencies.
    // const shoppingListItem = {
    //     itemName: itemName,
    //     id: encodeName(itemName + '-' + idCounter++),
    //     parent: null,
    //     indentLevel: 0,
    //     producer: "Safeway"
    // };
    const $id = 'sl-' + item.id + '-' + idCounter++;
    addItemToShoppingList(item, $id, $id);
    // console.log(itemList);
    // console.log(item
    // The actual item will be the last one in the list.List.sort(itemComparator));
    // $todoListItems.append($('<li>', {
    //     text: $this.text()
    // }));

    // Add the item that was clicked to the shoppingList.
    // const $shoppingListCards = createShoppingCards(itemList);
    const $card = $('<div>', {
            class: "card",
            id: $id,
            text: item.name
    })
        .append($('<div>', {
            class: "show-related",
            text: "Related"
        })
            .click(handleClickRelated))
        .append($('<div>', {
            class: "delete",
            text: "Delete"
        })
            .click(handleClickDelete));


    $shoppingListItems.append($('<li>')
        .append($card));




    scrollDivToBottom($shoppingList);
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
    const $itemId = $item.find('.card').attr('id');
    console.log('-------------------------------------------');
    console.log('$itemId='+$itemId);
    if ($item.index() === 0) {
        // $item was moved to the first element.
        console.log('Moved to first position');
        $('.work-list').each(function() {
            const $this = $(this)
            const $producerId = $this.attr('id')
            console.log('Updating '+$producerId);
            const $firstItem = $this.children('ul').children('li').first();
            if ($firstItem.length === 0) {
                console.log('  No items. Skipping');
                return;
            }
            f = $firstItem;
            console.log('  $firstItem='+$firstItem.find('div.card').attr('id')+' - '+$firstItem.length);
            a = $('div.card[shoppinglistparentid="'+$itemId+'"]');
            b = $('div.card[shoppinglistparentid="'+$itemId+'"]', $this);
            t = $this;
            const $itemToMove = $('div.card[shoppinglistparentid="'+$itemId+'"]', $this).parents('li');
            $itemToMove.insertBefore($firstItem);
        });
    } else if ($item.index() === $shoppingListItems.children('li').length - 1) {
        // $item was moved to the last element.
        console.log('Moved to last position');
        $('.work-list').each(function() {
            const $this = $(this)
            const $producerId = $this.attr('id')
            console.log('Updating '+$producerId);
            const $lastItem = $this.children('ul').children('li').last();
            if ($lastItem.length === 0) {
                console.log('  No items. Skipping');
                return;
            }
            f = $lastItem;
            console.log('  $lastItem='+$lastItem.find('div.card').attr('id')+' - '+$lastItem.length);
            a = $('div.card[shoppinglistparentid="'+$itemId+'"]');
            b = $('div.card[shoppinglistparentid="'+$itemId+'"]', $this);
            t = $this;
            const $itemToMove = $('div.card[shoppinglistparentid="'+$itemId+'"]', $this).parents('li');
            $itemToMove.insertAfter($lastItem);
        });
    } else {
        // $item was moved to somewhere in between. It must have at least one
        // item above it and at least one item below it.
        console.log('Middle');
    }
};

// const reorderTodoList = function($mainItem) {
//     const $mainCard = $mainItem.find('.card');
//     const mainItemId = $mainCard.attr('id');
//     console.log('id=' + mainItemId + ', index=' + $mainItem.index());
//
//     // If we're not the first item, then find the previous one.
//     if ($mainItem.index() !== 0) {
//         const $prevItem = $shoppingListItems.children().eq($mainItem.index() - 1);
//         console.log('prev=' + $prevItem.find('.card').attr('id'));
//     }
//     $shoppingListItems.children().each(function() {
//         const $this = $(this);
//         const $card = $this.find('.card');
//         const itemId = $card.attr('id');
//         console.log(itemId + ', index=' + $this.index());
//     });
//     // }
// };

// TODO: Rename this function to something more meaningful.
const initDrag = function() {
    $shoppingList.sortable({
        items: "li",
        placeholder: "sortable-placeholder",
        revert: 100,
        cursor: "-webkit-grabbing",
        forcePlaceholderSize: true,
        cancel: "input,textarea,button,select,option,div.show-related,div.delete",
        // axis: "y",
        // cursorAt: { left: 5 }
        stop: function( event, ui ) {
            reorderShoppingList(ui.item);
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
    const outerMargin = 46;
    const height = $(window).outerHeight() - outerMargin;
    $('div.area').css('height', height + 'px');
    // $producers.css('height', height + 'px');
    // $shoppingList.css('height', height + 'px');
};

$(document).ready(function() {
    initProducers();
    initItems();

    initDrag();

    $(window).on('resize', function() {
        handleWindowResize();
    });
    handleWindowResize();

});