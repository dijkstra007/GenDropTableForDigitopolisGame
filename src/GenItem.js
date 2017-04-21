const SlotItem = require('./SlotItem')

class GenItem{
  constructor(props){
    this.genItemArr = []
    this.genWinningArr = []
    this.allPossibleItemArray = []
    this.rewardTable = props.rewardTable
    this.numberOfFace = props.numberOfFace
    this.numberOfRows = props.numberOfRows
    this.numberOfColums = props.numberOfColums
    this.countList = []
    this.generateNumberOfWinningItemForEachRow(0);
    this.generateCombination(0);
  }
  generateNumberOfWinningItemForEachRow(index){
    if(index==this.numberOfRows){
      let temp = []
      for(let i =0;i<this.numberOfRows;i++){
        temp.push(this.genWinningArr[i]);
      }
      this.countList.push(temp)
      return ;
    }
    for(let numberOfItem = 3 ;numberOfItem<=this.numberOfColums;numberOfItem++){
      this.genWinningArr[index] = numberOfItem
      this.generateNumberOfWinningItemForEachRow(index+1)
    
    }
  }
  generateCombination(index){
    if(index==this.numberOfRows){
      let temp = []
      for(let i=0;i<this.numberOfRows;i++){
          temp.push(this.genItemArr[i]);
      }
      for(let i=0;i<this.countList.length;i++){
        this.allPossibleItemArray.push(new SlotItem({itemList:temp,countList:this.countList[i],rewardTable:this.rewardTable}));
      }
      return ;
    }
    for(let item=0;item<=this.numberOfFace;item++){
      if(item!=0 && this.isDuplicateItemInArray(index,item)){
        continue;
      }
      this.genItemArr[index]=item;
      this.generateCombination(index+1);
    }
    
  }
  isDuplicateItemInArray(n,item){
    for(let i=0;i<n;i++){
      if(this.genItemArr[i]===item)
        return true;
    }
    return false;
  }
  getItem(){
    return this.allPossibleItemArray;
  }

}

module.exports = GenItem
