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

      
        setTimeout(getTotal,1000);
        //getDocuments()
}

function getTotal(){
    db.collection("expenses")
                    .doc("total")
                    .get()
                    .then((doc)=>{
                            console.log("docDATA:",doc.data().total);
                            headingTotal.textContent = `Total:${doc.data().total}`;
                    });
}


function getDocuments(){

    db.collection("expenses")
        .orderBy("createdAt", "desc")
        .onSnapshot((snap)=>{
            let documents=[];
            snap.forEach((doc)=>{
                    console.log(doc.id);
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
    setTimeout(getTotal,1000);
   // getDocuments();  
}