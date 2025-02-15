let currentValue = '';
const inputField = document.getElementById('input_number');

function updateDisplay() {
  inputField.value = currentValue;
}

function appendNumber(number) {
  currentValue += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentValue === '') return;
  const lastChar = currentValue[currentValue.length - 1];
  if ('+-*/'.includes(lastChar)) {
    currentValue = currentValue.slice(0, -1);
  }
  currentValue += operator;
  updateDisplay();
}

function appendDot() {
  const lastNumber = currentValue.split(/[\+\-\*\/]/).pop();
  if (!lastNumber.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
}

function clearInput() {
  currentValue = '';
  updateDisplay();
}

function calculateResult() {
  try {
    if (currentValue.trim() === '') return;
    // Evaluate the expression safely
    // Use a safe math expression evaluator
    currentValue = evaluateExpression(currentValue).toString();
  } catch (error) {
    currentValue = 'Error';
  }
  updateDisplay();
}

function evaluateExpression(expr) {
  // Simple evaluator for basic arithmetic expressions
  // Supports +, -, *, /
  // Does not use eval() or Function()
  // Note: For complex expressions, consider using a library like math.js

  // Remove invalid characters
  expr = expr.replace(/[^-()\d/*+.]/g, '');

  // Evaluate the expression
  // Here we can use a simple parser or regular expressions

  // Split the expression into numbers and operators
  let numbers = expr.split(/[\+\-\*\/]/).map(Number);
  let operators = expr.replace(/[^\+\-\*\/]/g, '').split('');

  // Perform multiplication and division first
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '/') {
      const result = operators[i] === '*'
        ? numbers[i] * numbers[i + 1]
        : numbers[i] / numbers[i + 1];

      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--; // Adjust index after modification
    }
  }

  // Perform addition and subtraction
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    result = operators[i] === '+'
      ? result + numbers[i + 1]
      : result - numbers[i + 1];
  }

  return result;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  // Update button text
  const mode = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  document.getElementById('toggle-dark-mode').innerText = mode;
  // Save user preference
  localStorage.setItem('theme', mode);
}

// Load user preference on page load
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'Light Mode') {
    document.body.classList.add('dark-mode');
    document.getElementById('toggle-dark-mode').innerText = 'Light Mode';
  } else {
    document.getElementById('toggle-dark-mode').innerText = 'Dark Mode';
  }
});
