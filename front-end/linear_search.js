function indexOf(val, arr) {
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == val) return i
    }
    return -1
}


var arr = [4, 1, 10, 2, 5]

console.log(indexOf(10, arr))