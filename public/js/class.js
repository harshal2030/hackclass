const joinForm = document.querySelector('.join');
const joinCode = joinForm.querySelector('input');
const createFrom = document.querySelector('.create');
const createCode = createFrom.querySelector('input');

const token = document.cookie;

async function joinClass(e) {
    e.preventDefault();
    const code = joinCode.value;
    const requestHeaders = {
        "Content-Type": 'application/json',
        "Authorization": 'Bearer ' + token,
    };
    const response = await fetch(`https://testreactapp.me/class/join`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({ className: code }),
    });
    const data = await response.json();
    console.log(data);
    joinForm.reset();
}

async function createClass(e) {
    e.preventDefault();
    const code = createCode.value;
    const response = await fetch('https://testreactapp.me/class', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({className: code})
    });
    const data = response.json();
    console.log(data);
    createFrom.reset();
}

joinForm.addEventListener('submit', joinClass);
createFrom.addEventListener('submit', createClass);