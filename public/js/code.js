const classCodeContainer = document.querySelector('.codes');
const classCodes = [];

try {
    const codes = localStorage.getItem('codes');
    console.log(codes.split(','));
    // classCodes = JSON.parse(codes);
    console.log(classCodes);
    classCodes.forEach(code => {
        const codeDiv = document.createElement('div');
        codeDiv.classList.add('code__card');
        codeDiv.innerHTML = `${code}`;
        classCodeContainer.append(codeDiv);
    });
} catch (error) {
    console.log(error);
}
