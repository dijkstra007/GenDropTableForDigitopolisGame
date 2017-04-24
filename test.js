var chai = require('chai')
var expect = chai.expect
var Main = require('./slot1')

let rewardTable = Main.InitialRewardTableFromMultiplier([0,5,10,20,50,100,200,500,1000],50)
console.log(rewardTable)
