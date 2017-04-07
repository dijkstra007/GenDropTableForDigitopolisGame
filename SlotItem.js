const GenItem  = require('./GenItem')

class SlotItem{
  constructor(props){
    this.item = props.item
    this.rewardTable = props.rewardTable
    this.reward = 0
    this.probability = 0
    this.updateItemReward();
  }
  printItem(){
    const items = this.item;
    for(let val of items){
        process.stdout.write(val+' ')
    }
    console.log();
  }
  printItemAndRewardAndProb(){
    const items = this.item;
    for(val of items){
      process.stdout.write(val+' ')
    }
    process.stdout.write('Reward: '+this.reward+' ');
    process.stdout.write('Prob: '+this.probability+' ');
    console.log()
  }
  updateItemReward(){
      const items = this.item
      for(let val of items){
        if(val!=0){
          var index = val
          this.reward += this.rewardTable[index]
        }
      }
  }
  
  adjustProbability(probability){
    this.probability += probability
  }
  setProbability(probability){
    this.probability = probability
  }
  getReward(){
    return this.reward
  }
  getProbability(){
    return this.probability
  }
  getItem(){
    return this.item
  }
}

module.exports = SlotItem;
