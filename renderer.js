    var num = 100; // 声明遍历num 为气球的数量 
    var grade = 1; //难度级别
    var score = 0; //分数
    //var oBody = document.querySelector('body');  //h5 api 获取元素的方法
    var oBody=document.documentElement || document.body; //body获取兼容性写法

    var wW=window.innerWidth;  //获取浏览器窗口的宽度
    var wH=window.innerHeight; //获取浏览器窗口高度
    var timer=null;            //初始化定时器变量
   
    function init(num){ 
　　     timer = setTimeout(function(){
                num--;
                if(num>0){ 
                     var randomL=Math.random()*wW;        // 随机left范围
                     randomL=Math.min(wW-160,randomL); //规范left位置
                     var balloon = document.createElement('div'); //用js生成标签
                     var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
                     var result = String.fromCharCode(65+ranNum);//转成字母（A-Z）
                     balloon.innerHTML = '<div id='+result.toString()+' class="letter">'+result.toString()+'</div>';
                     balloon.className='balloon'; //给创建的div元素设置类名
                     balloon.style.left=randomL+'px'; //改变元素的样式中的left的值
                     balloon.style.top=wH+20+'px';
                     oBody.appendChild(balloon); //body中添加 元素对象
                     grade=2; //速度减慢
                     init(num)
                     
                }
                else {
                    endGame();
                    $('.balloon').remove();
                }
         },grade*1000); 
    } 

    function endGame(){
        clearTimeout(timer) 
        timer=null 
        grade=1
        $('#actionBtn').html('再来一局');
        $('#score').html(score);
    }
   
    $('#actionBtn').click(function(){ 
        if(timer==null){
            $('#actionBtn').html('开始'); 
            score = 0;
            $('#score').html(0);
            init(num)
        }
    })
    $('#endBtn').click(function(){
        endGame();
        $('.balloon').remove();
    })
    

	$(window).keydown(function (e) {
	    key = e.keyCode ? e.keyCode : e.which;
	    $('.key.c' + key).addClass('keydown');
	   // console.log(key);
	});
	$(window).keyup(function (e) {
	    key = e.keyCode ? e.keyCode : e.which;
		$('.key.c' + key).removeClass('keydown');
        var ele = document.getElementById( String.fromCharCode(key));
        if(ele&&ele.parentNode){ 
            score++
            ele.parentNode.parentNode.removeChild(ele.parentNode);
        }
	});