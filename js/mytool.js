/**
 * Created by yujin on 2017/6/7.
 */
var selected = [];
var chessOrder = [];

/*
    TODO 绑定事件兼容解决函数
 */
function bind(elem, eventName, callback) {
    if(elem.addEventListener){
        elem.addEventListener(eventName, callback, false);
    }else{
        elem.attachEvent('on'+eventName, callback);
    }
}

/*
    TODO 检查行
 */
function rowCheck(target, row) {
    var count = 0;
    for(var j=0; j<selected[row].length; j++){
        if(selected[row][j] && selected[row][j].style.backgroundColor == target.style.backgroundColor){
            count++;
        }else {
            count = 0;
        }
        if(count >= 5){
            break;
        }
    }
    return (count >= 5 ? count : 0);
}

/*
 TODO 检查列
 */
function colCheck(target, col) {
    var count = 0;
    for(var i=0; i<selected.length; i++){
        if(selected[i]){
            if(selected[i][col] && selected[i][col].style.backgroundColor == target.style.backgroundColor){
                count++;
            }else {
                count = 0;
            }
            if(count >= 5){
                break;
            }
        }
    }
    return (count >= 5 ? count : 0);
}

/*
    TODO 检查右斜线
 */
function slantRCheck(target, row, col) {
    var count = 0;
    var reduce = row < col ? row : col;
    row = row - reduce;
    col = col - reduce;
    for(var i=row; i<selected.length; i++){
        if(selected[i]){
            if(selected[i][col] && selected[i][col].style.backgroundColor == target.style.backgroundColor){
                count++;
            }else {
                count = 0;
            }
            if(count >= 5){
                break;
            }
        }
        col++;
    }
    return (count >= 5 ? count : 0);
}

/*
 TODO 检查左斜线
 */
function slantLCheck(target, row, col, colsum) {
    var count = 0;
    var reduce = row < colsum-col ? row : colsum-col;
    row = row - reduce;
    col = col + reduce;
    for(var i=row; i<selected.length; i++){
        if(selected[i]){
            if(selected[i][col] && selected[i][col].style.backgroundColor == target.style.backgroundColor){
                count++;
            }else {
                count = 0;
            }
            if(count >= 5){
                break;
            }
        }
        col--;
    }
    return (count >= 5 ? count : 0);
}