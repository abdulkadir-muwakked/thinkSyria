
function isEven(x) {
    return x % 2 == 0
}

function isDivisibleBy3 (x){
    return x % 3 == 0
}



function averageValue (nums) {
    let sum = 0, count = 0
    for(var i = 0; i < nums.length; i++) {
        if(isEven(nums[i]) && isDivisibleBy3(nums[i])) {
            sum += nums[i]
            count++
        }
    }
    return Math.floor(count > 0 ?  sum / count :  0) 
}



let nums = [1, 3, 6, 10, 12, 15]  //output = 9

console.log(averageValue(nums))
