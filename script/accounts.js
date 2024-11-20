
function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/\d/.test(password)) {
        return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(\\+39|0039)\\d{9,10}$/;
    return phoneRegex.test(phoneNumber);
}

function validateDateOfBirth(dateOfBirth) {
    try {
        const formatter = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    } catch (e) {
        return false;
    }
}


function statusValidation(){
    const email = document.getElementById('femail').value;
    const password = document.getElementById('fpassword').value;
    const statusImage = document.querySelector('.auth-form-status');

    if (validateEmail(email) && validatePassword(password)) {
        statusImage.src = './img/Green-check.png';
    } else {
        statusImage.src = './img/Red-cross.png';
    }
}
/*
document.querySelector('.register-button').addEventListener('onmouseover', function(event) {
    event.preventDefault();
    const email = document.getElementById('femail').value;
    const password = document.getElementById('fpassword').value;
    const statusImage = document.querySelector('.auth-form-status');

    if (validateEmail(email) && validatePassword(password)) {
        statusImage.src = './img/Green-check.png';
    } else {
        statusImage.src = './img/Red-cross.png';
    }
});
*/
const url = "http://localhost:8080/PDAccountsRS/accounts";

const insertAccount = async() => {
    try{
        const email = document.getElementById("femail").value;
        const password = document.getElementById("fpassword").value;
        //const birthdate = document.getElementById("birthdateIdInsert").value;
        //const phonenumber = document.getElementById("phonenumberInsert").value;
        const role = "User";
        const status = "Active"; 
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
                email: email, 
                password: password,
                role: role, 
                status:status,
          })
          });
          

        if (!response.ok) {
        throw new Error(result.error || 'Failed to register account');
            
        }
        const result = await response.json();
    
        console.log(JSON.stringify(result));
        return response;

    }catch(error){
        console.error("Failed to register account :" + error)
    }
}