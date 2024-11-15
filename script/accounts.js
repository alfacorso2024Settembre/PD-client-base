
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

document.querySelector('.register-button').addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.getElementById('femail').value;
    const password = document.getElementById('fpassword').value;
    const confirmPassword = document.getElementById('fconfirmpassowrd').value;
    const statusImage = document.querySelector('.auth-form-status');

    if (validateEmail(email) && validatePassword(password) && password === confirmPassword) {
        statusImage.src = './img/Green-check.png';
    } else {
        statusImage.src = './img/Red-cross.png';
    }
});
