import {
  setupRadioValuesListener,
  setupTextInputChangeListener,
} from "./calc-utils.js";

let documentReady = false;
let showingAnswerCard = false;

// Inputs
let age = 0;
let retirementAge = 0;
let monthlyExpenditure = 0;

// Assumptions
let inflationRate = 6 / 100;
let rateOfReturn = 12 / 100;

// For Calculation
let monthlyRateOfReturn;
let totalMonths;

// Outputs
let corpusRequired = 0;
let corpusRequired_formatted = "";
let monthlySIPRequired = 0;
let monthlySIPRequired_formatted = "";

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

$(document).ready(function () {
  // 1. FOR TEXT INPUT - setupTextInputChangeListener("#annual-income", "#annual-income-display", "₹");
  // 2. FOR RADIO BUTTONS - Setup all radio buttons to enable listeners to populate designated corresponding input fields.
  // 3. FOR SLIDERS - It's taken care of, in the component attributes.

  // 1.
  setupTextInputChangeListener(
    "#monthly-expenditure",
    "#monthly-expenditure-display"
  );

  // Get all inputs, radio buttons and checkboxes and listen to change/input events.
  // To calculate at every change.
  setLiveComponents(["#age", "#age-retirement", "#monthly-expenditure"]);

  documentReady = true;

  initialize();
});

// Initialize
function initialize() {}

// Calculate (on every input change).
function calculate() {
  if (documentReady) {
    age = $("#age").val();
    retirementAge = $("#age-retirement").val();
    monthlyExpenditure = $("#monthly-expenditure").val();

    if (!showingAnswerCard) {
      if (monthlyExpenditure != "") {
        showingAnswerCard = true;
        if ($(".calc_answer-card").hasClass("hidden")) {
          $(".calc_answer-card").removeClass("hidden");
        }
      }
    }

    corpusRequired =
      200 *
      monthlyExpenditure *
      Math.pow(1 + inflationRate, retirementAge - age);
    //console.log("Corpus: " + corpusRequired);

    monthlyRateOfReturn = Math.pow(1 + 0.12, 1 / 12) - 1;
    //console.log("Monthly Rate of Return: " + monthlyRateOfReturn);

    totalMonths = (retirementAge - age) * 12;
    //console.log("Total no of Months: " + totalMonths);

    monthlySIPRequired =
      (corpusRequired * monthlyRateOfReturn) /
      (Math.pow(1 + monthlyRateOfReturn, totalMonths) - 1);
    //console.log("Monthly SIP Required: " + monthlySIPRequired);

    // SHOW ANSWERS
    corpusRequired_formatted = formatter.format(
      Number(corpusRequired).toFixed(2)
    );
    monthlySIPRequired_formatted = formatter.format(
      Number(monthlySIPRequired.toFixed(2))
    );
    $("#answer-1").text(corpusRequired_formatted);
    $("#answer-2").text(monthlySIPRequired_formatted);

    //showChart(corpusRequired, monthlySIPRequired);
  } else {
    // Document is not yet ready.
  }
}

function showChart(invested, returned) {
  new Chart(document.getElementById("myChart"), {
    type: "pie",
    data: {
      labels: ["Invested", "Returns"],
      datasets: [
        {
          backgroundColor: ["#058EE1", "#F99B0F"],
          data: [corpusRequired, monthlySIPRequired],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Retirement Returns",
      },
    },
  });
}

export function setLiveComponents(components) {
  $("#calc-form").on("input", function () {
    calculate();
  });
}
