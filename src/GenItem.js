const SlotItem = require('./SlotItem')

class GenItem{
  constructor(props){
    this.genArr = []
    this.allPossibleItemArray = []
    this.rewardTable = props.rewardTable
    this.numberOfFace = props.numberOfFace
    this.numberOfRows = props.numberOfRows
    this.generateCombination(0);
  }
  generateCombination(index){
    if(index==this.numberOfRows){
      let temp = []
      for(let i=0;i<this.numberOfRows;i++){
          temp.push(this.genArr[i]);
      }
      this.allPossibleItemArray.push(new SlotItem({itemList:temp,countList:[3,3,3],rewardTable:this.rewardTable}));
      return ;
    }
    for(let item=0;item<this.numberOfFace;item++){
      if(item!=0 && this.isDuplicateItemInArray(index,item)){
        continue;
      }
      this.genArr[index]=item;
      this.generateCombination(index+1);
    }
    
  }
  isDuplicateItemInArray(n,item){
    for(let i=0;i<n;i++){
      if(this.genArr[i]===item)
        return true;
    }
    return false;
  }
  getItem(){
    return this.allPossibleItemArray;
  }

}

module.exports = GenItem
