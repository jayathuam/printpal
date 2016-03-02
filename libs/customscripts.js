var menuShown = false;


$(window).load(function () {
    var heightVar = ($(window).height() - 120) + "px";
    $('.content').css('height', heightVar);
    $('#lookupMenu').css('height', heightVar + " !important");

    var wrapperheight = ($(window).height()) - 120 + "px";
    $('.wrapperDiv').css('height', wrapperheight);
    var containerHeight = ($(window).height() - 200) + "px";
    $('.internal-container').css('height', containerHeight);


});

$(window).resize(function () {
    var heightVar = ($(window).height() - 120) + "px";

    $('.content').css('height', heightVar);
    $('#lookupMenu').css('height', heightVar);
    $('#filterMenu').css('height', heightVar);

    var containerHeight = ($(window).height() - 200) + "px";
    $('.internal-container').css('height', containerHeight);


});


$(document).on('click', '#showMenu', function () {

    var state = $("#lookupMenu").is(":hidden");
    console.log(state);

   toggleSlideLookup();


});


function toggleSlideLookup() {
    // Set the effect type

    // Set the options for the effect type chosen
    var options = { direction: "right" };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    if ($("#lookupMenu").is(":hidden")) {

        $('#multipleConfigFooter').css('pointer-events', 'none').css('opacity', '0.6');

        $('#wrapperDevice').animate({'margin-left': "-280px"}, 200);
        $('.content').css('overflow', 'hidden').css('opacity', .6);
        $('.tile').css('pointer-events', 'none');
        $('.bredcombar').css('opacity', .3).css('pointer-events', 'none');
        $('.searchinputtext ').css('opacity', .3).css('pointer-events', 'none');

        menuShown = true;

    }

    else if ($("#lookupMenu").is(":visible")) {
        $('#wrapperDevice').animate({'margin-left': "0"}, 400);
        $('#multipleConfigFooter').css('pointer-events', 'auto').css('opacity', '1');


        $('.content').css('pointer-events', 'auto').css('overflow', 'auto').css('opacity', 1);
        $('.tile').css('pointer-events', 'auto');
        $('.bredcombar').css('opacity', 1).css('pointer-events', 'auto');
        $('.searchinputtext ').css('opacity', 1).css('pointer-events', 'auto');
        menuShown = false;

    }


    $('#lookupMenu').toggle('blind', options, 300);


}

$(document).on('click', '.content', function () {
    if (menuShown == true) {
        toggleSlideLookup();
    }
});



var droppedDown = false;
var objDrop;
//the lookup dropdowns---------------------------------------------------------------------------//
$(document).on('click', '.drop-container', function () {
    if ($(this).find('.drop-down-container').css('display') == "none") {

        $(document).find('.drop-down-container').css('display', 'none');

        $(this).find('.drop-down-container').css('display', 'inline-block');


    }
    else {

        $(this).find('.drop-down-container').css('display', 'none');


    }
});

$(document).on('focus click' , '.lookup-value' , function(e){

        e.preventDefault();
        console.log($(this).parent().parent().find('.drop-down-container').css('display'));

        $(document).find('.drop-down-container').css('display', 'none');

        $(this).parent().parent().find('.drop-down-container').css('display', 'inline-block');

    $(document).find('.drop-down-container').css('display', 'none');

});

$(document).on('focus click' , '.lookup-property' , function(e){

    e.preventDefault();
    console.log($(this).parent().parent().find('.drop-down-container').css('display'));

    $(document).find('.drop-down-container').css('display', 'none');

    $(this).parent().parent().find('.drop-down-container').css('display', 'inline-block');

    $(document).find('.drop-down-container').css('display', 'none');

});



$(document).mouseup(function (e) {
    var container = $(document).find('.drop-container');

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(this).find('.drop-down-container').css('display', 'none');
    }
});

//--------end of lookup dropdowns-------------------------//


$(document).on('click', '.btn-plus', function () {

    $(this).animate({height: "0px"}, 300);
    $(this).children().hide();
    $(this).parent().find('.and-or-btn').css('display', 'block');

});

$(document).on('focus', ':text', function () {
    $(this).one('mouseup', function (event) {
        event.preventDefault();
    }).select();

});
