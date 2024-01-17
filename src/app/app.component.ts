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
    let currencyOne = document.getElementById("first-currency"); //select tag dropdown
    let currencyTwo = document.getElementById("second-currency"); //select tag dropdown
    let amountOne = document.getElementById("first-amount"); //from input tag
    let amountTwo = document.getElementById("second-amount"); //to input tag
    let rate = document.getElementById("current_rate");
    let swap = document.getElementById("swap");
    let from_rate_icon_ = document.getElementById("first-currency");
    let to_rate_icon_ = document.getElementById("second-currency");

    let from_rate_icon = (<HTMLInputElement>from_rate_icon_).value;
    let to_rate_icon = (<HTMLInputElement>to_rate_icon_).value;
    let first_currency = (<HTMLInputElement>currencyOne).value;
    let second_currency = (<HTMLInputElement>currencyTwo).value;
    let final_amount = (<HTMLInputElement>amountOne).value;
    let amountTwo_ = (<HTMLInputElement>amountTwo).value;
    if (final_amount === "") {
      alert("Enter a value");
    } else {
      //select tag dropdown

      var myHeaders = new Headers();

      myHeaders.append("apikey", "xXma0EqQVkLcrfU49m9VxVTmSOaPdmrG");

      var requestOptions: any = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      const api_url = `https://api.apilayer.com/fixer/convert?to=${second_currency}&from=${first_currency}&amount=${final_amount}`;
      fetch(api_url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
             if (result.query && result.query.amount) {
      console.log(
        result.query.amount,
        result.query.from,
        result.info.rate,
        result.query.to,
        result.result
      );

      // Update the second amount input value
      const secondAmountInput = document.getElementById("second-amount") as HTMLInputElement;
      if (secondAmountInput) {
        secondAmountInput.value = result.result;
      }

      // Update the 'to_rate' element's innerHTML
      const toRateElement = document.getElementById("to_rate") as HTMLElement;
      if (toRateElement) {
        toRateElement.innerHTML = result.info.rate;
      }
    } else {
      console.error('Query or amount is undefined in the result:', result);
    }
  })
  .catch((error) => console.log("error", error));

      ((<HTMLInputElement>document.getElementById("to_rate_icon")).innerText =
        to_rate_icon),
        ((<HTMLInputElement>(
          document.getElementById("from_rate_icon")
        )).innerText = "1 " + from_rate_icon);

      // (<HTMLInputElement>document.getElementById('second-amount')).textContent = result.query.amount;

      currencyOne?.addEventListener("change", this.calculate);
      currencyTwo?.addEventListener("change", this.calculate);
      amountOne?.addEventListener("input", this.calculate);
    }
  };


  switch(): void {
      // Call calculate to update the rates before swapping
    this.calculate();

    //works
    const fromContainer = document.getElementById('from-container');
    const toContainer = document.getElementById('to-container');

    // Get references to the input elements
    const firstAmountInput = document.getElementById('first-amount') as HTMLInputElement;
    const secondAmountInput = document.getElementById('second-amount') as HTMLInputElement;

    // Get references to the select elements
    const firstCurrencySelect = document.getElementById('first-currency') as HTMLSelectElement;
    const secondCurrencySelect = document.getElementById('second-currency') as HTMLSelectElement;

    // Check for null using optional chaining
    if (fromContainer && toContainer) {
      // Swap the HTML content of container elements
      
      const tempHTML = fromContainer.innerHTML;
      fromContainer.innerHTML = toContainer.innerHTML;
      toContainer.innerHTML = tempHTML;
          // Swap the values of input elements
      const tempAmount = firstAmountInput.value;
      firstAmountInput.value = secondAmountInput.value;
      secondAmountInput.value = tempAmount;

      // Swap the values of select elements
      const tempCurrency = firstCurrencySelect.value;
      firstCurrencySelect.value = secondCurrencySelect.value;
      secondCurrencySelect.value = tempCurrency;
    }
  }
}
