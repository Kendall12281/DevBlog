
function Clicked(email){
    
    const reset = document.querySelector(".reset");
    // const error = document.querySelector(".error__handler");
    
    reset.addEventListener("click", function (){
        const error2 = document.querySelector(".error");

        console.log(email.length)
        if(email.length < 1){
            error2.textContent = "Must enter email address"
            error2.classList.add("error__handler")
        }else{
            error2.classList.remove("error__handler")
            error2.textContent = ""
        }

    })
}

export {Clicked}