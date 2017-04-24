var chai = require('chai')
var expect = chai.expect
var Main = require('./../slot1')

describe('Main',function(){
  it('InitialRewardTableFromMultiplier([0,5,10,20,50,100,200,500,1000],50) should return rewardTable',function(){
    let rewardTable = Main.InitialRewardTableFromMultiplier([0,5,10,20,50,100,200,500,1000],50)
    expect(rewardTable).to.deep.equal([0,250,500,1000,2500,5000,10000,25000,50000])
  })
})
