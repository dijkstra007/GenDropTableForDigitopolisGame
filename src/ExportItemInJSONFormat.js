const SlotItem = require('./SlotItem')
class ExportItemInJSONFormat{
  constructor(props){
    this.allPossibleItem = props.allPossibleItem
  }
  print(){
    console.log("dropTable = [")
    for(let i = 0;i<this.allPossibleItem.length;i++){
      let rate = this.allPossibleItem[i].getProbability()
      let itemListWithCountNumber = this.allPossibleItem[i].getItemListWithCountNumber()
      console.log("\t{")
      process.stdout.write('\t\t\"dropRate\": '+rate+',\n')
      process.stdout.write('\t\t\"dropSymbols\": [')
      for(let j = 0 ; j < itemListWithCountNumber.length ; j++){
        let val = itemListWithCountNumber[j]
        process.stdout.write('['+val.item+','+val.count+']')
        if(j<itemListWithCountNumber.length-1)
          process.stdout.write(',')
      }
      process.stdout.write(']\n')
      console.log("\t},")
    }
    console.log("]")
  }
}
module.exports = ExportItemInJSONFormat;
