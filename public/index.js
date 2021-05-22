const inputAmount = document.querySelector("#inputAmount");
const inputDesc = document.querySelector("#inputDesc");
const element = document.querySelector("#btnAddExpense");
const displayTable = document.querySelector("#expenseTable");
const headingTotal = document.querySelector("#headingTotal");
let totalAmount = 0;
//let totalExpenseArray=[]

function onClickAddItemHandler(){

    const textAmount = inputAmount.value;
    const expense = parseInt(textAmount, 10);
    const desc = inputDesc.value.trim();
    
    if(!isNaN(expense)){
        addExpenseOnFireStore(expense, desc)
        inputAmount.value="";
        inputDesc.value="";
       // totalAmount+=expense;
    }else{
        alert("check your input!")
    }
    //headingTotal.textContent = `Total:${totalAmount}`;
    //const moment = new Date();
    //let expenseObj = { expense,desc, moment }
    //totalExpenseArray.push(expenseObj);
    //console.log(totalExpenseArray);
    //renderList(totalExpenseArray);
}
getDocuments()

//controller functions

function getDateString(moment){
    return moment.toDate().toLocaleDateString('en-us',{
         year:'numeric', 
         month:'long', 
         day:'numeric'
        });
}

function deleteItem(docId, amount){  
    console.log("in delete2 ");
    deleteFromFirebase(docId, amount);    
};

function renderList(arrayList){
    let newArrayHTML = arrayList.map( expense => createListItem(expense) )
    displayTable.innerHTML = newArrayHTML.join("");  
};

function createListItem({desc, amount, createdAt, docId}){
    return(
        `<li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
            ${desc}
            <small class="text-muted">${getDateString(createdAt)}</small>
        </div>
        <div>
            <span class="px-5">
                ${amount}
            </span>
            <button 
            type="button" 
            class="btn btn-outline-danger btn-sm"
            onClick="deleteItem('${docId}', ${amount})"
            >
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </li>
    `
    )
       
} 


element.addEventListener("click", onClickAddItemHandler, false)