var chai = require('chai')
var expect = chai.expect
var GenItem = require('./../src/GenItem')

describe('GenItem',function(){
  it('GenItem({numberOfFace:8,numberOfRows:3,rewardTable:[0,250,500,1000,2500,5000,10000,25000,50000]}) should return 529 size of itemList',function(){
    var itemList = (new GenItem({numberOfFace:8,numberOfRows:3,rewardTable:[0,250,500,1000,2500,5000,10000,25000,50000]}) ).getItem()
    expect(itemList.length).to.equal(529)
  })

  
})
