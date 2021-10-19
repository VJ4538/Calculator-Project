//Variables
const keys=document.querySelectorAll(".key");
const rawResult=document.querySelector(".raw-result");
const finalResult=document.querySelector(".final-result");
const keysArray=[...keys];
const themeSwitch=[...document.querySelectorAll(".theme")];
const theme1=document.getElementById("theme1");
const theme2=document.getElementById("theme2");
const themes=[theme1,theme2];
const signs=["-","+","x","/"];
let resultNumber=[];
let singleNumber=[0];
let firstNum;
let secondNum;
let sign;

//Set initial to 0
finalResult.innerHTML="0";

//Display raw result with signs
function displayRawResult(){
    rawResult.innerHTML=resultNumber.join("");
}

//Display Final result
function displayResult(){
   finalResult.innerHTML=singleNumber.join("");
}

//Calculate and store num to firstNum
function calculate(first,sign,second){
   switch(sign){
       case "-":
           firstNum=first-second;
           break;
        case "+":
            firstNum=first+second;
            break;
        case "x":
            firstNum=first*second;
            break;
        case "/":
            firstNum=first/second;
            break;
   }
}

//Calculator key event listener 
keysArray.forEach((each)=>{
    let temp=each.innerHTML;
    each.addEventListener("click", ()=>{
        switch(temp){
            case "Del":
                singleNumber.pop();
                displayResult();
            break;
            case "RESET":
                resultNumber=[];
                singleNumber=[];
                firstNum=undefined;
                secondNum=undefined;
                rawResult.textContent="";
                finalResult.textContent="0";
            break;
            case "=":
                if(resultNumber.includes("=")&&resultNumber.includes(sign)){
                    //set and display raw result with signs
                    resultNumber=[...String(firstNum).split(""),sign,...String(secondNum).split(""),"="]
                    displayRawResult();
                    //Calculate
                    calculate(firstNum,sign,secondNum);
                    //set and display outcome
                    singleNumber=[...String(firstNum).split("")];
                    displayResult();
                    
                }else if(firstNum===undefined&&secondNum===undefined)
                {   
                    //clear duplicate 0 when first number is 0 
                    if(singleNumber[0]===0){
                        singleNumber=[0];
                    }
                    displayResult();
                }else{
                    secondNum=Number(singleNumber.join(""));
                    singleNumber=[];
                    calculate(firstNum,sign,secondNum);
    
                    resultNumber.push(...String(secondNum).split(""))
                    resultNumber.push("=");
                    displayRawResult();
    
                    singleNumber=String(firstNum).split("");
                    displayResult();
                }

            break;

            default:
                //Remove 0 in front
                if(temp=="0"&&singleNumber[0]==="0"){
                    finalResult.innerHTML="0";
                    singleNumber.shift();
                }else {
                    if(singleNumber[0]=="0"){
                        singleNumber.shift();
                        singleNumber.push(temp);
                        displayResult();
                    }else if(signs.includes(temp)===false){
                        if(singleNumber.length<30){
                            singleNumber.push(temp);
                            displayResult();
                        }else{
                            alert("Number too big");
                        }
                    }
                  
                }
            break;
        }
        
        if(signs.includes(temp)){
            switch(temp){
                case "-":
                    sign="-"
                    break;
                case "+":
                    sign="+"
                    break;
                case "x":
                    sign="x"
                    break;
                case "/":
                    sign="/"
                    break;
            }
            if(firstNum===undefined){
                firstNum=Number(singleNumber.join(""));
                resultNumber.push(...singleNumber);
                resultNumber.push(sign);
                displayRawResult();
            }else if(firstNum!==undefined&&resultNumber.includes("=")===false){
                secondNum=Number(singleNumber.join(""));
                calculate(firstNum,sign,secondNum);
                
                resultNumber=[...String(firstNum).split(""),sign];
                displayRawResult();
                
                singleNumber=String(firstNum).split("");
                displayResult();
            }else if(resultNumber.includes("=")){
                resultNumber=[...String(firstNum).split(""),sign];
                displayRawResult();
            }
            singleNumber=[];
        }

    });
})

//Theme Switch
themeSwitch.forEach((each)=>{
    each.addEventListener("click",()=>{
        switch(each.value){
            case "1":
                document.body.classList.remove('theme2',"theme3");
                break;
            case "2":
                document.body.classList.remove('theme1',"theme3");
                document.body.classList.add("theme2");
                break;
            case "3":
                document.body.classList.remove('theme1',"theme2");
                document.body.classList.add("theme3");
                break;
        }
    })
})




