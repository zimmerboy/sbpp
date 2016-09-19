// TODO: When deleting, prompt for Y/N
// TODO: Add offline storage
// TODO: Add multiple cities
// TODO: Fix colors when you press hieararchy button and the cards are green or orange or grey
// TODO: Similarly, fix colors when you drag to reorder and they cards flash cyan colors

const barnTest = new Barn('Barn02', localStorage);

let idCounter = 1;

const $storage = $('#storage');
const $work = $('#work');

const handleWindowResize = function() {
    const outerMargin = 46;
    const height = $(window).outerHeight() - outerMargin;
    $('div.worklist-area').css('height', height + 'px');
    // $producers.css('height', height + 'px');
    // $shoppingList.css('height', height + 'px');
};

const main = function() {
    $storage.empty();
    $work.empty();

    for (var key in scProducers) {
        console.log(key + " -> " + scProducers[key].name);
    }
};

$(document).ready(function() {

    main();

    $(window).on('resize', function() {
        handleWindowResize();
    });
    handleWindowResize();

});