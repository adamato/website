//var numRand = Math.floor(Math.random()*101)


// function randomMargin(){
//     $('.thumbnail').each(function(){
//         randomizeObject(this);
        
//     });

// }

// function randomizeObject(el){
//     var randomnumber1=Math.floor(Math.random()*101);
//     console.log(randomnumber1);
//     var randomnumber2=Math.floor(Math.random()*101);
//     console.log(randomnumber2);
//     $(el).css({"margin-top": randomnumber1+"px", "margin-left": randomnumber2+"px"});
// }


function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
}

function animateDiv(){
    var newq = makeNewPosition();
    
    $('.square').animate({ top: newq[0], left: newq[1] }, 1000, function(){
      animateDiv();        
    });
    
}

