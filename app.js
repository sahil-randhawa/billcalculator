// function to auto set solar on province change
const provinceChanged = () => {
  // console.log("province state changed")
  if (document.querySelector("#custProvince").value === "British_Columbia") {
    // console.log("bc selected");
    document.querySelector("#custSolar").checked = true;
  } else {
    // console.log("bc not selected");
    document.querySelector("#custSolar").checked = false;
  }
};

// event listener for province state change
document
  .querySelector("#custProvince")
  .addEventListener("change", provinceChanged);



// validate inputs live

  let nameCheck = false;
  let emailCheck = false;
  let unitsCheck = false;
  let provinceCheck = false;

  const nameValidity = () => {
    if(document.querySelector("#custName").value === "") {
        document.querySelector("#e-name").style.display = "inline";
        document.querySelector("#custName").style.border = "1px solid red"
    }else{
        document.querySelector("#e-name").style.display = "none";
        document.querySelector("#custName").style.border = "1px solid lightgrey"
        nameCheck = true;
    }
  }

  const emailValidity = () => {
    let emailText = document.querySelector("#custEmail").value;
    if( emailText === "") {
        document.querySelector("#e-email").innerText = "Required";
        document.querySelector("#e-email").style.display = "inline";
        document.querySelector("#custEmail").style.border = "1px solid red"
    }else if ( !(emailText.includes("@")) || !(emailText.includes(".")) ) {
        document.querySelector("#e-email").innerText = "Invalid Entry";
        document.querySelector("#e-email").style.display = "inline";
        document.querySelector("#custEmail").style.border = "1px solid red"
    }
    else{
        document.querySelector("#e-email").style.display = "none";
        document.querySelector("#custEmail").style.border = "1px solid lightgrey"
        emailCheck = true;
    }

  }
  const unitsMValidity = () => {
    let unitsMText = document.querySelector("#unitsMorning").value;
    if( unitsMText === "") {
        document.querySelector("#e-unitsM").innerText = "Required";
        document.querySelector("#e-unitsM").style.display = "inline";
        document.querySelector("#unitsMorning").style.border = "1px solid red"
    }
    else if ( unitsMText <= 0 ) {
        document.querySelector("#e-unitsM").innerText = "Invalid Entry";
        document.querySelector("#e-unitsM").style.display = "inline";
        document.querySelector("#unitsMorning").style.border = "1px solid red"
    }
    else{
        document.querySelector("#e-unitsM").style.display = "none";
        document.querySelector("#unitsMorning").style.border = "1px solid lightgrey"
        unitsCheck = true;
    }
  }
  
  const unitsAValidity = () => {
    let unitsMText = document.querySelector("#unitsAfternoon").value;
    if ( unitsMText < 0 ) {
        document.querySelector("#e-unitsA").innerText = "Invalid Entry";
        document.querySelector("#e-unitsA").style.display = "inline";
        document.querySelector("#unitsAfternoon").style.border = "1px solid red"
    }
    else{
        document.querySelector("#e-unitsA").style.display = "none";
        document.querySelector("#unitsAfternoon").style.border = "1px solid lightgrey"
        unitsCheck = true;
    }
  }
  
  const unitsEValidity = () => {
    let unitsMText = document.querySelector("#unitsEvening").value;
    if ( unitsMText < 0 ) {
        document.querySelector("#e-unitsE").innerText = "Invalid Entry";
        document.querySelector("#e-unitsE").style.display = "inline";
        document.querySelector("#unitsEvening").style.border = "1px solid red"
    }
    else{
        document.querySelector("#e-unitsE").style.display = "none";
        document.querySelector("#unitsEvening").style.border = "1px solid lightgrey"
        unitsCheck = true;
    }
  }

  const provinceValidity = () => {
    if(document.querySelector("#custProvince").value === "") {
        document.querySelector("#e-province").style.display = "inline";
        document.querySelector("#custProvince").style.border = "1px solid red"
    }else{
        document.querySelector("#e-province").style.display = "none";
        document.querySelector("#custProvince").style.border = "1px solid lightgrey"
        provinceCheck = true;
    }

  }

