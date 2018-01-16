// content.js

$(document).ready(function () {

    chrome.storage.sync.get('focusYouTubeOptions', function (data) {
        var options = data.focusYouTubeOptions;
        // set activate button
        toggleActivateButton(options.active === true);
        // set checkbox
        for (var prop in options.hiding) {
            if (options.hiding.hasOwnProperty(prop)) {
                toggleCheckbox($('#' + prop), options.hiding[prop] === true)
            }
        }
    });

    // activate button listener
    var activateBtn = $('#activateButton');
    activateBtn.on('click', function () {
        var currentState = activateBtn.attr('running') === 'running';
        console.debug('Set activate status to ' + !currentState);
        // send message
        chrome.runtime.sendMessage({
            query: 'change active',
            active: !currentState // new state
        });
        toggleActivateButton(!currentState);
    });

    // checkbox listeners
    $("[type=checkbox]").on('click', function () {
        var e = $(this);
        var currentState = e.attr('checked') === 'checked';
        console.debug('Set ' + e.attr('id') + ' to ' + !currentState);
        // send message
        chrome.runtime.sendMessage({
            query: 'change hiding',
            component: e.attr('id'),
            value: !currentState // new state
        });
        toggleCheckbox(e, !currentState);
    });
});

function toggleActivateButton(newState) {
    var e = $('#activateButton');
    if (newState) {
        e.attr('running', 'running');
        e.text('running');
    } else {
        e.attr('running', '');
        e.text('paused');
    }
}

function toggleCheckbox(element, newState) {
    if (newState) {
        element.attr('checked', 'checked'); // check
    } else {
        element.removeAttr('checked'); // uncheck
    }
}