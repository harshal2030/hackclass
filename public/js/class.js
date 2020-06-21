const joinForm = document.querySelector('.join');
const joinCode = joinForm.querySelector('input');
const createFrom = document.querySelector('.create');
const createCode = createFrom.querySelector('input');

async function joinClass(e) {
    e.preventDefault();
    const code = joinCode.value;
    const response = await fetch(`https://testreactapp.me/class/${code}`);
    const data = await response.json();
    console.log(data);
    joinForm.reset();
}

async function createClass(e) {
    e.preventDefault();
    const code = createCode.value;
    const requestHeaders = {
        "Content-Type": 'application/json',
        authorization: `Bearer ${document.cookie}`
    };
    const response = await fetch('https://testreactapp.me/class', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({code})
    });
    const data = await response.text();
    console.log(data);
    createFrom.reset();
}

joinForm.addEventListener('submit', joinClass);
createFrom.addEventListener('submit', createClass);