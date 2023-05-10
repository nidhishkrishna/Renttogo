const add=document.querySelector("#b1");


add.addEventListener('click',async()=>{
    const name=String(document.querySelector("#name").value);
    const email= String(document.querySelector("#email").value);
    const mno=String(document.querySelector("#mno").value);
    const pass=String(document.querySelector("#pass").value);
    const loc=String(document.querySelector("#loc").value);
    
    if(name==""||email==""||mno==""||pass==""||loc=="") {
        alert("ENTER YOUR DETAILS");
    }
    
        else{
           
        fetch('http://localhost:5000',{
            mode:'cors',
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                email:email,
                mno:mno,
                pass:pass,
                loc:loc
                
            })
        })
        .then(async(e)=>{
            alert("LOGIN SUCCESSFULL");
            
        })
        .catch(async()=>{
            console.log("ERROR");
            result.innerHTML="ERROR";
        })
       
        }}

)