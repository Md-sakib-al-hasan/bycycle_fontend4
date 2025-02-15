
type TEmailuser = {
    displayName:string,
    uid:string
}

function generateCustomEmail(user:TEmailuser) {
    const username = user.displayName.toLowerCase().replace(/\s+/g, "_"); 
    const uid = user.uid.slice(0, 6); 
    return `${username}.${uid}@gmail.com`;
  }

export default generateCustomEmail