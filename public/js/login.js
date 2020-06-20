const usernameField = document.querySelector('.username');
const passwordField =  document.querySelector('.password');
const loginForm  = document.querySelector('.login');

async function loginAuth(e) {
    e.preventDefault();
    const username = usernameField.value.trim();
    const password = passwordField.value.trim();

    const loginData = {
        username,
        password,
      };
    
      const requestHeaders = {
        'Content-Type': 'application/json',
      };

    const response = await fetch('https://testreactapp.me/users/signup', {
        method: 'post',
        headers: requestHeaders,
        body: JSON.stringify(loginData),
    });

    const data = await response.json();
<<<<<<< HEAD
    document.cookie = data.token;

    loginForm.reset();
=======
    console.log(data);
    window.location.replace('https://testreactapp.me/home');
    
    usernameField.reset();
    passwordField.reset();
>>>>>>> e7ebae29b584c10ba3e09e5f246de51aa44d8d87
}

loginForm.addEventListener('submit', loginAuth);