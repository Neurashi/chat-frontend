$(document).ready(function () {


    /************************/
    // MODAL
    /************************/
    $('[data-modal-btn]').click(function () {
        var gt_vl = $(this).attr('data-modal-btn');
        $('.modal[data-modal="' + gt_vl + '"]').fadeIn(300);
    });
    $('[data-modal] .modal__close_btn , [data-modal] .modal__bg').click(function () {
        $(this).parents('[data-modal]').fadeOut(300);
    });
    /************************/
    // TAB SWITCH
    /************************/
    $('[data-tab-item]').click(function () {
        var gt_vl = $(this).attr('data-tab-item');
        $(this).addClass('active').siblings('[data-tab-item]').removeClass('active');
        $('[data-tab-show]').hide();
        $('[data-tab-show="' + gt_vl + '"]').fadeIn(200);
    });
    /************************/
    // GO TO TOP
    /************************/

    $('.go_to_top').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 2000);
    });
    /************************/
    // LANGUAGE
    /************************/

    $('[data-language]').click(function () {
        $(this).find('.sub_menu').toggleClass('active');
    });
    $('body').click(function (e) {
        if (!$(e.target).is('[data-language]') && !$(e.target).is('[data-language] *')) {
            $('[data-language]').find('.sub_menu').removeClass('active');
        }
    });//body click
    /************************/
    // responsive header
    /************************/
    $('.header--responsive .header_btn').on('click', function () {
        $('.header--responsive .header__sidebar').addClass('active');
    });
    $('.header--responsive .close_btn').on('click', function () {
        $('.header--responsive .header__sidebar').removeClass('active');
    });






    /************************/
    // Index Js added here
    /************************/



    $('.modal__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: false,
        asNavFor: '.modal__slider__step',
        nextArrow: '<button type="button" class="slick-btn slick-next"><i class="i i-Systemsarrow-right-line"></i></button>',
        prevArrow: '<button type="button" class="slick-btn slick-prev"><i class="i i-Systemsarrow-left-line"></i></button>'
    });
    $('.modal__slider__step').slick({
        slidesToScroll: 1,
        asNavFor: '.modal__slider',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true,
        infinite: false,
        arrows: false,
    });


    $('[data-modal-btn]').on('click', function () {
        var get_val = $(this).attr('data-modal-btn');
        $('.modal').attr('data-open', get_val).show();
    });

    $('.modal__close_btn').click(function () {
        $('.modal').hide();
    });

    ////////// gallery loading
    $('.loading_box').on('click', function () {
        var $this = $(this);
        var act = $(this).hasClass('active');

        if (act) {
            $this.removeClass('active');
        } else {
            $this.addClass('active');
        }

    });

    $(document).on("click", "[data-btn='deletePreview']", function () {
        handleDeleteSendImageMessageClick()
    });

    ///////// register modal
    $('.register__close_bg').on('click', function () {
        $(this).parents('.register').removeClass('active')
    });

    $(document).on("click", "[data-btn='chatNow']", function () {
        $('.register').removeClass('active');
    });

    $(document).on("click", "[data-btn='register']", function () {
        activeRegisterForm()
        $('.register').addClass('active');
    });

    $(document).on("click", "[data-btn='login']", function () {
        activeLoginForm()
        $('.register').addClass('active');
    });

    $(document).on("click", "[data-btn='registerLogin']", function () {
        $('.register').addClass('active');
    });

    ////////// open header menu
    $('.main_menu__close_btn').click(function () {
        $('.main_menu').fadeOut(300);
    });
    $('[data-btn="main_menu"]').click(function () {
        $('.main_menu').fadeIn(300);
    });

    let firstTime = true;
    var chatpreviousStyles;
    var chat__inputpreviousStyles;
    var chatactivepreviousStyles;
    var chatmessageBoxpreviousStyles;
    var chatmesageboxwrappreviousStyles;
    var chatmsgitemrobotpreviousStyles;
    ////////////// chat animation
    $('.chat__input').on('click', function () {
        $(this).parents('.chat').addClass('active');
        //! EDITED
        if (window.matchMedia("(max-width: 573px)").matches) {
            document.querySelector("body").style.overflow = "hidden";
            document.querySelector("body").style.position = "fixed";
        }
        $('.bg_motion').addClass('active');
        if (window.innerWidth < 573) {
            //unfocus input
            if (firstTime) {
                $('#inputMessage').trigger('blur');
                firstTime = false;
            }


            chatpreviousStyles = $('.chat').attr('style');
            chat__inputpreviousStyles = $('.chat__input').attr('style');
            chatactivepreviousStyles = $('.chat.active').attr('style');
            chatmessageBoxpreviousStyles = $('.chat.active .chat__massage_box').attr('style');
            chatmesageboxwrappreviousStyles = $('.chat.active .chat__massage_box .wrap').attr('style');
            chatmsgitemrobotpreviousStyles = $('.chat.active .chat__massage_box .chat__msg_item--robot, .chat.active .chat__massage_box .chat__msg_item--client').attr('style');

            $('.chat').css({ 'position': 'fixed', 'top': '52px', 'height': '100vh !important', 'right': '0', 'left': '0', 'margin': '0 !important', 'border-top': 'solid 1px transparent', 'border-radius': '0 !important', 'box-shadow': '0 0 100px 60px rgba(0, 0, 0, 0)' });
            $('.chat.active').css({ 'border': 'solid 1px rgba(225, 225, 225, 0.05)', 'box-shadow': '0 0 100px 60px rgba(0, 0, 0, 0.93)' });
            $('.chat.active .chat__massage_box').css({ 'position': 'absolute', 'left': '0', 'top': '4px', 'bottom': '80px', 'padding-bottom': '16px', 'right': '0', 'height': 'auto' });
            $('.chat.active .chat__massage_box .wrap').css({ 'padding': '8px' });
            $('.chat.active .chat__massage_box .chat__msg_item--robot, .chat.active .chat__massage_box .chat__msg_item--client').css({ 'max-width': 'calc(100% - 16px)' });
            $('.chat__input').css({ 'background': '#0D0A0B', 'position': 'fixed', 'z-index': '3', 'bottom': '0', 'right': '0', 'left': '0', 'width': 'auto', 'border-radius': '0' });



        }

    });
    // om resize bigger than 573 remove active classes
    $('[data-btn="close_chat"]').on('click', function () {
        $('.chat').removeClass('active');
        $('.bg_motion').removeClass('active');
        //! EDITED
        if (window.matchMedia("(max-width: 573px)").matches) {
            document.querySelector("body").style.overflow = "initial";
            document.querySelector("body").style.position = "relative";
        }
        if (window.innerWidth < 573) {
            //remove inline styles
            window.location.reload();
        }

    });

    /////////// chat scrolling
    $('#sendButton').on('click', function () {

        var div = $('.chat__massage_box');
        div.stop(true, false).animate({ scrollTop: div.prop('scrollHeight') }, 200);
        $('#inputMessage').trigger('focus');


    });
    $('body').keydown(function (event) {
        if (event.keyCode == '13') {

            $('#sendButton').trigger('click');
        }
    });
    //////////// Responsive body when keyboard enable
    $('.chat__input input[type="text"]').on('focus', function () {
        $('body').addClass('keyboard_on');
    });
    $('.chat__input input[type="text"]').on('blur', function () {
        $('body').removeClass('keyboard_on');
        chatContainer.style.paddingBottom = '0px';
    });

    ////////// alert massage

    $(document).on("click", ".error_box__close_btn", function () {
        $(this).parents('.error_box').css("visibility", "hidden");
    });

    ///////// History
    $('.chat__history__header .close').click(function () {
        $('.chat__history').removeClass('active');
    });
    $('[data-btn="history"]').on('click', function () {
        $('.chat__history').addClass('active');
    });
});

