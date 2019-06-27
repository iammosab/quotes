
$(document).ready(function(){
    if(document.location.pathname.includes("/login.html")){
        if(readCookie("user")!="" && sessionExists(readCookie("user")))
            location.href="panel.html";
        else{
            $("#connect").click(()=>{
                $("#login").css("border","");
                $("#password").css("border","");
                //alert("You clicked here");
                //alert("Fields must be filled");
                if($("#login").val() == "" || $("#password").val() == ""){
                    if($("#login").val() == "")
                        $("#login").css("border","1px solid red");
                    if ( $("#password").val() == "")
                        $("#password").css("border","1px solid red");
                }
                else{
                    $.ajax({
                        url: "https://script.google.com/macros/s/AKfycbxSdIL7044KN2h6dWeHLMZdz9nXfNkurrNbacR93LxkmQf9i2w/exec", 
                        type:"POST",
                        data:{action:"accountExists",login:$("#login").val(),password: $("#password").val()},
                        success: function(result){
                            if(result != "")
                                {
                                    writeCookie("user",result,2);
                                    location.href="panel.html";
                                }
                            else{
                                alert("Login or Password invalid");
                            }
                                
                        }            
                    
                    });
                }
            });
        }  
    }else if (document.location.pathname == "quotes/" || document.location.pathname.includes("/index.html"){
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbwrn62-lhHReM5eZxnBDfThO5DPmb0mllq_XSQP0TRA3eI-cWnR/exec", 
            type:"POST",
            data:{action:"readQuotes"},
            success: function(result){
                result.forEach(e => {
                    makeQuote(e.quote,e.authorName,e.authorImage);
                });

                $(".copy").click(function(){
                    var text = $(this).closest(".item").find(".bodyQuote")[0].innerText;
                    copyStringToClipboard(text);
                });
                $("main").css("justify-content", "space-around");
                $(".loadingSection").css("display","none");
                $(".Quotes").css("display","block");
            }            
        
        });
    }

    function copyStringToClipboard (str) {
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    function sessionExists(text){
        var r = false;
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxSdIL7044KN2h6dWeHLMZdz9nXfNkurrNbacR93LxkmQf9i2w/exec", 
            type:"POST",
            data:{action:"sessionExists",token:text},
            async:false,
            success: function(result){
                if(result == 1)
                    r = true;   
            }
        });
        return r;
    }

    function writeCookie(name,value,days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires=" + date.toGMTString();
                }else{
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    
    function readCookie(name) {
        var i, c, ca, nameEQ = name + "=";
        ca = document.cookie.split(';');
        for(i=0;i < ca.length;i++) {
            c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return '';
    }
    
    function makeQuote(quote,authorName,authorImage){
        var Quotes = $(".Quotes");
        var template = '<div class="item"><div class="bodyQuote"><span>'+quote+'</span></div><div class="footerQuote"><div class="authorSection">';
        template += '<img class="authorImg" src="'+authorImage+'"/><b class="authorName">'+authorName+'</b></div><div class="options">';
        template += '<img class="copy" src="images/copy.svg" width="24px" height="24px" style="margin-right: 10px;cursor: pointer;"alt="copy" title="Copy this quote" /></div></div></div>';
        Quotes.append(template);
    }

   /* $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwrn62-lhHReM5eZxnBDfThO5DPmb0mllq_XSQP0TRA3eI-cWnR/exec", 
        type:"POST",
        data:{action:"readQuotes"},
        success: function(result){
            var table = "<table><thead><th>ID</th><th>Quote</th><th>Author</th><th>Categorie</th></thead><tbody>";
            var text = "";
            result.forEach(element => {
                text +="<tr>";
                text +="<th>"+element.id+"</th>";
                text +="<td>"+element.quote+"</td>";
                text +="<td>"+element.author+"</td>";
                text +="<td>"+element.categorie+"</td>";
                text +="</tr>";
            });
            table+=text+ "</tbody></table>";
            $("main").html(table);
      }});*/

  });