var mouseX;
var mouseY;
var textArea = null;
var firstTime = true;

$(document).mousemove(function() {
    mouseX = event.pageX;
    mouseY = event.pageY;
});

var listener = new Listener('listener');
listener.onResult = function(text, isFinal) {
    if (isFinal === false) {
        if (textArea === null)  {
            textArea = createNodeAtCursor(mouseX + 15, mouseY - 25, text);
        }
        else {
            textArea.text(text);
        }
    }
    else {
        textArea.text(text);
        textArea = null;
    }

    if (firstTime) {
        $('#directions').remove();
        $('#hints').css('display', 'block');
    }
}

var timeout = null;
$(document).mousemove(function(){
    // clearTimeout(timeout);

    // timeout = setTimeout(function() {
        textArea = null;
        listener.reset()
    // }, 500);
});


function createNodeAtCursor(x, y, text) {
    $span = $('<span>').text(text);
    var $div = $('<div>')
                    .addClass('node')
                    .css({
                        'left': x+'px',
                        'top': y+'px'
                    })
                    .draggable()
                    .css('position', 'absolute')
                    .editable('dblclick');
    $div.append($span);

    $(document.body).append($div);

    return $span;
}
