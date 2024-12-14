// Getting the input memory blocks sizes.
function generateBlockInputs() {

    const numBlocks = document.getElementById("blocks-count").value;  // Taking the user inputs for the varible
    const blockInputsDiv = document.getElementById("block-inputs");
    blockInputsDiv.innerHTML = "";  
    
    for (let i = 1; i <= numBlocks; i++) {
        blockInputsDiv.innerHTML += 
        `<label for="block-${i}">Enter the Size of Block ${i} </label>
        <input type="number" id="block-${i}" min="1">`;
    }
}

// Getting the processes sizes
function generateProcessInputs() {
    const numProcesses = document.getElementById("processes-count").value;
    const processInputsDiv = document.getElementById("process-inputs");
    processInputsDiv.innerHTML = ""; 

    for (let i = 1; i <= numProcesses; i++) {
        processInputsDiv.innerHTML += 
        `<label for="process-${i}">Memory Required for Process ${i}:</label>
        <input type="number" id="process-${i}" min="1">`;
    }
}

function allocateMemory() {
    const numBlocks = parseInt(document.getElementById("blocks-count").value);
    const numProcesses = parseInt(document.getElementById("processes-count").value);

    // Getting the sizes of memory blocks of each input 
    const blocks = [];
    for (let i = 0; i < numBlocks; i++) {
        blocks.push(parseInt(document.getElementById(`block-${i + 1}`).value));
    }

    // Get memory required sizes for each processes
    const processes = [];
    for (let i = 0; i < numProcesses; i++) {
        processes.push(parseInt(document.getElementById(`process-${i + 1}`).value));
    }

    
    const allocation = worstFit(blocks, processes); // Call worst_fit function
    displayResults(allocation); // Display results
}


function resetForm() {
    // Reset the enetred inputs for blocks and processes 
    document.getElementById("blocks-count").value = "";
    document.getElementById("processes-count").value = "";
    
    document.getElementById("block-inputs").innerHTML = "";
    document.getElementById("process-inputs").innerHTML = "";

    // Remoes the results generated 
    document.getElementById("allocation-results").innerHTML = "";
    document.getElementById("remaining-blocks").innerHTML = "";
}



function worstFit(blocks, processes) {
    const allocation = Array(processes.length).fill(-1);

    for (let i = 0; i < processes.length; i++) {
        
        let worstIdx = -1;

        for (let j = 0; j < blocks.length; j++) {
            if (blocks[j] >= processes[i] && (worstIdx === -1 || blocks[j] > blocks[worstIdx])) {
                worstIdx = j;
            }
        }

        if (worstIdx !== -1) {
            allocation[i] = worstIdx;
            blocks[worstIdx] -= processes[i];
        }
    }

    return [allocation, blocks];
}



function displayResults([allocation, remainingBlocks]) {
    const allocationResults = document.getElementById("allocation-results");

    const remainingBlocksList = document.getElementById("remaining-blocks");


    // clears the values
    allocationResults.innerHTML = "";
    remainingBlocksList.innerHTML = "";

    allocation.forEach((alloc, i) => {
        if (alloc !== -1) {
            allocationResults.innerHTML += 
            `<li>Process ${i + 1} - Block ${alloc + 1}</li>`;
        } 
        else {
            allocationResults.innerHTML += 
            `<li>Process ${i + 1} - Not Allocated</li>`;
        }
    });

    remainingBlocks.forEach((block, i) => {
        const blockSize = isNaN(block) ? 
            "No block found" : `${block} KB`;

        remainingBlocksList.innerHTML += 
            `<li>Block ${i + 1}: ${blockSize}</li>`;
    });
}
