const inputAmount = document.querySelector("#inputAmount");
const inputDesc = document.querySelector("#inputDesc");
const element = document.querySelector("#btnAddExpense");
const displayTable = document.querySelector("#expenseTable");
const headingTotal = document.querySelector("#headingTotal");
let totalAmount = 0;
let totalExpenseArray=[]

function onClickAddItemHandler(){

    
    const textAmount = inputAmount.value;
    const expense = parseInt(textAmount, 10);
    const desc = inputDesc.value;
    const moment = new Date();
    inputAmount.value="";
    inputDesc.value="";
    totalAmount+=expense;
    headingTotal.textContent = `Total:${totalAmount}`;
    let expenseObj = { expense,desc, moment }
    totalExpenseArray.push(expenseObj);
    renderList(totalExpenseArray);

}

//controller functions

function getDateString(moment){
    return moment.toLocaleDateString('en-us',{
         year:'numeric', 
         month:'long', 
         day:'numeric'
        });
}

function deleteItem(dateValue){  
    const newArray = totalExpenseArray.filter(expense => {
        if(expense.moment.valueOf()=== dateValue){
            totalAmount-=expense.expense;
            headingTotal.textContent = `Total:${totalAmount}`;
        }
        return(
            expense.moment.valueOf()!== dateValue
        );
        })

    totalExpenseArray = newArray;
    renderList(totalExpenseArray);

      
};

function renderList(arrayList){
    let newArrayHTML = arrayList.map( expense => createListItem(expense) )
    displayTable.innerHTML = newArrayHTML.join("");  
};

function createListItem({desc, expense, moment}){
    return(
        `<li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
            ${desc}
            <small class="text-muted">${getDateString(moment)}</small>
        </div>
        <div>
            <span class="px-5">
                ${expense}
            </span>
            <button 
             type="button" 
             class="btn btn-outline-danger btn-sm"
             onclick = "deleteItem(${moment.valueOf()})"
            >
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </li>
    `
    )
       
} 


element.addEventListener("click", onClickAddItemHandler, false)