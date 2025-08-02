const seedColorInput = document.getElementById('seed-color');
const colorSchemeSelect = document.getElementById('color-scheme');
const getColorsSchemeButton = document.getElementById('get-color-scheme');
const colorSchemeDisplay = document.querySelector('.color-scheme-display');
const colorLabels = document.querySelectorAll('.color-label');


getColorsSchemeButton.addEventListener('click', () => {
    const seedColor = seedColorInput.value.replace('#','');
    const colorScheme = colorSchemeSelect.value;
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorScheme}`)
        .then(response => response.json())
        .then(data => {
            colorSchemeDisplay.innerHTML = '';  
            data.colors.forEach((color,index)=>{
                console.log(`${index + 1}: ${color.hex.value}`);
                const colorItem = document.createElement('figure');
                colorItem.classList = 'color-item';
                //render tiap color
                colorItem.innerHTML = `
                    <div class="color-box" style="background-color: ${color.hex.value};"></div>
                    <figcaption class="color-label" data-hex="${color.hex.value}">${color.hex.value}</figcaption>
                `;
                colorSchemeDisplay.appendChild(colorItem);      
            })
        })
        .catch(error => {
            console.error('Error fetching color scheme:', error);
        });
})

// Add event listener to each color label to copy hex value to clipboard

colorSchemeDisplay.addEventListener('click', (event)=> {
        const hexValue = event.target.dataset.hex;
        navigator.clipboard.writeText(hexValue)
        seedColorInput.value = hexValue; // Update seed color input with the copied hex value
        alert(`Copied ${hexValue} to clipboard!`); 
    })