let lastClickedElem = document.getElementById('model_active');
function createBotMessagewelcome(message, imageSrc) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat__msg_item', 'chat__msg_item--robot','chat__msg_switch_message');
    const robotInfo = document.createElement('div');
    robotInfo.classList.add('robot_info', 'd-flex', 'flex-column', 'flex-x-between', 'flex-y-center');
    const robotPic = document.createElement('div');
    robotPic.classList.add('robot_info--pic');
    const robotImage = document.createElement('img');
    robotImage.setAttribute('src', 'img/logo/w-logo-small.png');
    robotImage.setAttribute('alt', '');
    const languageSpan = document.createElement('span');
    robotPic.appendChild(robotImage);
    robotPic.appendChild(languageSpan);
    robotInfo.appendChild(robotPic);
    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    wrap.appendChild(messageParagraph);
    if (imageSrc) {
        const image = document.createElement('img');
        image.setAttribute('src', imageSrc);
        image.setAttribute('alt', '');
        wrap.appendChild(image);
    }
    messageElement.appendChild(robotInfo);
    messageElement.appendChild(wrap);
    return messageElement;
}
function changeWelcomemessage(text){
    const token = getData(TOKEN)
        
        let massageBoxElement2 = document.getElementById('chatContainer');
        
        let lastElement = massageBoxElement2.lastChild;
        if (lastElement.nodeType == 3) {
            lastElement = massageBoxElement2.lastChild.previousSibling;
        }
    if (token) {
        if (lastElement && (!lastElement.classList.contains('chat__msg_switch_message'))) {
        
            appendMessage(createBotMessagewelcome(text, ''))
        }
        if (lastElement && (lastElement.classList.contains('chat__msg_switch_message'))) {
            lastElement.querySelector('p').textContent = text
        }

        }
}
function changeBackgroundColor(element) {
    // check if there is a lastClickedElem and revert its background color
    if (lastClickedElem) {
        lastClickedElem.style.backgroundColor = '';
        lastClickedElem.style.color = '';
        lastClickedElem.id = '';
    }

    // change background color of clicked element
    element.style.backgroundColor = 'rgba(204, 204, 204, 0.5)';


    element.style.color = '#333';


    element.id = 'model_active';
    // update lastClickedElem
    lastClickedElem = element;
    let robotinfo = document.getElementsByClassName('robot_info')[0];
    if (robotinfo) {
        let model = element.className.split(" ").at(-1)
        let note = robotinfo.parentNode.querySelector('.note');
        
  
   
        if (note) {
            if (model == "neurashi") {
                let weltext = "you are now talking to neurashi"
                changeWelcomemessage(weltext)
            note.textContent = `${model.toUpperCase()} is here! Please feel free to ask anything related to the neurashi project from me`;

            }
            else if (model == "yagami") {
                let weltext = "you are now talking to yagami"
                changeWelcomemessage(weltext)
            note.textContent = `${model.toUpperCase()} is Looking forward to connecting through our chat. Please feel free to ask any general question from me`;

            }
            else if (model == "shingeki") {
                let weltext = "you are now talking to shingeki"
                changeWelcomemessage(weltext)
            note.textContent = `Hi i am ${model.toUpperCase()}. Please feel free to ask any crypto related questions`;

            }
        }
        if (model == "neurashi") {
            let weltext = "you are now talking to neurashi"
            changeWelcomemessage(weltext)

        }
        else if (model == "yagami") {
            let weltext = "you are now talking to yagami"
            changeWelcomemessage(weltext)

        }
        else if (model == "shingeki") {
            let weltext = "you are now talking to shingeki"
            changeWelcomemessage(weltext)

        }
    }
}
// let initialInnerHeight = window.innerHeight;

// const chatInput = document.getElementById("inputMessage");
// const chatContainer = document.getElementsByClassName('chat__input')[0];
