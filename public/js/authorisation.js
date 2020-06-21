const loginTab = document.querySelector('.login-btn');
const signupTab  = document.querySelector('.signup-btn');

const loginForm  = document.querySelector('.login');
const loginUsername = loginForm.querySelector('.username');
const loginPassword =  loginForm.querySelector('.password');

const signupForm = document.querySelector('.signup');
const signupName = signupForm.querySelector('.name');
const signupUsername = signupForm.querySelector('.username');
const signupPassword =  signupForm.querySelector('.password');

async function loginAuth(e) {
    e.preventDefault();
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    console.log(username, password);

    const loginData = {
        username,
        password
      };
    
    const requestHeaders = {
        "Content-Type": 'application/json',
    };

    const response = await fetch('https://testreactapp.me/users/login', {
        method: 'post',
        headers: requestHeaders,
        body: JSON.stringify(loginData)
    });

    if (response.status !== 200) {
        return alert("Incorrect username or password");
    }
    
    const data = await response.json();
    console.log(data);
    document.cookie = data.token;

    loginForm.reset();
    window.location.replace('https://testreactapp.me/home');
}

async function signupAuth(e) {
    e.preventDefault();
    const name  = signupName.value.trim();
    const username = signupUsername.value.trim();
    const password = signupPassword.value.trim();

    const signupData = {
        name,
        username,
        password
      };
    
    const requestHeaders = {
        "Content-Type": 'application/json',
    };

    const response = await fetch('https://testreactapp.me/users/signup', {
        method: 'post',
        headers: requestHeaders,
        body: JSON.stringify(signupData)
    });
    

    if (response.status !== 200) {
        return alert("Username not available");
    }

    const data = await response.json();
    console.log(data);
    document.cookie = data.token;

    loginForm.reset();
    window.location.replace('https://testreactapp.me/home');
}

loginTab.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    loginTab.classList.remove('ghost-btn');
    signupTab.classList.add('ghost-btn');
})
signupTab.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupTab.classList.remove('ghost-btn');
    loginTab.classList.add('ghost-btn');
})

loginForm.addEventListener('submit', loginAuth);
signupForm.addEventListener('submit', signupAuth);