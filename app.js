
const provinceChanged = () => {
    // console.log("province state changed")
    if ( document.querySelector("#custProvince").value === "British_Columbia"){
        // console.log("bc selected");
        document.querySelector("#custSolar").checked = true;
    }else {
        // console.log("bc not selected");
        document.querySelector("#custSolar").checked = false;
    }
}

const calcButtonPressed = () => {

    // console.log("calculate button pressed");

    // retrieve data from fields
    const custName = document.querySelector("#custName").value;
    const custEmail = document.querySelector("#custEmail").value;
    const unitsMorning = parseInt(document.querySelector("#unitsMorning").value);
    const unitsAfternoon = (document.querySelector("#unitsAfternoon").value === "") ? 0 : parseInt(document.querySelector("#unitsAfternoon").value);
    const unitsEvening = (document.querySelector("#unitsEvening").value === "")? 0 : parseInt(document.querySelector("#unitsEvening").value);
    const custProvince = document.querySelector("#custProvince").value;
    const custSolar = document.querySelector("#custSolar").checked;

    console.log(custName, custEmail, unitsMorning, unitsAfternoon, unitsEvening, custProvince, custSolar);



    // validate entries
    // if( custName === "" || custEmail === "" || isNaN(unitsMorning) || custProvince === ""){
    //     alert("\nThese fields are mandatory:\n\n\u2022 Customer Name,\n\u2022 Customer Email,\n\u2022 Amount of electricity used in the morning, in kilowatt hours (kwh),\n\u2022 Customer Province.");
    //     return;
    // }

    // if( custName === "" ){
        
    // }else if (custEmail === "" ){

    // } else if(isNaN(unitsMorning)){

    // } else if(custProvince === ""){
        
    // }




    const costMorning = (unitsMorning*0.25);
    const costAfternoon = (unitsAfternoon*0.31);
    const costEvening =  (unitsEvening*0.4);
    const costTotal = costMorning + costAfternoon + costEvening;
    const solarDiscount = custSolar ? costTotal*0.2 : 0;
    const provinceCredit = (custProvince === "British_Columbia") ? 50 : 0;
    const subTotal = costTotal - solarDiscount - provinceCredit;
    const tax = ((custProvince === "British_Columbia") ? subTotal*0.15 : ((custProvince === "Alberta") ? 0 : (subTotal*0.07)));
    const finalTotal = subTotal + tax;


    


}

document.querySelector("#btn-calc").addEventListener("click", calcButtonPressed);
document.querySelector("#custProvince").addEventListener("change", provinceChanged);