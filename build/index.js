document.addEventListener('DOMContentLoaded', function(){
    // input
    let totalBudget = document.getElementById('budget');
    let useAmount = document.getElementById('user-amount');
    // 
    let budgetErrorMessage = document.getElementById('budget-error');
    let productTitle = document.getElementById('product-title');
    let productTitleErrorMessage = document.getElementById('product-title-error');

    // get buttons 
    let totalAmountBtn = document.getElementById('total-amount-button');
    let checkAmountBtn =document.getElementById('check-amount');
    // 
    const amount=document.getElementById('amount');
    const expenditureAmount = document.getElementById('expenditure-amount');
    const balanceAmount = document.getElementById('balance-amount');
    // 
    const list  =document.getElementById('list');

    let tempAmount = 0;
    /*----------------------------------------------*/
    totalAmountBtn.addEventListener('click', ()=>{
       tempAmount = totalBudget.value;
         console.log(tempAmount);

        if(tempAmount === "" || tempAmount < 0){
            budgetErrorMessage.classList.remove('hide');
        }else{
            budgetErrorMessage.classList.add('hide');
            /*----------setBudget----------------*/
            amount.innerHTML = tempAmount;
            /*----------setBalance----------------*/
            balanceAmount.innerText = tempAmount - expenditureAmount.innerText;

            totalBudget.value="";
        }
    });
    /*------------ function to disable, edit or delete button ---------------------*/

    const disableButtons = (bool) =>{
        let editButtons = document.getElementsByClassName('edit');
        Array.from(editButtons).forEach((element)=>{
            element.disabled = bool;
        });
    };

    // Function to modify the List elements 
    const modifyElement  =(element, edit=false)=>{
        let parentDiv = element.parentElement;
        console.log(parentDiv)
        let currentBalance  = balanceAmount.innerText;
        console.log(currentBalance);
        let currentExpense = expenditureAmount.innerText;
        console.log(currentExpense);
        let parentAmount= parentDiv.querySelector(".amount").innerText;
        console.log(parentDiv.querySelector(".product").innerText)
        console.log(parentAmount);

        if(edit){
            let parentText = parentDiv.querySelector(".product").innerText;
            productTitle.value = parentText;
            useAmount.value = parentAmount;
            disableButtons(true);
        }

        balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);

        expenditureAmount.innerText = parseInt(currentExpense) - parseInt(parentAmount);
        parentDiv.remove();
    };

    // Function to create Expense List
    const listCreator =(expenseName, expenseValue )=>{
        let sublistContent = document.createElement('div');
        sublistContent.classList.add('sublist-content','flex-space','flex',"justify-between");

        list.appendChild(sublistContent);

        sublistContent.innerHTML =  `<p class="product w-full">${expenseName}</p><p class="amount w-full">${expenseValue}</p>`;

        let editButton = document.createElement('button');
        editButton.classList.add('edit','icon','ion-md-create', 'w-full');
        editButton.style.fontSize='24px';
        editButton.addEventListener('click', ()=>{
            modifyElement(editButton, true);
        });

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete','icon', 'ion-md-trash','w-full');
        deleteButton.style.fontSize= '24px';
        deleteButton.addEventListener('click', ()=>{
            modifyElement(deleteButton);
        });

        sublistContent.appendChild(editButton);
        sublistContent.appendChild(deleteButton);

        document.getElementById('list').appendChild(sublistContent);
    }
    // function to add expense 
    checkAmountBtn.addEventListener('click', ()=>{
        if(!useAmount.value || !productTitle.value){
            productTitleErrorMessage.classList.remove('error');
            return false;
        };

        // enable buttons
        disableButtons(false);
        // Expense
        let expenditure = parseInt(useAmount.value);
        // Total expense (existing + new)
        let sumExpense = parseInt(expenditureAmount.innerText)+ expenditure;

        // expenses
        expenditureAmount.innerText = sumExpense;
        // Total balance(budget - total expense)
        const totalBalance = tempAmount - sumExpense;
        balanceAmount.innerText = totalBalance;

        listCreator(productTitle.value, useAmount.value);
        // empty Inputs
        productTitle.value = "";
        useAmount.value = "";
    })
})