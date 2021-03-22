
    function pageLoaded() {
    
        var canvas = document.getElementById("game");
        var ctx = canvas.getContext("2d");

        var text = document.getElementById('text');
        var nbPartie = 0;
        var pointPlayer = document.getElementById('pointPlayer');
        var pointBots = document.getElementById('pointBots');

        // Images
        var bg = document.getElementById("bg");
        var playerDraw = document.getElementById("person1");
        var botsDraw = document.getElementById("person2");
        var seauVidePlayer = document.getElementById("seauvide");
        var seauVideBots = document.getElementById("seauvide");
        var umbrellaPlayer = document.getElementById("umbrellar");
        var umbrellaBots = document.getElementById("umbrellal"); 
        var seauEauPlayer = document.getElementById("seaueaur");
        var seauEauBots = document.getElementById("seaueaul");
        var sendBots = document.getElementById("lancer");
        var sendPlayer = document.getElementById("lancel");

       
        ctx.drawImage(bg, 0, -80); 
        ctx.drawImage(playerDraw, 0, 0, 200, 300, 200, 200, 200, 300); 
        ctx.drawImage(botsDraw, 0, 0, 200, 300, 800, 200, 200, 300); 
        ctx.drawImage(seauVidePlayer, 0, 0, 80, 123, 350, 390, 80, 123); 
        ctx.drawImage(seauVideBots, 0, 0, 80, 123, 770, 390, 80, 123); 


       
        // buttons 
        var load = document.getElementById("load");
        var send = document.getElementById("send");
        var protect = document.getElementById("protect");
        var confirm = document.getElementById("confirm");
        var play = document.getElementById("play");
        var allButtons = [load, send, protect, confirm];

        var player = "";
        var bots = "";
        var option = [];
        var pointsPlayer=0;
        var pointsBots=0;
        

        function PlayerObject() {
            this.water = false;
            this.play= "";
            this.win=false;
        }

        //begin - new game
        document.getElementById('play').addEventListener('click', function(){
            nbPartie++;
            text.innerHTML= "Party number " + nbPartie ;
            var addButton = [load, protect, play, confirm]; 
            player = new PlayerObject();
            bots = new PlayerObject();
            showbutton(addButton);
        });


       function showbutton(btnshow){
            allButtons.forEach(btn => {
                btn.classList.add("displaynone");
            });
            btnshow.forEach(elt => {
                elt.classList.toggle("displaynone");
            });     
       };

        send.addEventListener("click", function() {player.play ="send";});
        load.addEventListener("click", function() {player.play ="load";});
        protect.addEventListener("click", function() {player.play ="protect";});

        confirm.addEventListener("click", function(){
            botplay();
            draw();
            verif();
            nextRound();
        });
          
       
        function botplay(){

            if(bots.play=="load")bots.water=true;
            if(bots.play=="send")bots.water=false;

            if(bots.water){
                option = ['send','protect'];
            }else{
                option = ['load', 'protect'];
            }
            bots.play = option[getRandomInt(option.length)];
        }

        function draw(){

            ctx.drawImage(bg, 0, -80); 
            ctx.drawImage(playerDraw, 0, 0, 200, 300, 200, 200, 200, 300); 
            ctx.drawImage(botsDraw, 0, 0, 200, 300, 800, 200, 200, 300); 

            if(bots.play=="load"){
                ctx.drawImage(seauEauBots, 0, 0, 100, 150, 750, 390, 100, 150); 
            }else if(bots.play=="protect"){
                ctx.drawImage(umbrellaBots, 0, 0, 595, 420, 680, 200, 250, 250); 
            }else{
                ctx.drawImage(sendBots, 0, 0, 200, 150, 650, 300, 200, 150); 
            }

            if(player.play=="load"){
                ctx.drawImage(seauEauPlayer, 0, 0, 100, 150, 360, 390, 100, 150);  
            }else if(player.play=="protect"){
                ctx.drawImage(umbrellaPlayer, 0, 0, 595, 420, 280, 200, 250, 250); 
            }else{
                ctx.drawImage(sendPlayer, 0, 0, 200, 150, 360, 300, 200, 150);   
            }

            console.log("The player -> water: " + player.water + ", play: "+ player.play + ", win: " + player.win);
            console.log("The bots -> water: " + bots.water + ", play: "+ bots.play + ", win: " + bots.win);
    
        }

        function verif(){
            if(player.play=="send" && bots.play=="send"){
                console.log("egality");
            }else if(bots.play=="send" && player.play!="protect"){
                console.log("bots win");
                text.innerHTML="You loose";
                bots.win=true;
            }else if (player.play=="send" && bots.play!="protect"){
                console.log("player win");
                text.innerHTML="You win";
                player.win=true;
            }else{
                console.log('play again');
            }
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
          
        function nextRound(){

            if(player.win){
                pointsPlayer++;
                pointPlayer.innerHTML=pointsPlayer;
            }
            if(bots.win){
                pointsBots++;
                pointBots.innerHTML=pointsBots;
            }

            if(player.play=="send")player.water=false;
            if(player.play=="load")player.water=true;

            if(player.win||bots.win){
                var button = [play];
                showbutton(button);
            }
            else{
                if(player.water){
                    var button = [send, protect, confirm];
                    showbutton(button);
                }else{
                    var button = [load, protect, confirm];
                    showbutton(button);
                }
            }

            
        }
            
    
};