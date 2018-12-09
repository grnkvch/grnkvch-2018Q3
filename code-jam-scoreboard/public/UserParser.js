export default class UserParcer {
  parce(userData){
    let userParcedData = {};
    userData.forEach((item)=>{userParcedData[item.uid]=item.displayName})
    return userParcedData;
  }
}