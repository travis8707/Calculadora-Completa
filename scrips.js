let history = [];

// Función para mostrar/ocultar el panel de historial
function toggleHistoryPanel() {
    const historyPanel = document.getElementById('historyPanel');
    historyPanel.style.display = historyPanel.style.display === 'block' ? 'none' : 'block';
}

// Función para cambiar entre pestañas
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Función para insertar texto en el área de texto
function insertText(text) {
    const input = document.getElementById('manualInput');
    input.value += text;
    input.focus();
}

// Función para borrar todo el contenido del área de texto
function clearInput() {
    document.getElementById('manualInput').value = '';
    document.getElementById('result').innerText = '0';
}

// Función para borrar el último carácter del área de texto
function deleteLastCharacter() {
    const input = document.getElementById('manualInput');
    input.value = input.value.slice(0, -1);
}

// Función para calcular el problema escrito manualmente
function calculateManual() {
    const input = document.getElementById('manualInput').value;
    try {
        // Reemplazar funciones matemáticas avanzadas
        let expression = input
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/\^/g, '**')
            .replace(/pi/g, 'Math.PI')
            .replace(/e/g, 'Math.E')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/x/g, '1') // Reemplazar variables con valores temporales
            .replace(/y/g, '2')
            .replace(/z/g, '3');

        // Evaluar la expresión
        const result = eval(expression);
        document.getElementById('result').innerText = result;

        // Guardar en el historial
        history.push({ expression: input, result });
        updateHistory();
    } catch (error) {
        document.getElementById('result').innerText = 'Error: Expresión no válida';
    }
}

// Función para actualizar el historial
function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${index + 1}. ${item.expression} = ${item.result}</span>
            <button onclick="deleteHistoryItem(${index})">Eliminar</button>
        `;
        historyList.appendChild(li);
    });
}

// Función para eliminar un elemento del historial
function deleteHistoryItem(index) {
    history.splice(index, 1);
    updateHistory();
}

// Función para limpiar el historial
function clearHistory() {
    history = [];
    updateHistory();
}