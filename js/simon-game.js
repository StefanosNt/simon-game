$(document).ready(function(){
  var b1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var b2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var b3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var b4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');  
  var round , startFlag = 0 , score = 0 , topScore = 20 , counter = 0 , strict = 0 , arr = [] , clicks = [] ;  
  
  function tonePlay(tone){
    switch(tone){ 
      case 1: b1.play(); break;
      case 2: b2.play(); break;      
      case 3: b3.play(); break;
      case 4: b4.play(); break;
    }
  }
  function gameIndication(txt){
    $("#msg").text(txt); 
    $("#msg").css("display","block");
    $("#simon").css("opacity",0.7);
    setTimeout(function(){    
      $("#msg").css("display","none");  
      $("#simon").css("opacity",1);
    },1000);  
  } 
  
  function rand(){ 
    var point = Math.floor(Math.random() * 4) + 1 ;
    return point;
  }
  
  function game(round) {
    if (round <= 0) return;
    setTimeout(function(){
      var rnd = rand();
      arr.push("b" + rnd);   
      $("#b"+rnd).animate({"opacity": "0.5"}, 200).delay(100).animate({"opacity": "1"}, 200);   
      tonePlay(rnd);
      // console.log(arr);
      game(--round);
    }, 1000);
  }
  
  function reset(){
    round=1; score=0; counter=0; arr=[]; clicks=[]; 
    $("#score").text("0");
    gameIndication("RESETTING SCORE");
    game(round);
  }
  
  function replay(arr,length){
    if (length <= 0) return;
    setTimeout(function(){   
      $("#"+arr[arr.length-length]).animate({"opacity": "0.5"}, 200).delay(100).animate({"opacity": "1"}, 200);   
      tonePlay(eval(arr[arr.length-length].charAt(1)));
      replay(arr,--length);
    }, 1000);
  }

  
  $("#reset").click(reset);
   
  $(window).click(function(){
    if(startFlag==0){
      $("#msg").css("display","none"); 
      startFlag=1; round=1; 
      game(round);
    } 
    // console.log(clicks.length,arr.length);
  });
  
  $("#strict").click(function(){
    if(strict===0 && startFlag===1){ 
      strict=1;
      reset();
      gameIndication("STRICT MODE ON");
      $("#cbar").css("background","#5FF72D");
    }
    else if(strict===1 && startFlag===1){
      strict=0;
      reset();
      gameIndication("STRICT MODE OFF");
      $("#cbar").css("background","red");
    }
  })
  
  $("#body").click(function(e){    
    var id = e.target.id; 
    
    if(startFlag===1){
      clicks.push(id);
      tonePlay(eval(id.charAt(1)));   
      // console.log(clicks);
    }
    
    if(clicks.length===arr.length){
      
      for(var i = 0; i<arr.length; i++){
        if(arr[i]==clicks[i]){  
          counter++;
          // console.log(clicks[i],arr[i],arr.length,counter); 
        }  
      }
      
      if(counter===arr.length){  
        score++; round++;
        $("#score").text(score); 
        
        if(score===topScore){ 
          $("#reset").css("pointer-events","none"); 
          $("#strict").css("pointer-events","none");  
          $("#msg").text("YOU WON!!!REFRESH TO RESTART...."); 
          $("#msg").css("display","block");
          $("#simon").css("opacity","0.2"); 
          return;
        }else{
          gameIndication("YAY!");
        }
        
        game(round);
        arr=[]; clicks=[]; counter=0; 
      }else{ 
        gameIndication("TRY AGAIN");
        if(strict===0){
          replay(arr,arr.length);
          counter=0; clicks=[];
        }else{
          counter=0; clicks=[]; arr=[]; 
          game(round);
        } 
      }
    } 
  });
  
  $("#b1").hover(function(){$("#b1").css("opacity","0.7");},function(){$("#b1").css("opacity","1");})
  $("#b2").hover(function(){$("#b2").css("opacity","0.7");},function(){$("#b2").css("opacity","1");})
  $("#b3").hover(function(){$("#b3").css("opacity","0.7");},function(){$("#b3").css("opacity","1");})
  $("#b4").hover(function(){$("#b4").css("opacity","0.7");},function(){$("#b4").css("opacity","1");})
  
});