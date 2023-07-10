export function checkAllTrue(...args){
    for (let i = 0; i < args.length; i++) {
       if(args[i]==false)return false;
      }
      return true;
}