import { min } from "moment";

export function getOrderId(){

    var randomNumber = "";

    for(var i = 0;i<6;i++){
        randomNumber += Math.floor(Math.random()*10);
    }

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    // 补充0
    const formatNumber = n => {
        n = n.toString()
        // '8' => '08'
        return n[1] ? n : '0' + n
    }
    return [year,month,day,hour,minute,second].map(formatNumber).join('') + randomNumber

}
