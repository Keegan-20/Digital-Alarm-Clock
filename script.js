//declaring variables
const selectMenu = document.querySelectorAll('select');
const displayTime = document.querySelector('h1');
const setAlarmBtn = document.getElementById('setAlarmBtn');
let alarmTime;
let isAlarmSet=false;
 let alarmRingtone = new Audio("./Awesomemorning Alarm.mp3");


for (let i = 12; i > 0; i--) {
    // add a leading zero to  i if minutes and seconds are less than 10
    if (i < 10) {
        i = "0" + i;
    }
    //  console.log(i);

    let option = `<option value="${i}"> ${i} 
 </option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);

}

for (let i = 59; i >= 0; i--) {
    // add a leading zero to  i if minutes and seconds are less than 10
    if (i < 10) {
        i = "0" + i;
    }
    //  console.log(i);
    let option = `<option value="${i}"> ${i} 
</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);

}

for (let i = 2; i > 0; i--) {
    let amPm = i === 1 ? "AM" : "PM";
    let option = `
    <option value="${amPm}"> ${amPm} </option>
`;

    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);

 }
//getting current time 
function updateClock() {
    const currentTime = new Date();
    let hours =currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let  seconds = currentTime.getSeconds();
    amPm="AM";

    if(hours>= 12){
        hours=hours - 12;
        amPm="PM";

        //if hour value is 0, set this value to 12
        hours = hours===0 ? hours=12: hours; //ternanry operator

        //adding 0 before hr,min,sec if thius value is less than 10
        hours=hours<10 ? "0" +hours :hours;
        minutes=minutes<10 ? "0" +minutes :minutes;
        seconds=seconds<10 ? "0" +seconds :seconds;

        displayTime.innerText = `${hours}:${minutes}:${seconds} ${amPm}`;

        if(alarmTime == `${hours}:${minutes} ${amPm}`)
        {
            console.log("Alarm is Ringing...");
            alarmRingtone.play();
            alarmRingtone.loop =true;           
          setAlarmBtn.innerText = "Stop Alarm";            
        }
      
    }

}
setInterval(updateClock,1000);

//alarm ringing section
const setAlarm =() => {
      
    //clearing the set alarm
    if (isAlarmSet) {
        alarmTime = "";
        alarmRingtone.pause();
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    //getting hour,minute,amPm select tag value
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}` ;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM") ) {
    return alert("Please,select a valid time to set the Alarm !!")

}
   isAlarmSet="true"
   alarmTime=time;
   console.log(`Alarm set at ${time}`);
 
}
setAlarmBtn.addEventListener("click",setAlarm);
