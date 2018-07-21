//function (){
var timer;
var bi_jiao;
var qq = 1;
var  num  =1;
var xxx =0;
var kong_zhi =2;
//var yyy;//}
var xxx_dui_shou=0;
var zong_cheng_ji=0;



function you_xi_kai_shi_1() {
    kong_zhi++;
    kong_zhi=kong_zhi % 2;

    you_xi_kai_shi_2();

}
function you_xi_kai_shi_2() {


   // var innerHTML;
    if (kong_zhi === 1) {                     //开始

        num = Math.floor(Math.random() * 3);
        start();
        document.getElementById("start_game_2").innerHTML = "结束游戏";
        //document.getElementById("yyy").innerHTML="yyy:"+yyy+"kong_zhi:"+kong_zhi +"timer:"+timer+"bi_jiao:"+bi_jiao+"num:"+num;

    } else {                                //结束

        stop();
        switch(bi_jiao)
        {
            case 1:
                document.getElementById("bi_jao_de_shu_zhi").innerHTML = "你出了：石头";
                break;
            case 2:
                document.getElementById("bi_jao_de_shu_zhi").innerHTML = "你出了：布";
                break;
            default:
                document.getElementById("bi_jao_de_shu_zhi").innerHTML = "你出了：剪刀";
        }



        if (bi_jiao===num+1||bi_jiao===0&&num===2) {
            xxx++;
            zong_cheng_ji++;
        }else if (num===bi_jiao+1||num===0&&bi_jiao===2){
            xxx_dui_shou++;
            zong_cheng_ji--;

        }



        if (zong_cheng_ji>0){
            document.getElementById("zong_cheng_ji").style.color="green";
        }else if (zong_cheng_ji===0){
            document.getElementById("zong_cheng_ji").style.color="orange";
        }else {
            document.getElementById("zong_cheng_ji").style.color="red";

        }
        document.getElementById("fen_zhi").innerHTML = "你的分值为：" + xxx;
        document.getElementById("dui_shou_fen_zhi").innerHTML = "对方的分值为：" + xxx_dui_shou;
        document.getElementById("zong_cheng_ji").innerHTML = "总成绩为：" + zong_cheng_ji;
        document.getElementById("start_game_2").innerHTML = "开始游戏";
        show_confirm();


    }

}


function stop() {
    clearInterval(timer);
}
function start (){
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    qq=1;
    function animate(offset) {
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        //无限滚动判断
        if (newLeft > -256) {
            list.style.left = -768 + 'px';     //与箭头有关
        }
        if (newLeft < -768) {
            list.style.left = -256 + 'px';
        }
    }



    function play() {
        timer = setInterval(function () {
            next.onclick();
            jia_fa()
        }, 100)
    }


    function jia_fa() {
        qq++;
        bi_jiao=qq % 3;
    }



    function buttonsShow() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className === "on") {
                buttons[i].className = "";
            }
        }
        buttons[index - 1].className = "on";
    }



    prev.onclick = function () {
        index -= 1;

        if (index < 1) {
            index = 3
        }
        buttonsShow();
        animate(256);
    };



    next.onclick = function () {
        index += 1;
        if (index > 3) {
            index = 1
        }
        animate(-256);
        buttonsShow();
    };



    for (var i = 0; i < buttons.length; i++) {
        (function (i) {
            buttons[i].onclick = function () {
                /*  这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                /*  由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                var clickIndex = parseInt(this.getAttribute('index'));
                var offset = 256 * (index - clickIndex); //这个index是当前图片停留时的index
                animate(offset);
                index = clickIndex; //存放鼠标点击后的位置，用于小圆点的正常显示
                buttonsShow();
            }
        })(i)
    }

    //container.onmouseover = stop;
    //container.onmouseout = play;
    play();
    switch(num)
    {
        case 1:
            document.getElementById("dui_shou").innerHTML='<img src="picture/rock.png" width="256">';
            document.getElementById("dui_shou_de_jie_guo").innerHTML="对方出了：石头";
            break;
        case 2:
            document.getElementById("dui_shou").innerHTML='<img src="picture/paper.png" width="256">';
            document.getElementById("dui_shou_de_jie_guo").innerHTML="对方出了：布";
            break;
        default:
            document.getElementById("dui_shou").innerHTML='<img src="picture/scissors.png" width="256">';
            document.getElementById("dui_shou_de_jie_guo").innerHTML="对方出了：剪刀";
    }
}
/*function show_confirm()
{

    if (num === 0)
    {
        switch (bi_jiao){
            case 1:
                alert("对方出了剪刀；" + '\n' +"你出了石头;" + '\n' +"这局你赢了！");
                break;
            case 2:
                alert("对方出了剪刀；" + '\n' +"你出了布;" + '\n' +"这局你输了！");
                break;
            default:
                alert("对方出了剪刀；" + '\n' +"你出了剪刀;" + '\n' +"这局平局！");
        }
    }
    else if (num === 1)
    {
        switch (bi_jiao){
            case 1:
                alert("对方出了石头；" + '\n' +"你出了石头;" + '\n' +"这局平局！");
                break;
            case 2:
                alert("对方出了石头；" + '\n' +"你出了布;" + '\n' +"这局你赢了！");
                break;
            default:
                alert("对方出了石头；" + '\n' +"你出了剪刀;" + '\n' +"这局你输了！");
        }
    }
else
    {
        switch (bi_jiao){
            case 1:
                alert("对方出了布；" + '\n' +"你出了石头;" + '\n' +"这局你输了！");
                break;
            case 2:
                alert("对方出了布；" + '\n' +"你出了布;" + '\n' +"这局平局！");
                break;
            default:
                alert("对方出了布；" + '\n' +"你出了剪刀;" + '\n' +"这局你赢了！");
        }
    }
}
*/