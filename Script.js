// document.addEventListener('DOMContentLoaded',()=>{
//           //reference of all the html part;
//           const expenseForm = document.getElementById("expense-form");
//           const expenseNameInput = document.getElementById("expense-name");
//           const expenseAmountInput = document.getElementById("expense-amount");
//           const expenseList = document.getElementById("expense-list");
//           const totalAmountDisplay = document.getElementById("total-amount");
//           //create an array
//           let expenses = [];
//           //take variabel total amount and call the another function;
//           let totalamount=calculatetotal();
//           //create calculatetotal function;
//           expenseForm.addEventListener('submit',(e)=>{
//                     //previent default;
//                     e.preventDefault();
//                     const name = expenseNameInput.value.trim( );
//                    const amount = parseFloat(expenseAmountInput.value.trim());
//                    if(name!=="" && ! isNaN(amount) && amount>0){
//                     const newExpense={
//                               id:Data.now(),
//                               name:name,
//                               amount:amount,
//                     };
//                     expenses.push(newExpense);
//                     saveExpensesTolocal();
//                    }
//           });
//           function calculatetotal(){
//                     localStorage.setItem("expenses",JSON,stringify(expenses));
//           }
//           function saveExpensesTolocal(){
//                     localStorage.setItem('expenses',JSON.stringify(expenses));
//           }
// });


document.addEventListener('DOMContentLoaded', () => {
          // Get references to HTML elements
          const expenseForm = document.getElementById("expense-form");
          const expenseNameInput = document.getElementById("expense-name");
          const expenseAmountInput = document.getElementById("expense-amount");
          const expenseList = document.getElementById("expense-list");
          const totalAmountDisplay = document.getElementById("total-amount");
      
          // Load existing expenses from local storage
          let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      
          // Display existing expenses
          displayExpenses();
      
          // Form submit event listener
          expenseForm.addEventListener('submit', (e) => {
              e.preventDefault();
      
              const name = expenseNameInput.value.trim();
              const amount = parseFloat(expenseAmountInput.value.trim());
      
              if (name !== "" && !isNaN(amount) && amount > 0) {
                  const newExpense = {
                      id: Date.now(),
                      name: name,
                      amount: amount,
                  };
      
                  expenses.push(newExpense);
                  saveExpensesToLocalStorage();
                  displayExpenses();
      
                  // Clear input fields
                  expenseNameInput.value = "";
                  expenseAmountInput.value = "";
              }
          });
      
          // Function to display expenses
          function displayExpenses() {
              expenseList.innerHTML = "";
              let totalAmount = 0;
      
              expenses.forEach(expense => {
                  totalAmount += expense.amount;
      
                  const li = document.createElement("li");
                  li.innerHTML = `
                      ${expense.name}: $${expense.amount.toFixed(2)}
                      <button class="delete-btn" data-id="${expense.id}">X</button>
                  `;
      
                  expenseList.appendChild(li);
              });
      
              totalAmountDisplay.textContent = totalAmount.toFixed(2);
      
              // Add event listener to delete buttons
              document.querySelectorAll(".delete-btn").forEach(button => {
                  button.addEventListener("click", (e) => {
                      const id = Number(e.target.getAttribute("data-id"));
                      deleteExpense(id);
                  });
              });
          }
      
          // Function to delete an expense
          function deleteExpense(id) {
              expenses = expenses.filter(expense => expense.id !== id);
              saveExpensesToLocalStorage();
              displayExpenses();
          }
      
          // Function to save expenses to local storage
          function saveExpensesToLocalStorage() {
              localStorage.setItem("expenses", JSON.stringify(expenses));
          }
      });
      