document.querySelector("#custName").addEventListener("focusout", nameValidity);
document.querySelector("#custEmail").addEventListener("focusout", emailValidity);
document.querySelector("#unitsMorning").addEventListener("focusout", unitsMValidity);
document.querySelector("#unitsAfternoon").addEventListener("focusout", unitsAValidity);
document.querySelector("#unitsEvening").addEventListener("focusout", unitsEValidity);
document.querySelector("#custProvince").addEventListener("focusout", provinceValidity);



// function to calculate and display the bill
const calcButtonPressed = () => {
  // console.log("calculate button pressed");

  // retrieve data from fields
  const custName = document.querySelector("#custName").value;
  const custEmail = document.querySelector("#custEmail").value;
  const unitsMorning = parseInt(document.querySelector("#unitsMorning").value);
  const unitsAfternoon =
    document.querySelector("#unitsAfternoon").value === ""
      ? 0
      : parseInt(document.querySelector("#unitsAfternoon").value);
  const unitsEvening =
    document.querySelector("#unitsEvening").value === ""
      ? 0
      : parseInt(document.querySelector("#unitsEvening").value);
  const custProvince = document.querySelector("#custProvince").value;
  const custSolar = document.querySelector("#custSolar").checked;

  console.log(
    custName,
    custEmail,
    unitsMorning,
    unitsAfternoon,
    unitsEvening,
    custProvince,
    custSolar
  );

  // validate entries

  nameValidity();
  emailValidity();
  unitsMValidity();
  provinceValidity();

  if( nameCheck === false || emailCheck === false|| unitsCheck === false || provinceCheck === false){
      alert("Please input valid data in the highlighted fields.");
      return;
  }




  // calculate the bill amount

  const costMorning = Math.round(unitsMorning * 0.25 * 100) / 100;
  const costAfternoon = Math.round(unitsAfternoon * 0.31 * 100) / 100;
  const costEvening = Math.round(unitsEvening * 0.4 * 100) / 100;
  const costTotal =
    Math.round((costMorning + costAfternoon + costEvening) * 100) / 100;
  const solarDiscount =
    Math.round((custSolar ? costTotal * 0.2 : 0) * 100) / 100;
  const provinceCredit = custProvince === "British_Columbia" ? 50 : 0;
  const subTotal = Math.round(((costTotal - solarDiscount - provinceCredit) >= 0 ? (costTotal - solarDiscount - provinceCredit) : 0)*100)/100;
  const tax =
    Math.round(
      (custProvince === "British_Columbia"
        ? subTotal * 0.15
        : custProvince === "Alberta"
        ? 0
        : subTotal * 0.07) * 100
    ) / 100;
  const finalTotal = Math.round((subTotal + tax) * 100) / 100;

  // set the values in receipt

  document.querySelector("#rct-name").innerText = custName;
  document.querySelector("#rct-email").innerText = custEmail;
  document.querySelector("#rct-costMorning").innerText = "$"+costMorning;
  document.querySelector("#rct-costAfternoon").innerText = "$"+costAfternoon;
  document.querySelector("#rct-costEvening").innerText = "$"+costEvening;
  document.querySelector("#rct-costTotal").innerText = "$"+costTotal;
  document.querySelector("#rct-solarDiscount").innerText = "$"+solarDiscount;
  document.querySelector("#rct-provinceCredit").innerText = "$"+provinceCredit;
  document.querySelector("#rct-subTotal").innerText = "$"+subTotal;
  document.querySelector("#rct-tax").innerText = "$"+tax;
  document.querySelector("#rct-finalTotal").innerText = "$"+finalTotal;

  // hide the form
  document.querySelector("form").style.display = "none";

  // display bill
  document.querySelector("#receipt").style.display = "block";
};

const startoverButtonPressed = () => {
  document.querySelector("#custName").value = "";
  document.querySelector("#custEmail").value = "";
  document.querySelector("#unitsMorning").value = "";
  document.querySelector("#unitsAfternoon").value = "";
  document.querySelector("#unitsEvening").value = "";
  document.querySelector("#custProvince").value = "";
  document.querySelector("#custSolar").checked = false;

  // hide the bill
  document.querySelector("#receipt").style.display = "none";

  // display form
  document.querySelector("form").style.display = "block";
};

// Event listeners for buttons
document
  .querySelector("#btn-calc")
  .addEventListener("click", calcButtonPressed);
document
  .querySelector("#btn-startover")
  .addEventListener("click", startoverButtonPressed);
