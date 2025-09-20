function handleRegistration(event) {
    event.preventDefault();

    // Get user input
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create an object with user information
    const user = {
        username: username,
        email: email,
        password: password,
        status: "online",
    };
    
    fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Registration failed with status: ' + response.status);
        }
        return response.json();
    }).then(registeredUser => {
        localStorage.setItem("connectedUser", JSON.stringify(registeredUser));
        window.location.href = "index.html";
    }).catch(error => {
        console.error('POST request error:', error);
        alert('Registration failed: ' + error.message + '\n\nMake sure the backend server is running on http://localhost:8080');
    });
}

const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", handleRegistration);