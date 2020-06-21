const classCodeContainer = document.querySelector('.codes');
const classCodes = [];

try {
    classCodes = JSON.parse(localStorage.getItem('codes'));
    console.log(classCodes);
    classCodes.forEach(code => {
        const codeDiv = document.createElement('div');
        codeDiv.classList.add('code__card');
        codeDiv.innerHTML = `${code}`;
        classCodeContainer.append(codeDiv);
    })
} catch (error) {
    classCodes = [];
}
