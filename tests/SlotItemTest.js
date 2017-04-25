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
      let slotItem = new SlotItem({itemList:[3,4,5],
                                  countList:[3,4,5],
                                  rewardTable:[0,250,500,1000,2500,5000,10000,25000,50000],
                                  fourFacesMultiplier:[0,4,4,5,5,4,4,3,2,2,2,2],
                                  fiveFacesMultiplier:[0,20,20,15,15,10,10,6,5,5,4,5]})
      let reward = slotItem.getReward() // 1000+2500*5+50000 = 63500
      expect(reward).to.equal(63500)
      
  })
})
