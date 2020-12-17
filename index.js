let MaxClaimableSeason = 1
let season = 0
let investUsers = {}
let allProfit = {}

function getCurrentSeason(){
  return season
}

function addSeason(){
  season = season + 1
  console.log(' ')
  console.log(`Season ${season}`)
}

function invest(number,name){
  if(investUsers[name]){
    investUsers[name] = investUsers[name] + number
  }else{
    investUsers[name] = number
  }
  console.log(`invest ${number} 	by ${name}`)
}

function getInvestAllUsers(){
  return investUsers
}

function addProfit(profit){
  if(!allProfit[season]){
    allProfit[season] = profit
  }else{
    allProfit[season] = allProfit[season] + profit
  }
  console.log(`addProfit ${profit}`)
}

function getAllProfit(){
  return allProfit
}

function withdraw(number,name){
  if(investUsers[name]){
    if(investUsers[name]>=number){
      investUsers[name] = investUsers[name] - number
    }else{
      console.log('餘額不足')
    }
  }else{
    console.log('餘額不足')
  }
}

function claim(name){
  console.log(`claim 		by ${name}`)  
  
  const thisSeason = getCurrentSeason()
  let lessThanSeason = thisSeason - MaxClaimableSeason
  if(lessThanSeason<1){
    console.log('Receives nothing')
  }else{
    let investUsersAll = 0    
    Object.keys(investUsers).map((key)=>{
      investUsersAll = investUsersAll+investUsers[key]
    })
    let userClaimAll = 0
    for(i=lessThanSeason;i<=thisSeason;i++){
      if(allProfit[i]){
        let userPercent = investUsers[name]/investUsersAll
        userClaimAll = allProfit[i]*userPercent
      }
    }
    if(userClaimAll){
      console.log(`Receives ${userClaimAll}`)
    }else{
      console.log(`Receives nothing`)      
    }
    return userClaimAll
  }
  
}

function testAll(){
  addSeason()
  invest(10,'Steve')
  addProfit(20)
  invest(15,'Dave')
  addProfit(30)
  invest(25,'Dave')
  claim('Dave')

  addSeason()
  claim('Dave')  // Receives 40

  addSeason()
  invest(20,'Steve')
  claim('Steve')
  addProfit(35)

  addSeason()
  claim('Steve')
  claim('Dave')
}


module.exports={
  MaxClaimableSeason,
  getCurrentSeason,
  addSeason,
  invest,
  getInvestAllUsers,
  addProfit,
  getAllProfit,
  withdraw,
  claim,
  testAll
}
