window.onload=function (){
    var  container =document.getElementById('container');
    var list=document.getElementById('list');
    var buttons=document.getElementById('buttons').getElementsByTagName('span');
    var prev=document.getElementById('prev');
    var next=document.getElementById('next');
    var index=1;
    function showButton(){
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className==='on'){
                buttons[i].className='';
                break;
            }
        }
        buttons[index-1].className='on';
    }
    function animate(offset){
        var newLeft=parseInt(list.style.left)+offset;
        var time=300;
        var interval=10;
        var speed=offset/(time/interval);


        function go(){
            if((speed<0 && parseInt(list.style.left)>newLeft) || (speed >0&&parseInt(list.style.left)<newLeft)){
                list.style.left=parseInt(list.style.left)+speed+'px';
                setTimeout(go,interval);
            }
            else{

                list.style.left=newLeft+'px';
                if(newLeft> -1000){
                    list.style.left = -2640 + 'px';
                }
                if(newLeft< -3000){
                    list.style.left = -880 + 'px';
                }
            }
        }

        go();

    }
    next.onclick=function (){
        if(index===3){
            index=1;
        }
        else{
            index +=1;
        }

        showButton();
        animate(-900);
    };
    prev.onclick=function (){
        if(index===1){
            index=3;
        }
        else{
            index -= 1;
        }

        showButton();
        animate(900);
    };

    for(var i=0;i<buttons.length;i++){
        buttons[i].onclick=function (){
            if(this.className==='on'){
                return;
            }

            var myIndex=parseInt(this.getAttribute('index'));
            var offset=-880 *(myIndex -index);
            animate(offset);
            index=myIndex;
            showButton();
        }
    }


};