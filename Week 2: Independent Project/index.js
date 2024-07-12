//get form submitted data
function submitUserData () {
    let answer = document.getElementById('result').innerHTML
    let gender = document.getElementById('gender').value

    //date values to an object
    let dob = {
        century: document.getElementById('century').value,
        year: document.getElementById('year').value,
        month: document.getElementById('month').value,
        date: document.getElementById('date').value
    }

    //get birth day
    const day = getBirthDayOfWeek(dob)

    // if date of the week is valid
    if (day.status){
        const result = getChildName(day, gender)
        if (result.status) {
            answer = 'Your were born on '+ result.day +' and '+ result.name
        }else{
            alert(result.message)
            answer = 'Your answer :'
        }
    }else{
        alert(day.message)
        answer = 'Your answer :'
    }
}

// get the birth day 1 being Sunday and 7 being Saturday
function getBirthDayOfWeek (date) {
    let dob = { century: parseFloat(date.century), year: parseFloat(date.year), month: parseFloat(date.month), date: parseFloat(date.date)}

    if (isNaN(dob.century) || isNaN(dob.year) || isNaN(dob.month) || isNaN(dob.date)) {
        return {status: false, message: 'invalid date of birth values'}
    }else if(dob.year <= 0 || dob.year > 99){
        return {status: false,  message: 'year is out of bound'}
    }else if(dob.month <= 0 ||  dob.month > 12){
        return {status: false, message: 'month value out of bound'}
    }else if ( dob.date <= 0 || dob.date > 31 ){
        return {status: false, message: 'date value out of bound'}
    }else{
        const weekDay =  ( ( (dob.century/4) -2*dob.century-1) + ((5*dob.year/4) ) + ((26*(dob.month+1)/10)) + dob.date ) % 7
        return {status: true, message: parseInt(weekDay) - 1}
    }
}

//get child name via day born and gender
function getChildName (day, gender) {
    const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // male names representing Sunday through Saturday
    const maleNames = ['Kwasi', 'Kwadwo', 'Kwabena', 'Kwaku', 'Yaw', 'Kofi', 'Kwame'];
    //female names representing Sunday through Saturday
    const femaleNames = [ 'Akosua', 'Adwoa', 'Abenaa', 'Akua', 'Yaa', 'Afua', 'Ama'];

    /*
        check if day is valid
    */
    let dateBorn = day.message;
    if (isNaN(dateBorn)){
        return {status: false, message: 'invalid date set!'}
    }else if (dateBorn < 0){
        return {status: false, message:  'date is out of bound!'}
    }

    //check if gender is set
    const newGender = convertToLowerCase(gender)
    if (newGender) {
        if (newGender === 'male'){ //if gender is male
            return {status: true, day: weekDays[dateBorn], gender: newGender, name: 'Your Akan name is '+ maleNames[dateBorn]};
        }else if(newGender === 'female'){ // if gender is female
            return {status: true, day: weekDays[dateBorn], gender: newGender, name: 'Your Akan name is '+ femaleNames[dateBorn]};
        }else{
            return {status: false, message: 'invalid gender value!'}
        }
    }else{
        return {status: false, message: 'gender is not set!'}
    }
}

// convert string to lower case - in this case gender
function convertToLowerCase(str) {
    return str.toLowerCase();
}