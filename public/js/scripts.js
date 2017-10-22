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
            }

            getBotResponse(message);
                    
            $('.chat-input-field').val('');
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

function getEmbededVideo(videoURL){
    return '<iframe width="150" height="100" src='+ videoURL.replace("watch?v=", "embed/") +' frameborder="0" allowfullscreen></iframe>';
}

function getBotResponse(input){
    var accessToken = "c687bc93a2734abcacecf4fa5fa2f0ba";
    var baseUrl = "https://api.api.ai/api/";
    
    var botAns = "";
    var embedVideo = "";
    var vidList = [];
    
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: input, lang: "en", sessionId: "somerandomthing" }),
        success: function(data) {
            botAns = data.result.fulfillment.speech;
            
            console.log(data);
            if (data.result.action === "video.play"){
                if(data.result.parameters.tag.length > 0){
                    var tag = data.result.parameters.tag;
                    getTagId(tag);
                }
                else if(data.result.parameters.organization.length > 0){
                    
                }
                else if(data.result.parameters.item.length > 0){

                }        

                
            }
            
            addChatMessage(botAns, false);
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            console.log(err);
            console.log(status);
            console.log(error);
        }
    }); 
}

function getVideoFromTag(tag){
    //var tagID = getTagId(tag);
    //console.log(tag);
    $.ajax({
        type: "GET",
        url: "https://api-stage.vokeapp.com/api/messenger/v1/items",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + "58098d33482e25580301c04271347713c98699daeeb9d91f32d5299e13f0f697"
        },
        data: {  
            tag_id: tag
        },
        success: function(data){
                vidList = data;       
                addChatMessage(getEmbededVideo(vidList.items[0].media.url),false);
        },
        error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err);
                console.log(status);
                console.log(error);
            }
    });
}

function getTagId(nameInputed){    
    $.ajax({
        type: "GET",
        url: "https://api-stage.vokeapp.com/api/messenger/v1/tags",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + "58098d33482e25580301c04271347713c98699daeeb9d91f32d5299e13f0f697"
        },
        success: function(data){
            var tagList = data.tags;
            console.log(data.tags);
            
            for(var i=0; i<tagList.length; i++){
                if(tagList[i].name === nameInputed){
                    getVideoFromTag(tagList[i].id);
                    return;
                }
            }


            return -1;
        },
        error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err);
                console.log(status);
                console.log(error);
        }
    });

}