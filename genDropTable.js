const GenItem  = require('./GenItem')

var multiplier = [0,5,10,20,50,100,200,500,1000]
var rewardTable = [0,250,500,1000,2500,5000,10000,25000,50000]
var numberOfWinning;
const RETURN_RATE = 90.0000000
const EPSILON = 0.0000001;
const MIN_BET_PER_LINE = 50;
const NUM_OF_POSSIBLE_COMBINATION = 1536
const cost = 1687.5


var sumProb = 0;
var item = []
var rewardSet = new Set();
var total_time = []
var sumOfTotaltime;



function caculateItemProb(){
  let sum = 0;
  for(i=1;i<item.length;i++)
  {
    sum+=item[i].getProbability();
  }
  return sum;
}
function printNewProbAndGetResult(){
  let sum=0;
  let sumProb=0;
  for(let i =1 ;i<item.length;i++){
      let aItem = item[i].getItem();
      let aReward = item[i].getReward();
      let aProb = item[i].getProbability();
      sumProb+=aProb;
      sum+=aProb*1000000*aReward
    console.log("Item: "+aItem+" Reward: "+aReward+" Prob: "+aProb)
  }
  console.log("new sumMoney "+sum)
  console.log("return rate: "+sum/150000000*100)
  console.log("sum of win prob: "+sumProb)
}
function genItem(){
  item = (new GenItem({numberOfFace:9,numberOfRows:3,rewardTable:rewardTable}) ).getItem()
  item.sort(function(a,b){return a.reward - b.reward})
  numberOfWinning  = item.length-1;
}
function calculateAllProbabilityInFirstRoundWithEqualDistribution(){
  for(val of item){
    let reward = val.getReward();
    rewardSet.add(reward);
    let expectedValue = 135;
    let eachExpression = expectedValue/numberOfWinning;
    let probability = eachExpression/val.getReward();
    
    val.setProbability(probability);
    val.printItemAndRewardAndProb();
    if(reward!=0){
      sumProb+=probability;
      total_time.push(probability*1000000*reward)
    }
  }
  console.log(sumProb);

}
function increaseWinProbabilityByDecreaseLoseProbability(){
  let p1 = loseProb/2;
  let p2 = p1/2;
  let p3 = p2/2;
  let p4 = p3/2;
  let p5 = loseProb-(p1+p2+p3+p4);
  let index = 1;
  let limit = numberOfWinning;
  let eachLoopLimit = parseInt(limit/10)
  //TODO -: Need to group by reward
  for(;index<=eachLoopLimit;index++){
      item[index].adjustProbability(p1);
  }
  for(;index<=eachLoopLimit*2;index++){
      item[index].adjustProbability(p2);
  }
  for(;index<=eachLoopLimit*3;index++){
      item[index].adjustProbability(p3);
  }
  for(;index<=eachLoopLimit*4;index++){
      item[index].adjustProbability(p4);
  }
  for(;index<=eachLoopLimit*5;index++){
      item[index].adjustProbability(p5);
  }
}
genItem()
calculateAllProbabilityInFirstRoundWithEqualDistribution()
var loseProb = (1-sumProb)-0.80
console.log("loseProb "+loseProb);
increaseWinProbabilityByDecreaseLoseProbability();
//
// // item[1].adjustProbability(tempProb);
// // for(let i= parseInt(item.length/2);i<item.length;i++){
// //   item[i].setProbability(item[i].getProbability()/10);
// // }
sumProb = caculateItemProb()
printNewProbAndGetResult();
var sumTempProb = 0
for(let i=1;i<item.length;i++){
  sumTempProb+= item[i].getProbability();
}
console.log("tempSum = "+sumTempProb);
sumOfTotaltime = total_time.reduce(function(a,b){return a+b})
var returnRate = sumOfTotaltime/150000000
// console.log(returnRate);
// console.log(rewardSet);
