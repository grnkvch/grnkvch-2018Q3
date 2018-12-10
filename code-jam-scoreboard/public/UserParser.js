export default class UserParcer {
  parse(userData){
    let userParcedData = {};
    userData.forEach((item)=>{userParcedData[item.uid]=item.displayName})
    return userParcedData;
  }
}