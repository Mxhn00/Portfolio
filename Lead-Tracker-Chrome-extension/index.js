let savedInput = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const resetBtn = document.querySelector("#reset-btn")
const ulEl = document.querySelector("#ul-el");

let savedFromLocalStorage = JSON.parse(localStorage.getItem('savedInput'));

if (savedFromLocalStorage) {
    savedInput = savedFromLocalStorage;
    render();
}

inputBtn.addEventListener("click", function() {
    savedInput.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem('savedInput', JSON.stringify(savedInput));
    render();
});

resetBtn.addEventListener('dblclick', function() {
    localStorage.clear();
    savedInput = [];
    render();
});

function render() {
    let listItems = "";
    for (let i = 0; i < savedInput.length; i++) {
        listItems += `
        <li>
            <a 
            href="${savedInput[i]}" target="_blank"> 
                ${savedInput[i]}
            </a>
        </li>
    `;
        console.log(listItems);
    };
    ulEl.innerHTML = listItems;
};

