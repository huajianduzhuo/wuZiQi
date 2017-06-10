/**
 * Created by yujin on 2017/6/7.
 */
var circolor = 'black';

window.onload = function () {
    show();
    var cancel = document.getElementById('cancel');
    bind(cancel, 'click', cancelLast);
};
function show() {
    var main = document.getElementById('main');
    var square = document.getElementById('square');
    var circle_data = document.getElementById('circle');
    var mainwidth = main.clientWidth;
    var mainheight = main.clientHeight;
    // 棋盘每一个方格的宽高为20px，棋盘宽度高度除以20，得到棋盘列数和行数
    var rownum = mainwidth / 20;
    var colnum = mainheight / 20;
    for(var i=0; i<rownum; i++){
        for(var j=0; j<colnum; j++){
            // i和j小于10，前面拼接0，方便之后截取id得到坐标值
            var is = i >= 10 ? i : ('0' + i);
            var js = j >= 10 ? j : ('0' + j);
            // TODO 添加方格
            var newsquare = square.cloneNode(true);
            newsquare.id = 's' + is + js;
            newsquare.style.display = 'block';
            // TODO 添加圆点
            if(j < colnum-1 && i < rownum-1){
                var circle = circle_data.cloneNode(true);
                circle.id = 'cir' + is + js;
                circle.style.display = 'block';
                newsquare.appendChild(circle);
            }
            main.appendChild(newsquare);
        }
    }
    /*
        TODO 通过事件委托，为棋盘绑定事件，通过id判断点击target是否为棋子
     */
    var main = document.getElementById('main');
    bind(main, 'click', showCircle);
    function showCircle(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        var id = target.id;
        // TODO 显示圆点
        if(id.indexOf('cir') >= 0 && target.style.opacity == 0){
            target.style.opacity = 100;
            target.style.backgroundColor = circolor;
            if(circolor == 'black'){
                circolor = 'red';
            }else {
                circolor = 'black';
            }
            // TODO 将圆点添加到数组 -- 二维数组，分别表示行列
            var m = parseInt(id.substring(3,5));
            var n = parseInt(id.substring(5));
            selected[m] = selected[m] ? selected[m] : [];
            selected[m][n] = target;
            // TODO 将圆点id添加到下棋顺序数组
            chessOrder.push(target.id);
        }

        // TODO 检查是否赢
        var count = rowCheck(target, m) || colCheck(target, n) || slantRCheck(target, m, n) || slantLCheck(target, m, n, colnum-2);
        if (count >= 5){
            var succolor = target.style.backgroundColor;
            success( succolor);
        }
    }

    function success( color) {
        var main = document.getElementById('main');
        var tip;
        if(color == 'red'){
            tip = '红棋';
        }else{
            tip = '黑棋';
        }
        setTimeout(function () {
            if(confirm(tip + '赢了，再来一局？')){
                window.location.reload();
            }else{
                main.removeEventListener('click', showCircle);
            }
        }, 200);
    }
}

function cancelLast() {
    var lastId = chessOrder.pop();
    if(lastId){
        var last = document.getElementById(lastId);
        last.style.opacity = 0;
        circolor = circolor == 'black' ? 'red' : 'black';
    }
}


