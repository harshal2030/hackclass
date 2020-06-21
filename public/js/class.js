const joinForm = document.querySelector('.join');
const joinCode = joinForm.querySelector('input');
const createFrom = document.querySelector('.create');
const createCode = createFrom.querySelector('input');

const classCodes = [];

const token = document.cookie;
// console.log(token);

const requestHeaders = {
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + token,
};

async function joinClass(e) {
    e.preventDefault();
    const code = joinCode.value;
    const response = await fetch(`https://testreactapp.me/class/join`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({ className: code }),
    });
    // console.log(response.status);
    const data = await response.json();
    console.log(data);
    joinForm.reset();
    classCodes.push(code);
    localStorage.setItem('codes', JSON.stringify(classCodes));
}

async function createClass(e) {
    e.preventDefault();
    const code = createCode.value;
    const response = await fetch('https://testreactapp.me/class', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({className: code})
    });
    const data = await response.json();
    // console.log(response.status);
    console.log(data);
    createFrom.reset();
}

joinForm.addEventListener('submit', joinClass);
createFrom.addEventListener('submit', createClass);