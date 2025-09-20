function handleLogin(event){
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        email: email,
        password: password
    };
    
    fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if(!response.ok) {
            alert('Login and / or password is incorrect');
            throw new Error('Login failed');
        }
        return response.json(); // ← FIX 1: ADD PARENTHESES ()
    }).then(userData => {       // ← FIX 2: CHANGE PARAMETER NAME
         localStorage.setItem('connectedUser', JSON.stringify(userData)); // ← FIX 3: CHANGE KEY NAME
         window.location.href = 'index.html';
    }).catch(error => {
        console.error('POST request error', error);
    });
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", handleLogin);