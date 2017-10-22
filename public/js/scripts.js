$(document).ready(function(){    
    $('.chat-popup').on('click', function(){
        $('.chat-popup').hide(300); 
        $('.chat-popdown').show(300);
        $('#chat-bot').show(300);
    });
    $('.chat-popdown, .chat-header-exit').on('click', function(){
        $('.chat-popup').show(300);
        $('.chat-popdown').hide(300);
        $('#chat-bot').hide(300);
    });
    $('.chat-input-field').keydown(function(event){
       var keycode = (event.keyCode ? event.keyCode : event.which);
	   
        if(keycode == '13'){
            var message = $('.chat-input-field').val();
        
            if(message.length > 0){
                addChatMessage(message, true);
                addChatMessage("Generic Response", false);
            }
            scrollContent();
	   }
    });
    $('#popup_gif').hover(function(){
        if($('#popup_gif').attr('src') != 'img/voke_popup_final.gif'){
            $('#popup_gif').attr('src', 'img/voke_popup.gif');
            setInterval(function(){ 
                $('#popup_gif').attr('src', 'img/voke_popup_final.gif');
            }, 3200);
        }
        else{
            $('#popup_gif').attr('src', 'img/voke_popup_final.gif');
        }
    }, function(){
        
    });
});
function addChatMessage(message, userInput){
    var chatField = $('#result');
    
    var chat = document.createElement('div');
    
    if(userInput){
        chat.setAttribute('class', 'user-request');
    }
    else{
        chat.setAttribute('class', 'server-response');
    }
    chat.innerHTML = message;
    
    chatField.append(chat);
}
function scrollContent(){
    $("#chat-scroll-area").animate({
        scrollTop: $('#chat-scroll-area')[0].scrollHeight - $('#chat-scroll-area')[0].clientHeight
    }, 300);
}
