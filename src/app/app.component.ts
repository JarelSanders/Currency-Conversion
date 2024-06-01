import { compileClassMetadata } from "@angular/compiler";
import { Component, OnInit, Input, Output, NgModule } from "@angular/core";
import { from } from "rxjs";
import { isConstructorDeclaration } from "typescript";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "currencyConversion";
  onlineStatud: any;
  constructor() {}
  // showrate:boolean = false;
  to_rate: string = "";
  from_rate: string = "";
  from_rate_icon: string = "";
  to_rate_icon: string = "";


  ngOnInit(): void {}

calculate = (): void => {
  // Get references to input and select elements
  const currencyOne = document.getElementById("first-currency") as HTMLSelectElement;
  const currencyTwo = document.getElementById("second-currency") as HTMLSelectElement;
  const amountOne = document.getElementById("first-amount") as HTMLInputElement;
  const amountTwo = document.getElementById("second-amount") as HTMLInputElement;

  // Get current values from input and select elements
  const from_rate_icon = currencyOne.value;
  const to_rate_icon = currencyTwo.value;
  const first_currency = currencyOne.value;
  const second_currency = currencyTwo.value;
  const final_amount = amountOne.value;

  // Check if an amount is entered
  if (final_amount === "") {
    alert("Enter a value");
    return;
  }

  // Display static "1" in the from_rate_constant element
  const staticCurrency = document.getElementById("from_rate_constant") as HTMLElement;
  if (staticCurrency) {
    staticCurrency.style.display = "block";
  }

  // Display the equals sign
  const equals = document.getElementById("equal") as HTMLElement;
  if (equals) {
    equals.style.display = "block";
  }

  // Prepare the request URL for the backend API
  const api_url = `/api?to=${second_currency}&from=${first_currency}&amount=${final_amount}`;

  // Make the API request to the backend
  fetch(api_url)
    .then((response) => {
      if (!response.ok) {
        // If response is not ok, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Try to parse the response as JSON
    })
    .then((result) => {
      // Process API response
      if (result.query && result.query.amount) {
        console.log(
          result.query.amount,
          result.query.from,
          result.info.rate,
          result.query.to,
          result.result
        );

        // Update the converted amount
        if (amountTwo) {
          amountTwo.value = result.result;
        }

        // Update the exchange rate
        const toRateElement = document.getElementById("to_rate") as HTMLElement;
        if (toRateElement) {
          toRateElement.innerHTML = result.info.rate;
        }
      } else {
        console.error('Query or amount is undefined in the result:', result);
      }
    })
    .catch((error) => {
      console.log("error", error);
      // Log the full response if it is not JSON
      fetch(api_url)
        .then((response) => response.text())
        .then((text) => console.log("Response text:", text))
        .catch((err) => console.log("Error fetching response text:", err));
    });

  // Update currency icons
  const toRateIconElement = document.getElementById("to_rate_icon") as HTMLElement;
  const fromRateIconElement = document.getElementById("from_rate_icon") as HTMLElement;
  if (toRateIconElement) {
    toRateIconElement.innerText = to_rate_icon;
  }
  if (fromRateIconElement) {
    fromRateIconElement.innerText = from_rate_icon;
  }

  // Add event listeners for changes in currency and amount inputs
  if (currencyOne) {
    currencyOne.addEventListener("change", this.calculate);
  }
  if (currencyTwo) {
    currencyTwo.addEventListener("change", this.calculate);
  }
  if (amountOne) {
    amountOne.addEventListener("input", this.calculate);
  }
};



   
switch(): void {
  // Get references to the input elements
  const firstAmountInput = document.getElementById('first-amount') as HTMLInputElement;
  const secondAmountInput = document.getElementById('second-amount') as HTMLInputElement;

  // Get references to the select elements
  const firstCurrencySelect = document.getElementById('first-currency') as HTMLSelectElement;
  const secondCurrencySelect = document.getElementById('second-currency') as HTMLSelectElement;

  // Get references to the from and to container elements
  const fromRateElement = document.getElementById('from_rate');
  const fromRateIconElement = document.getElementById('from_rate_icon');
  const toRateElement = document.getElementById('to_rate');
  const toRateIconElement = document.getElementById('to_rate_icon');
  const fromRateConstantElement = document.getElementById('from_rate_constant');

  if (fromRateElement && fromRateIconElement && toRateElement && toRateIconElement) {
    // Swap the rates
    const tempRate = fromRateElement.innerHTML;
    fromRateElement.innerHTML = toRateElement.innerHTML;
    toRateElement.innerHTML = tempRate;

    // Swap the icons
    const tempIcon = fromRateIconElement.innerHTML;
    fromRateIconElement.innerHTML = toRateIconElement.innerHTML;
    toRateIconElement.innerHTML = tempIcon;

    // Ensure the new from_rate has only the icon
    fromRateElement.innerHTML = ''; // Remove the number part, keeping the icon only

    // Swap the values of input elements
    const tempAmount = firstAmountInput.value;
    firstAmountInput.value = secondAmountInput.value;
    secondAmountInput.value = tempAmount;

    // Swap the values of select elements
    const tempCurrency = firstCurrencySelect.value;
    firstCurrencySelect.value = secondCurrencySelect.value;
    secondCurrencySelect.value = tempCurrency;

    // Ensure "1" stays in its current location by setting it explicitly
    if (fromRateConstantElement) {
      fromRateConstantElement.innerHTML = '1';
    }

    // Recalculate the conversion after the swap
    this.calculate();
  }
}


















}
