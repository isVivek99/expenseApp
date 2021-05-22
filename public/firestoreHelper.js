function addExpenseOnFireStore(expense, textDesc){
    console.log("addexpense!");
    db.collection("expenses")
        .add({
            amount:expense, 
            desc:textDesc,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docref)=>{
            console.log("document written with ID ", docref.id);
        })
        .catch((error)=>{
            console.log("error in adding doc",error)
        });

        db.collection("expenses")
        .doc("total")
        .update({
            total:firebase.firestore.FieldValue.increment(expense)
        });
        headingTotal.textContent = `Total:${doc.data().total}`;
       // getTotal()
}

function getTotal(){
    db.collection("expenses")
    .doc("total")
    .get()
    .then((doc)=>{
        if(doc.exists){
            console.log(doc.data().total);
            headingTotal.textContent = `Total:${doc.data().total}`;
        }
    });
    console.log("updated list");
}


function getDocuments(){

    db.collection("expenses")
        .orderBy("createdAt", "desc")
        .onSnapshot((snap)=>{
            let documents=[];
            snap.forEach((doc)=>{
                    documents.push({
                        ...doc.data(),
                        docId:doc.id,
                    })
                }
            )
            renderList(documents);
        }
        )
    db.collection("expenses")
                    .doc("total")
                    .get()
                    .then((doc)=>{
                        if(doc.exists){
                            console.log(doc.data().total);
                            headingTotal.textContent = `Total:${doc.data().total}`;
                        }
                    });
                    console.log("updated list");
    
}

function deleteFromFirebase(docId, amount){
    console.log(amount);
    db.collection("expenses")
    .doc(docId)
    .delete()
    .then(() => {
       console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  db.collection("expenses")
    .doc("total")
    .update({
        
      total: firebase.firestore.FieldValue.increment(-amount),
    });
    //getTotal()  
    headingTotal.textContent = `Total:${doc.data().total}`;
}