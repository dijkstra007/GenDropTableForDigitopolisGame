const GenItem  = require('./GenItem')
const Item = require('./Item')
class SlotItem{
  constructor(props){
    this.itemList = props.itemList
    this.countList = props.countList
    this.itemListWithCountList = this.combineItemAndCountList(this.itemList,this.countList)
    this.rewardTable = props.rewardTable
    this.fourFacesMultiplier = props.fourFacesMultiplier
    this.fiveFacesMultiplier = props.fiveFacesMultiplier
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
      const countItem = itemListWithCountList[i].count
      const index = itemListWithCountList[i].item
      if(countItem==3){
        this.reward += this.rewardTable[index]
      }
      else if(countItem==4){
        this.reward += this.rewardTable[index]*this.fourFacesMultiplier[index]
      }
      else if(countItem==5){
        this.reward += this.rewardTable[index]*this.fiveFacesMultiplier[index]
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
