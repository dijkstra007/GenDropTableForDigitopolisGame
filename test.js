n = 3
s = []
function play(index){
    if(index==n){
      for(let i = 0 ;i< n ;i++){
        process.stdout.write(s[i] + ' ')
      }
      console.log()
    }
    else{
        s[index] = 3;
        play(index+1)
        s[index] = 4
        play(index+1)
        s[index]= 5
        play(index+1)
    }
    
}

play(0)
