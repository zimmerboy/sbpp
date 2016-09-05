const $producers = $('#producers');

const $queue = $('#queue');
const $queueItems = $queue.children('ul');

let idCounter = 0;

// Handle when the user clicks the delete icon on the queue card.
const handleClickDelete = function() {
    const $this = $(this);

    // Delete required items from todo list.
    // const $card = $this.parents('.card');
    // const id = $card.attr('id');
    // $('div[main-item-id="' + id + '"]', '#todo-list').each(function() {
    //     const $item = $(this);
    //     $item.parents('li').remove();
    // });

    // Now delete the item from the queue.
    $this.parents('li').remove();
};

// Convert a string to alphanumeric and numbers only and hyphens.
// e.g. Farmer's Market => FarmersMarket
// Useful for generating id's.
const encodeName = function(name) {
    return name.replace(/[^0-9a-z\-]/gi, '')
};

// The actual item will be the last one in the list.
/*
<div id="GreenSmoothie-1-card" class="card">
  <div id="Seeds-3" class="indent-2" parent="Vegetables-2">
    Seeds
  </div>
  <div id="Seeds-4" class="indent-2" parent="Vegetables-2">
    Seeds
  </div>
  <div id="Vegetables-2" class="indent-1" parent="GreenSmoothie-1">
    Vegetables
  </div>
  ...
  <div id="GreenSmoothie-1" class="indent-0" parent="">
    Green Smoothie
  </div>
</div>
*/
const createQueueCards = function(itemList) {

    const $queueCard = $('<div>', {
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
        $queueCard.append($card);
    }

    // $card = $('<div/>', {
    //     id: "queue-" + idCounter++,
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

    return $queueCard;

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
    const height = $queue[0].scrollHeight;
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

// Recursively add itemName and its dependencies to itemList.
// Recursively add dependent items to todo list, including any dependent items.
const addItemToQueueList = function(queueItem) {
    // Add the required items, if it has any.
    let itemList = [];
    for (const requirement of scData.items[queueItem.itemName].requirements) {
        for (let i = 0; i < requirement.amount; i++) {
            const qi = {
                itemName: requirement.item,
                id: encodeName(requirement.item + '-' + idCounter++),
                parent: queueItem.id,
                indentLevel: queueItem.indentLevel + 1
            };
            itemList = itemList.concat(addItemToQueueList(qi));
        }
    }
    // Then add the item itself.
    itemList = itemList.concat(queueItem);
    return itemList;
};

// React when the user clicks an item in the producer list.
const handleClickProducerItem = function() {
    $this = $(this);
    const itemName = $this.text();

    // Build up the item list, which includes the item itself plus dependencies.
    const queueItem = {
        itemName: itemName,
        id: encodeName(itemName + '-' + idCounter++),
        parent: null,
        indentLevel: 0
    };
    const itemList = addItemToQueueList(queueItem);
    console.log(itemList);
    // console.log(item
    // The actual item will be the last one in the list.List.sort(itemComparator));
    // $todoListItems.append($('<li>', {
    //     text: $this.text()
    // }));

    // Add the item that was clicked to the queue.
    const $queueCards = createQueueCards(itemList);
    $queueItems.append($('<li>')
        .append($queueCards)
    );

    scrollDivToBottom($queue);
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

// If a queue item was moved, then move its dependent items
// in the todo list, too.
// const reorderTodoList = function($mainItem) {
//     const $mainCard = $mainItem.find('.card');
//     const mainItemId = $mainCard.attr('id');
//     console.log('id=' + mainItemId + ', index=' + $mainItem.index());
//
//     // If we're not the first item, then find the previous one.
//     if ($mainItem.index() !== 0) {
//         const $prevItem = $queueItems.children().eq($mainItem.index() - 1);
//         console.log('prev=' + $prevItem.find('.card').attr('id'));
//     }
//     $queueItems.children().each(function() {
//         const $this = $(this);
//         const $card = $this.find('.card');
//         const itemId = $card.attr('id');
//         console.log(itemId + ', index=' + $this.index());
//     });
//     // }
// };

// TODO: Rename this function to something more meaningful.
const initDrag = function() {
    $queue.sortable({
        items: "li",
        placeholder: "sortable-placeholder",
        revert: 100,
        cursor: "-webkit-grabbing",
        forcePlaceholderSize: true,
        // axis: "y",
        // cursorAt: { left: 5 }
        stop: function( event, ui ) {
            u = ui;
            console.log("stop event");
            // reorderTodoList(ui.item);
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
    $queue.disableSelection();
};

const handleWindowResize = function() {
    const outerMargin = 46;
    const height = $(window).outerHeight() - outerMargin;
    $('div.area').css('height', height + 'px');
    // $producers.css('height', height + 'px');
    // $queue.css('height', height + 'px');
};

$(document).ready(function() {
    initProducers();

    initDrag();

    $(window).on('resize', function() {
        handleWindowResize();
    });
    handleWindowResize();

});