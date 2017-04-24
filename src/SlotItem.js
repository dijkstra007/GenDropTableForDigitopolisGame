const GenItem  = require('./GenItem')
const Item = require('./Item')
class SlotItem{
  constructor(props){
    this.itemList = props.itemList
    this.countList = props.countList
    this.itemListWithCountList = this.combineItemAndCountList(this.itemList,this.countList)
    this.rewardTable = props.rewardTable
    this.reward = 0
    this.probability = 0
    this.updateItemReward(this.itemListWithCountList);

    }
  combineItemAndCountList(itemList,countList){
    let itemAndCountList = []
    for(let i=0;i< itemList.length;i++){
      itemAndCountList.push(new Item({item: itemList[i],count: countList[i]}))
    }
    return itemAndCountList
  }
  updateItemReward(itemListWithCountList){
    for(let i = 0 ;i < itemListWithCountList.length ;i++){
      const multipier = itemListWithCountList[i].count-3+1
      const index = itemListWithCountList[i].item
      this.reward += this.rewardTable[index]*multipier
      console.log(this.rewardTable[index]+" "+multipier)
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
