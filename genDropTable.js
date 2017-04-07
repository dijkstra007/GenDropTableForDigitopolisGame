const GenItem  = require('./GenItem')

var multiplier = [0,5,10,20,50,100,200,500,1000]
var rewardTable = [0,250,500,1000,2500,5000,10000,25000,50000]
var numberOfWinning;
const RETURN_RATE = 90.0000000
const EPSILON = 0.0000001;
const MIN_BET_PER_LINE = 50;
const NUM_OF_POSSIBLE_COMBINATION = 1536
const cost = 1687.5


var sumWinProb = 0;
var item = []
var rewardSet = new Set();
var total_time = []
var sumOfTotaltime;
var loseProb;
var tempProb;

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
  let sumWinProb=0;
  for(let i =1 ;i<item.length;i++){
      let aItem = item[i].getItem();
      let aReward = item[i].getReward();
      let aProb = item[i].getProbability();
      sumWinProb+=aProb;
      sum+=aProb*1000000*aReward
    console.log("Item: "+aItem+" Reward: "+aReward+" Prob: "+aProb)
  }
  console.log("new sumMoney "+sum)
  console.log("return rate: "+sum/150000000*100)
  console.log("sum of win prob: "+sumWinProb)
}
function genItem(){
  item = (new GenItem({numberOfFace:9,numberOfRows:3,rewardTable:rewardTable}) ).getItem()
  item.sort(function(a,b){return a.reward - b.reward})
  numberOfWinning  = item.length-1;
}
function calculateAllProbabilityInFirstRoundWithEqualDistribution(){
  let sumWinProb = 0;
  for(val of item){
    let reward = val.getReward();
    rewardSet.add(reward);
    let expectedValue = 135;
    let eachExpression = expectedValue/numberOfWinning;
    let probability = eachExpression/val.getReward();
    
    val.setProbability(probability);
    val.printItemAndRewardAndProb();
    if(reward!=0){
      sumWinProb+=probability;
      total_time.push(probability*1000000*reward)
    }
  }
  console.log("Sum of Win probability = "+sumWinProb);
  return sumWinProb

}
function findIndexOfItemWhichRewardEqual(reward){
  let index = []
  for(let i = 1 ;i<item.length;i++){
      if(item[i].getReward() == reward){
        index.push(i)
      }
      else if(item[i].getReward() >= reward){
        break;
      }
  }
  return index
}
function increaseWinProbabilityByDecreaseLoseProbability(loseProb){
  console.log(loseProb);
  let p1 = loseProb/2;
  let p2 = p1/2;
  let p3 = p2/2;
  let p4 = p3/2;
  let p5 = loseProb-(p1+p2+p3+p4);
  let indexReward = 1
  let indexItem = 1
  let limit = numberOfWinning;
  let eachLoopLimit = parseInt(limit/10)
  
  //TODO -: Need to group by reward
  // for(;indexReward<=eachLoopLimit)
  // for(;index<=eachLoopLimit;index++){
  //     item[index].adjustProbability(p1);
  // }
  // for(;index<=eachLoopLimit*2;index++){
  //     item[index].adjustProbability(p2);
  // }
  // for(;index<=eachLoopLimit*3;index++){
  //     item[index].adjustProbability(p3);
  // }
  // for(;index<=eachLoopLimit*4;index++){
  //     item[index].adjustProbability(p4);
  // }
  // for(;index<=eachLoopLimit*5;index++){
  //     item[index].adjustProbability(p5);
  // }
}
function CreateRewardSetsFromItem(item){
  let rewardSet = new Set()
  for(val of item){
    rewardSet.add(val.getReward())
  }
  return rewardSet
}
genItem()
rewardSet = CreateRewardSetsFromItem(item)
sumWinProb = calculateAllProbabilityInFirstRoundWithEqualDistribution()
loseProb = 1-(sumWinProb)
item[0].setProbability(loseProb);
tempProb = loseProb-0.80;
increaseWinProbabilityByDecreaseLoseProbability(tempProb)


/*
calculateAllProbabilityInFirstRoundWithEqualDistribution()
var loseProb = (1-sumWinProb)-0.80
increaseWinProbabilityByDecreaseLoseProbability(loseProb);
sumWinProb = caculateItemProb()
printNewProbAndGetResult();
var sumTempProb = 0
for(let i=1;i<item.length;i++){
  sumTempProb+= item[i].getProbability();
}
console.log("tempSum = "+sumTempProb);
sumOfTotaltime = total_time.reduce(function(a,b){return a+b})
var returnRate = sumOfTotaltime/150000000
*/
