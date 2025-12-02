const clickSound = document.getElementById('clickSound');
const display = document.getElementById("display");
const precentage = document.getElementById("precent");
let firstValue = "";
let secondValue = "";
let operator = "";
let shouldReset = false;



function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', playClickSound);
});


// Handle number buttons
document.querySelectorAll("[data-value]").forEach(button => {
    button.addEventListener("click", () => {
        if (shouldReset) {
            display.textContent = "";
            shouldReset = false;
        }
        display.textContent =
            display.textContent === "0"
                ? button.dataset.value
                : display.textContent + button.dataset.value;
    });
});


// Handle operators (+ - × ÷)
document.querySelectorAll("[data-operator]").forEach(button => {
    button.addEventListener("click", () => {
        if (operator !== "") calculate();
        
        firstValue = display.textContent;
        operator = button.dataset.operator;
        shouldReset = true;
    });
})

// Handle equals (=)
document.querySelector("[data-equals]").addEventListener("click", () => {
    calculate();
});

// Handle clear (C)
document.querySelector("[data-clear]").addEventListener("click", () => {
    display.textContent = "0";
    firstValue = "";
    secondValue = "";
    operator = "";
});


document.getElementById("backspace").addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1) || "0";
});





// Calculator logic
function calculate() {
    if (operator === "") return;

    secondValue = display.textContent;

    const a = parseFloat(firstValue);
    const b = parseFloat(secondValue);

    let result = 0;

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b === 0 ? "Error" : a / b; break;
    }

    display.textContent = result;
    firstValue = result;
    operator = "";
    shouldReset = true;
}