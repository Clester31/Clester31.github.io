const copyBtn = document.getElementById('copy-btn');
const copiedFlash = document.getElementById('copy-flash');

let passwordField = document.getElementById('password-output');
let strengthContainer = document.getElementById('sc');

let upperCheck = document.querySelector('#upper-check');
let numCheck = document.querySelector('#num-check');
let symCheck = document.querySelector('#sym-check');
const genBtn = document.getElementById('gen');

const symbols = [33, 35, 36, 37, 38, 40, 41, 42, 43, 63, 64];
const nums = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const uc = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
const lc = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];

function updateTextInput(val) {
    document.getElementById('textInput').textContent = val; 
}

const copyContent = async () => {
    try {
        await navigator.clipboard.writeText(passwordField.textContent);
        console.log("success");
    } catch (err) {
        console.log("failed");
    }
}

copyBtn.addEventListener('click', () => {
    copyContent();

    copiedFlash.style.opacity = '100';

    setTimeout(() => {
        copiedFlash.style.opacity= '0';
    }, 2000);
    
});


genBtn.addEventListener('click', () => {
    let boxesChecked = 1;
    const fullChars = [];
    fullChars.push(lc);
    let password = '';

    if(upperCheck.checked) {
        fullChars.push(uc);
        boxesChecked++;
    }

    if(numCheck.checked) {
        fullChars.push(nums);
        boxesChecked++;
    }

    if(symCheck.checked) {
        fullChars.push(symbols)
        boxesChecked++;
    }

    for(let i = 0; i < document.getElementById('textInput').textContent; i++) {
        let selectedArr = Math.floor(Math.random() * ((fullChars.length - 1) - 0 + 1) + 0);
        let selectedElement = Math.floor(Math.random() * ((fullChars[selectedArr].length - 1) - 0 + 1) + 0);
        const letter = String.fromCharCode(fullChars[selectedArr][selectedElement]);
        password = password.concat(letter);
    }
    passwordField.innerHTML = `<h2>${password}<h2>`;
    
    let strength = (document.getElementById('textInput').textContent * (boxesChecked * 2));

    console.log(strength);

    if(strength <= 20) {
        strengthContainer.innerHTML = `<h3 style="color:red;">Bad<h3>`;
    } 
    else if (strength <= 30) {
        strengthContainer.innerHTML = `<h3 style="color:orange;">Weak<h3>`;
    }
    else if (strength <= 80) {
        strengthContainer.innerHTML = `<h3 style="color:yellow;">Moderate<h3>`;
    }
    else if (strength <= 110) {
        strengthContainer.innerHTML = `<h3 style="color:lime;">Strong<h3>`;
    } 
    else {
        strengthContainer.innerHTML = `<h3 style="color:aqua;">Very Strong<h3>`;
    }
});
