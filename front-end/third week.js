const randomNum = (min, max) => {
    return  Math.floor(Math.random() * (max - min) + min)
  }
  
  
  const res1 = []
  
  for(let i = 0; i < 10; i++){
    res1.push(randomNum(-10 10))
  }
  
  const res2 = []
  
  for(let i = 0; i < res1.length; i++) {
    if(!res2.includes(res1[i])) res2.push(res1[i])
  }

  const res3 = {}

  for(var i = 0; i < res1.length; i++) {
    if(!res3[`${res1[I]}`]) res3[`${res1[I]}`] = 1
    else res3[`${res1[I]}`]  =  res3[`${res1[I]}`] + 1
  }


  console.log(res3)
