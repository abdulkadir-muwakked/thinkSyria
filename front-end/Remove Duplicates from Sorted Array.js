// mohammed 
const removeDuplicates = function (arr) {
    const res = []
    var isDuplicated = false
    for(var i = 0; i < arr.length; i++) {
        isDuplicated = false //re-init
        for(var j = 0; j < res.length; j++){
            if(arr[i] == res[j]) isDuplicated = true
        }
        if(!isDuplicated) {
            res.push(arr[i])
        }
    }
    console.log(res)
}

const arr = [0,0,1,1,1,2,2,3,3,4]
removeDuplicates(arr)


// ubaeide

const removeDuplicates = function (arr) {

    var isDuplicated = false
    for(var i = 0; i < arr.length; i++) {
        for(var j = i+1; j < arr.length; j++){
            if(arr[i] == arr[j]) arr[j] = "_"
        }
    }
    console.log(arr.sort())
    /* farah
    const res = []
    for(var i = 0; i < arr.length ;i++){
        if(arr[i] != "_") res.push(arr[i])
    }
    console.log(res)
    */
}


// meis
const removeDuplicates = function (arr) {
    const resArr = []
    for(var i = 0; i < arr.length; i++){
        if(!resArr.includes(arr[i])) resArr.push(arr[i])
    }    
    console.log(resArr)
}


const removeDuplicates = function (arr) {
    const resArr = []
    for(var i = 0; i < arr.length-1; i++) {
        if(arr[i] != arr[i+1]) resArr.push(arr[i])
    }    
    console.log(resArr)
}





var arr = [0, 1, 1, 2, 2, 3, 3, 4, 5];
var resArr = [];


const removeDuplicates = function (arr) {
  const resArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (!resArr.includes(arr[i])) resArr.push(arr[i]);
  }
  return resArr;
};

const resArr = [];
arr.map((item) => {
  if (!resArr.includes(item)) 
  resArr.push(item);
});

console.log(resArr);






