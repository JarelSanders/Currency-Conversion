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
    // Retrieve HTML elements by their IDs and store references in variables
    let currencyOne = document.getElementById("first-currency"); //select tag dropdown
    let currencyTwo = document.getElementById("second-currency"); //select tag dropdown
    let amountOne = document.getElementById("first-amount"); //from input tag
    let amountTwo = document.getElementById("second-amount"); //to input tag
    let rate = document.getElementById("current_rate");
    let swap = document.getElementById("swap");
    let from_rate_icon_ = document.getElementById("first-currency");
    let to_rate_icon_ = document.getElementById("second-currency");
  
    // Retrieve values from the above elements and store them in variables
    let from_rate_icon = (<HTMLInputElement>from_rate_icon_).value;
    let to_rate_icon = (<HTMLInputElement>to_rate_icon_).value;
    let first_currency = (<HTMLInputElement>currencyOne).value;
    let second_currency = (<HTMLInputElement>currencyTwo).value;
    let final_amount = (<HTMLInputElement>amountOne).value;
    let amountTwo_ = (<HTMLInputElement>amountTwo).value;

    // Check if the final_amount is empty and show an alert if true
    if (final_amount ) {
      alert("Enter a value");
    } else {
    // If final_amount is not empty, proceed with the conversion


      //select tag dropdown
      // Set up headers for the API request
      var myHeaders = new Headers();
      myHeaders.append("apikey", "xXma0EqQVkLcrfU49m9VxVTmSOaPdmrG");

      // Set up options for the API request
      var requestOptions: any = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      // Construct the API URL for currency conversion
      const api_url = `https://api.apilayer.com/fixer/convert?to=${second_currency}&from=${first_currency}&amount=${final_amount}`;

      // Fetch data from the API
      fetch(api_url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // Log the result data to the console
          console.log(
            result.query.amount,
            result.query.from,
            result.info.rate,
            result.query.to,
            result.result
          ),
            // Log the entire result object to the console
            console.log(result),

            // Set the 'to' amount input value to the converted result
            ((<HTMLInputElement>(
              document.getElementById("second-amount")
            )).value = result.result),

            // Set the 'to' currency icon
            ((<HTMLInputElement>document.getElementById("to_rate")).innerHTML =
              result.info.rate);

        })

        .catch((error) => console.log("error", error));

       ((<HTMLInputElement>document.getElementById("to_rate_icon")).innerText =
        to_rate_icon),
        // Set the 'from' currency icon

        ((<HTMLInputElement>(
          document.getElementById("from_rate_icon")
        )).innerText = "1 " + from_rate_icon);
        // Set the inner HTML content of the element with the id "to_rate" to the conversion rate

        // Add event listeners for changes in currency and amount inputs
        currencyOne?.addEventListener("change", this.calculate);
        currencyTwo?.addEventListener("change", this.calculate);
        amountOne?.addEventListener("input", this.calculate);
    }
  };

  // swaps values
  // switch = (): void => {
  //   let a = (<HTMLInputElement>document.getElementById("first-amount")).value;
  //   let b = (<HTMLInputElement>document.getElementById("second-amount")).value;
  //   let c = (<HTMLInputElement>document.getElementById("to_rate")).innerHTML; // =  result.info.rate;
  //   let d = (<HTMLInputElement>document.getElementById("from_rate")).innerHTML; //= result.query.from
  //   let e = (<HTMLInputElement>document.getElementById("first-currency")).value;
  //   let f = (<HTMLInputElement>document.getElementById("second-currency"))
  //     .value;
  //   let g = (<HTMLInputElement>document.getElementById("to_rate_icon")).value;
  //   let h = (<HTMLInputElement>document.getElementById("from_rate_icon")).value;

  //   //swaps current values
  //   [a, b, c, d, e, f, g, h] = [b, a, c, d, f, e, h, g];
  //   (<HTMLInputElement>document.getElementById("first-amount")).value = a; //swaps entered amount with second-amount
  //   (<HTMLInputElement>document.getElementById("second-amount")).value = b; //swaps amount with entered first amount

  //   (<HTMLInputElement>document.getElementById("to_rate")).innerHTML = d + "  "; //swaps currency rate with from
  //   (<HTMLInputElement>document.getElementById("from_rate")).innerHTML =
  //     "1 " + e; //swaps and set from rate to 1

  //   //swap currency option tag
  //   (<HTMLInputElement>document.getElementById("second-currency")).value = f;
  //   (<HTMLInputElement>document.getElementById("first-currency")).value = e;

  //   this.calculate();
  // };

    switch = (): void => {
    // Retrieve the values of the inputs and store it in the below variables 
    let first_value = (<HTMLInputElement>document.getElementById("first-amount")).value;
    let second_value = (<HTMLInputElement>document.getElementById("second-amount")).value;
    let c = (<HTMLInputElement>document.getElementById("to_rate")).innerHTML; // =  result.info.rate;
    let from_rate = (<HTMLInputElement>document.getElementById("from_rate")).innerHTML; //= result.query.from
    let first_currency = (<HTMLInputElement>document.getElementById("first-currency")).value;
    let second_currency = (<HTMLInputElement>document.getElementById("second-currency"))
      .value;
    let first_icon = (<HTMLInputElement>document.getElementById("to_rate_icon")).value;
    let second_icon = (<HTMLInputElement>document.getElementById("from_rate_icon")).value;

    // Swaps the values of the variables first_value, second_value, c, from_rate, first_currency, second_currency, first_icon, second_icon
    [first_value, second_value, c, from_rate, first_currency, second_currency, first_icon, second_icon] = [second_value, first_value, c, from_rate, second_currency, first_currency, second_icon, first_icon];

     // Set the value of the input with the id "first-amount" to the new value of first_value
    (<HTMLInputElement>document.getElementById("first-amount")).value = first_value; 
    // Set the value of the input with the id "second-amount" to the new value of second_value
    (<HTMLInputElement>document.getElementById("second-amount")).value = second_value; 
    // Set the inner HTML content of the element with the id "to_rate" to the new value of (from_rate + "  ")
    (<HTMLInputElement>document.getElementById("to_rate")).innerHTML = from_rate + "  "; 
    // Set the inner HTML content of the element with the id "from_rate" to the new value of ("1 " + first_currency)
    (<HTMLInputElement>document.getElementById("from_rate")).innerHTML = "1 " + first_currency; 

    //swap currency option tag
    // Set the value of the input with the id "second-currency" to the new value of second_currency
    (<HTMLInputElement>document.getElementById("second-currency")).value = second_currency;
    // Set the value of the input with the id "first-currency" to the new value of first_currency

    this.calculate();
  };




}
