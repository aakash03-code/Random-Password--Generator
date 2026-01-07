const passwordDisplay = document.getElementById('passwordDisplay');
const lengthSlider = document.getElementById('lengthSlider');
const lengthLabel = document.getElementById('lengthLabel');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Update length display as slider moves
lengthSlider.addEventListener('input', (e) => {
    lengthLabel.textContent = e.target.value;
});

function generatePassword() {
    let charset = "";
    let password = "";
    
    // Check which criteria are selected
    if (document.getElementById('uppercase').checked) charset += charSets.uppercase;
    if (document.getElementById('lowercase').checked) charset += charSets.lowercase;
    if (document.getElementById('numbers').checked) charset += charSets.numbers;
    if (document.getElementById('symbols').checked) charset += charSets.symbols;

    if (charset === "") {
        alert("Please select at least one character type!");
        return;
    }

    const length = parseInt(lengthSlider.value);

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    passwordDisplay.value = password;
}

// Copy to Clipboard logic
copyBtn.addEventListener('click', () => {
    if (!passwordDisplay.value) return;
    
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        // Simple success feedback
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="text-xs text-green-400 font-bold">Copied!</span>';
        setTimeout(() => copyBtn.innerHTML = originalIcon, 2000);
    });
});

generateBtn.addEventListener('click', generatePassword);

// Generate one on load
window.onload = generatePassword;