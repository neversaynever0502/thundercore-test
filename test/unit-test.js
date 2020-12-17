var should = require('should')
var {
  MaxClaimableSeason,
  getCurrentSeason,
  addSeason,
  invest,
  getInvestAllUsers,
  addProfit,
  getAllProfit,
  withdraw,
  claim,
  testAll,
} = require("../index");


describe("test app", function(){

  it("check if getCurrentSeason return add season", function(){
      var season = getCurrentSeason(); //取得現在的season
      addSeason() //增加一個season
      var season2 = getCurrentSeason(); //取得現在的season
      season2.should.equal(season+1) //確認season有加1
  })

  it("check if invest add investUsers data", function(){
    invest(50,'Peter') //peter投資50
    let investUsers = getInvestAllUsers() //取得現在的投資列表
    investUsers['Peter'].should.equal(50) //確認peter在投資列表上為50
  })
  
  it("check if addProfit add profit", function(){
    addProfit(60) //獲利60
    let allprofit = getAllProfit() //取得所有Season獲利表
    let season = getCurrentSeason() //取得現在的season
    allprofit[season].should.equal(60) //確認在所有Season獲利表中現在的season獲利為60
  })

  it("check if claim works",function(){
    invest(50,'Kevin') //Kevin投資50
    addSeason() //增加一季到下一季
    let KevinReceived = claim('Kevin') //取得Kevin的分紅
    KevinReceived.should.equal(30) //確認為30（因為Peter跟Kevin現在各佔一半，所以60的獲利平均給兩人）
  })

  it("check if withdraw minus investUsers data",function(){
    withdraw(50,'Peter') //Peter提款
    let investUsers = getInvestAllUsers() //取得現在的投資列表
    investUsers['Peter'].should.equal(0) //確認Peter取出50後剩餘0
  })

})

