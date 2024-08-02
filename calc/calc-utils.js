// Setup change listeners and populate corresponding designated input field for every set of Radio buttons.
// setupRadioValuesListener(["#safe", "#aggressive"], "#where");
export function setupRadioValuesListener(radioComponents, resultInputId) {
  radioComponents.forEach(function (selector) {
    $(selector).on("change", function () {
      // If radio is selected/checked,
      if ($(this).is(":checked")) {
        var resultInput = $(resultInputId);
        resultInput.val($(this).val());

        // Trigger the "input" event programmatically
        resultInput.trigger("input");
      }
    });
  });
}

// Setup listener to read an input text field value and output it in real time to a formatted field.
export function setupTextInputChangeListener(
  textInputComponent,
  displayComponent,
  numberFormat = true
) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  $(textInputComponent).on("input", function () {
    $(displayComponent).text(formatter.format($(this).val()));
  });
}
