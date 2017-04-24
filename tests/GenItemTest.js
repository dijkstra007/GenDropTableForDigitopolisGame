var chai = require('chai')
var expect = chai.expect
var GenItem = require('./../src/GenItem')

describe('GenItem({numberOfFace:8,numberOfRows:3,numberOfColums:3,rewardTable:[0,250,500,1000,2500,5000,10000,25000,50000]})',function(){
  this.timeout(15000)
  var genItem = (new GenItem({numberOfFace:8,numberOfRows:3,numberOfColums:3,rewardTable:[0,250,500,1000,2500,5000,10000,25000,50000]}) )
  it('getItem.length should return size = 529',function(){
    expect(genItem.getItem().length).to.equal(529)
  })
  it('countList.length should be  1',function(){
    expect(genItem.countList.length).to.equal(1)
  })
  it('counList.length should be 27 if numberOfColums = 5',function(){
    let genItem = (new GenItem({numberOfFace:8,numberOfRows:3,numberOfColums:5,rewardTable:[0,250,500,1000,2500,5000,10000,25000,50000]}) )
    expect(genItem.countList.length).to.equal(27)
    
  })

  
})
