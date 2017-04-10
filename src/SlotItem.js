const GenItem  = require('./GenItem')
const Item = require('./Item')
class SlotItem{
  constructor(props){
    this.itemList = props.itemList
    this.countList = props.countList
    this.itemListWithCountList = this.combineItemAndCountList()
    this.rewardTable = props.rewardTable
    this.reward = 0
    this.probability = 0
    this.updateItemReward();

    }
  combineItemAndCountList(){
    let itemAndCountList = []
    for(let i=0;i< this.itemList.length;i++){
      itemAndCountList.push(new Item({item:this.itemList[i],count:this.countList[i]}))
    }
    return itemAndCountList
  }
  updateItemReward(){
      const items = this.itemList
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
  getItemListWithCountNumber(){
    return this.itemListWithCountList
  }
  getItemList(){
    return this.itemList
  }
  getCountList(){
    return this.countList
  }
}

module.exports = SlotItem;
