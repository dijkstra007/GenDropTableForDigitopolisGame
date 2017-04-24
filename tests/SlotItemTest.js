var chai = require('chai')
var expect = chai.expect
var SlotItem = require('./../src/SlotItem')

describe('SlotItem',function(){
  slotItem = new SlotItem({itemList:[3,4,5],countList:[3,3,3],rewardTable:[0,250,500,1000,2500,5000,10000,25000,50000]})
  it('combineItemAndCountList Size test',function(){
    let itemAndCountList = slotItem.combineItemAndCountList(slotItem.itemList,slotItem.countList)
    expect(itemAndCountList.length).to.equal(3)
  })
  it('combineItemAndCountList test',function(){
    let itemAndCountList = slotItem.combineItemAndCountList(slotItem.itemList,slotItem.countList)
    let obj = [
      {
        "count": 3,
        "item": 3
      },
      {
        "count": 3,
        "item": 4
      },
      {
        "count": 3,
        "item": 5
      }
    ]
    expect(itemAndCountList).to.deep.equal(obj)
  })
  it('Update Reward Test',function(){
      let slotItem = new SlotItem({itemList:[3,4,5],countList:[3,4,5],rewardTable:[0,250,500,1000,2500,5000,10000,25000,50000]})
      let reward = slotItem.getReward() // 1000+2*2500+5000*3 = 21000
      expect(reward).to.equal(21000)
      
  })
})
