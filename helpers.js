export function isUndefine(data){
    console.log("calling from helpers ! " + data);
    data.forEach(element => {
        console.log(element);
        if(element == undefined){
            console.log("Got an element which is undefined " + element);
            return true;
        }
    });
    return false;

}