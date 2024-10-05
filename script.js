// Generates input fields for matrix
function genemtx() {
    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);
    const matrixInputDiv = document.getElementById('mtxinp');
    document.getElementById('result').innerText = '';
    matrixInputDiv.innerHTML = ''; // Clear previous input fields
    
    if (rows > 0 && columns > 0) {
        const table = document.createElement('table');

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < columns; j++) {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.placeholder = `${i+1},${j+1}`;
                input.id = `cell-${i}-${j}`;
                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        matrixInputDiv.appendChild(table);
        document.getElementById('calc').style.display = 'block';
        toggleContainers();
    }
}

// Function to go back to the input container
function goBack() {
    document.getElementById('matrixContainer').classList.add('hidden');
    document.getElementById('inputContainer').classList.remove('hidden');
    document.getElementById('calc').style.display = 'none'; // Hide calculate button when going back
}

// Calculate rank
function calcrank() {
    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);
    const matrix = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: columns }, (_, j) =>
            parseFloat(document.getElementById(`cell-${i}-${j}`).value) || 0
        )
    );
    const rank = calculateMatrixRank(matrix);
    document.getElementById('result').innerText = `Rank of the matrix: ${rank}`;
}

// Correct Rank calculation logic using Gaussian elimination
function calculateMatrixRank(matrix) {
    let rows = matrix.length;
    let columns = matrix[0].length;
    let rank = columns;

    for (let row = 0; row < rank; row++) {
        // Check if the diagonal element is non-zero
        if (matrix[row][row] !== 0) {
            for (let col = 0; col < rows; col++) {
                if (col !== row) {
                    const mult = matrix[col][row] / matrix[row][row];
                    for (let i = 0; i < columns; i++) {
                        matrix[col][i] -= mult * matrix[row][i];
                    }
                }
            }
        } else {
            // Find a non-zero element in the same column and swap rows
            let reduce = true;
            for (let i = row + 1; i < rows; i++) {
                if (matrix[i][row] !== 0) {
                    [matrix[row], matrix[i]] = [matrix[i], matrix[row]];
                    reduce = false;
                    break;
                }
            }
            if (reduce) {
                rank--;
                for (let i = 0; i < rows; i++) {
                    matrix[i][row] = matrix[i][rank];
                }
            }
            row--;
        }
    }
    return rank;
}

// Toggle between input and matrix containers
function toggleContainers() {
    document.getElementById('inputContainer').classList.toggle('hidden');
    document.getElementById('matrixContainer').classList.toggle('hidden');
}
