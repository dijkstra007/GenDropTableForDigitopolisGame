const GenItem  = require('./src/GenItem')
const Item = require('./src/Item')
const ExportItemInJSONFormat = require('./src/ExportItemInJSONFormat')

var multiplier = [0,5,10,20,50,100,200,500,1000]
var rewardTable = [0,250,500,1000,2500,5000,10000,25000,50000]
const RETURN_RATE = 90.0000000
const EPSILON = 0.5;
const MIN_BET_PER_LINE = 50;
const NUM_OF_POSSIBLE_COMBINATION = 1536


var sumWinProb = 0;
var allPossibleItem = []
var rewardSet = new Set();
var total_time = []
var loseProb;

function printNewProbAndGetResult(){
  let sum=0;
  let sumWinProb=0;
  for(let i =0 ;i<allPossibleItem.length;i++){
      let aItem = allPossibleItem[i].getItemList();
      let aReward = allPossibleItem[i].getReward();
      let aProb = allPossibleItem[i].getProbability();
      let aItemCount = allPossibleItem[i].getCountList();
      let anItemWithCountList = allPossibleItem[i].getItemListWithCountNumber()
      if(i!=0){
        sumWinProb+=aProb;
        sum+=aProb*1000000*aReward
      }
    process.stdout.write('Item: ')
    for(val of anItemWithCountList){
      process.stdout.write(' ['+val.item+','+val.count+'] ')
    }
    console.log(" Reward: "+aReward+" Prob: "+aProb)
    
  }
  console.log("new sumMoney "+sum)
  console.log("return rate: "+sum/150000000*100)
  console.log("sum of win prob: "+sumWinProb)
}

function genItem(){
  allPossibleItem = (new GenItem({numberOfFace:8,numberOfRows:3,rewardTable:rewardTable}) ).getItem()
  allPossibleItem.sort(function(a,b){return a.reward - b.reward})
  numberOfWinning  = allPossibleItem.length-1;
  console.log("number of winning = "+numberOfWinning)
}

function calculateAllProbability(rewardSet){
  let sumWinProb = 0;
  let p = 0.2
  let array = Array.from(rewardSet)
  for(val of array){
    if(p>=0.0006)
      p=p*0.5
    else {
      p=p*0.919
    }
    sumWinProb += p
    let indexList = findIndexOfItemWhichRewardEqual(val)
    let probEachItem = p/indexList.length
    for(val1 of indexList){
      allPossibleItem[val1].setProbability(probEachItem);
    }
    
  }
  return sumWinProb
}


function findIndexOfItemWhichRewardEqual(reward){
  let index = []
  for(let i = 1 ;i<allPossibleItem.length;i++){
      if(allPossibleItem[i].getReward() == reward){
        index.push(i)
      }
      else if(allPossibleItem[i].getReward() >= reward){
        break;
      }
  }
  return index
}

function CreateWinRewardSetsFromItem(item){
  let rewardSet = new Set()
  for(val of allPossibleItem){
    if(val.getReward()!=0)
      rewardSet.add(val.getReward())
  }
  return rewardSet
}

genItem()
var x = new GenItem({})
rewardSet = CreateWinRewardSetsFromItem(allPossibleItem)
sumWinProb = calculateAllProbability(rewardSet)
loseProb = 1.0000000000-(sumWinProb)
allPossibleItem[0].setProbability(loseProb);
//printNewProbAndGetResult()
printItemInJSON =  new ExportItemInJSONFormat({allPossibleItem:allPossibleItem})
//printItemInJSON.print()
printItemInJSON.writeFile('./output/slot1.json')
