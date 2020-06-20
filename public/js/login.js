const usernameField = document.querySelector('.username');
const passwordField =  document.querySelector('.password');
const loginForm  = document.querySelector('.login');

async function loginAuth(e) {
    e.preventDefault();
    const username = usernameField.value;
    const password = passwordField.value;

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
        body: loginData,
    });

    const data = await response.json();
    console.log(data);
    
    usernameField.reset();
    passwordField.reset();
}

loginForm.addEventListener('submit', loginAuth)