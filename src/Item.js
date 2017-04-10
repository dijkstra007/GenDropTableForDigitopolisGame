class Item{
  constructor(props){
    this.item = props.item
    this.count = props.count
  }
  updateCount(count){
    this.count = count
  }
}

module.exports = Item;
