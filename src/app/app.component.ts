import { compileClassMetadata } from '@angular/compiler';
import { Component, OnInit, Input, Output, NgModule } from '@angular/core';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'currencyConversion';
  onlineStatud: any;
  constructor() {}
  // showrate:boolean = false;
  to_rate: string = '';
  from_rate: string = '';
  from_rate_icon: string = '';
  to_rate_icon: string = '';

  ngOnInit(): void {}

  calculate = (): void => {
    let currencyOne = document.getElementById('first-currency'); //select tag dropdown
    let currencyTwo = document.getElementById('second-currency'); //select tag dropdown
    let amountOne = document.getElementById('first-amount'); //from input tag
    let amountTwo = document.getElementById('second-amount'); //to input tag
    let rate = document.getElementById('current_rate');
    let swap = document.getElementById('swap');
    let from_rate_icon_ = document.getElementById('first-currency');
    let to_rate_icon_ = document.getElementById('second-currency');

    let from_rate_icon = (<HTMLInputElement>from_rate_icon_).value;
    let to_rate_icon = (<HTMLInputElement>to_rate_icon_).value;
    let first_currency = (<HTMLInputElement>currencyOne).value;
    let second_currency = (<HTMLInputElement>currencyTwo).value;
    let final_amount = (<HTMLInputElement>amountOne).value;
    let amountTwo_ = (<HTMLInputElement>amountTwo).value;
    if (final_amount === '') {
      alert('Enter a value');
    } else {
      //select tag dropdown

      var myHeaders = new Headers();
      myHeaders.append('apikey', 'uTre7uxli89RppM2QV3e1uwHlvJSPZtu');

      var requestOptions: any = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };
      const api_url = `https://api.apilayer.com/exchangerates_data/convert?to=${second_currency}&from=${first_currency}&amount=${final_amount}`;
      fetch(api_url, requestOptions)
        .then((response) => response.json())
        // .then(result => console.log(result.query.amount, result.query.from, result.info.rate, result.query.to, result.result))
        .then((result) => {
          console.log(
            result.query.amount,
            result.query.from,
            result.info.rate,
            result.query.to,
            result.result
          ),
            console.log(result),
            ((<HTMLInputElement>(
              document.getElementById('second-amount')
            )).value = result.result),
            // ((<HTMLInputElement>document.getElementById('from_rate')).value = first_currency),
            ((<HTMLInputElement>document.getElementById('to_rate')).innerHTML =
              result.info.rate);

          // (<HTMLInputElement>document.getElementById('from_rate')).innerHTML = result.info.from
        })

        .catch((error) => console.log('error', error));

      ((<HTMLInputElement>document.getElementById('to_rate_icon')).innerText =
        to_rate_icon),
        ((<HTMLInputElement>(
          document.getElementById('from_rate_icon')
        )).innerText = '1 ' + from_rate_icon);

      // (<HTMLInputElement>document.getElementById('second-amount')).textContent = result.query.amount;

      currencyOne?.addEventListener('change', this.calculate);
      currencyTwo?.addEventListener('change', this.calculate);
      amountOne?.addEventListener('input', this.calculate);
    }
  };

  // swaps values
  switch = (): void => {
    let a = (<HTMLInputElement>document.getElementById('first-amount')).value;
    let b = (<HTMLInputElement>document.getElementById('second-amount')).value;
    let c = (<HTMLInputElement>document.getElementById('to_rate')).innerHTML; // =  result.info.rate;
    let d = (<HTMLInputElement>document.getElementById('from_rate')).innerHTML; //= result.query.from
    let e = (<HTMLInputElement>document.getElementById('first-currency')).value;
    let f = (<HTMLInputElement>document.getElementById('second-currency'))
      .value;
    let g = (<HTMLInputElement>document.getElementById('to_rate_icon')).value;
    let h = (<HTMLInputElement>document.getElementById('from_rate_icon')).value;

    //swaps current values
    [a, b, c, d, e, f, g, h] = [b, a, c, d, f, e, h, g];
    (<HTMLInputElement>document.getElementById('first-amount')).value = a; //swaps entered amount with second-amount
    (<HTMLInputElement>document.getElementById('second-amount')).value = b; //swaps amount with entered first amount

    (<HTMLInputElement>document.getElementById('to_rate')).innerHTML = d + '  '; //swaps currency rate with from
    (<HTMLInputElement>document.getElementById('from_rate')).innerHTML =
      '1 ' + e; //swaps and set from rate to 1

    //swap currency option tag
    (<HTMLInputElement>document.getElementById('second-currency')).value = f;
    (<HTMLInputElement>document.getElementById('first-currency')).value = e;

    this.calculate();
  };
}
