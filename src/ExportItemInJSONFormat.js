const SlotItem = require('./SlotItem')
class ExportItemInJSONFormat{
  constructor(props){
    this.allPossibleItem = props.allPossibleItem
    this.input = props.input
  }
  print(){
    console.log("input : {")
    console.log(this.input)
    
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
  writeFile(fileName){
    var o = {}
    var key1 = 'input'
    var key2 = 'dropTable'
    
    o[key1] = this.input
    o[key2] = []
    for(let i=0;i<this.allPossibleItem.length;i++){
      let rate = this.allPossibleItem[i].getProbability()
      let itemPairedCount = this.allPossibleItem[i].getItemListWithCountNumber()
      
      var data = {
        dropRate: rate,
        dropSymbols: itemPairedCount
      }
      o[key2].push(data)
    }
    var fs = require('fs')
    fs.writeFile(fileName, JSON.stringify(o, null, 4));
  }
}
module.exports = ExportItemInJSONFormat;
