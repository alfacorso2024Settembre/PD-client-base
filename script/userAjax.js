let xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:8080/PDUsersRS/rest/users/1', true);
xhr.onloadend = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
        console.log(xhr.responseText);
    } else {
        console.error('Errore nella richiesta GET: ', xhr.statusText);
    }
}
xhr.send();

const idUser = 1;

document.addEventListener('DOMContentLoaded', () => {
    getUserProfile(idUser);
});

function getUserProfile(idUser) {
    fetch(`http://localhost:8080/PDUsersRS/rest/users/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('User Profile:', data);
            document.querySelector('input[name="email"]').value = data.email || '';
            document.querySelector('input[name="password"]').value = '********'; // Mostra password placeholder
            document.querySelector('input[name="phone"]').value = data.phone || '';
            document.querySelector('.profilePicture').src = data.profilePicture || 'img/defaultProfile.jpg';
        })
        .catch((error) => {
            console.error('Errore nel fetch:', error);
        });
}

function updateUserProfile(idUser, user) {
    fetch(`http://localhost:8080/PDUsersRS/rest/users/${idUser}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            console.log('User modificato con successo');
        })
        .catch((error) => {
            console.error('Errore nella modifica dello user:', error);
        });
}

