
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// import xml2js from 'xml2js'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public xmlItems: string = '';
  public LEXISNEXIS_TRANSACTION_TOKEN: string = '';
  public CUSTOMER_TRANSACTION_TOKEN: string = '';

  constructor(private http: HttpClient) {

    this.loadXML();

  }
  onSubmit(e: NgForm) {
    console.log("clicked")
    this.submitData();
  }
  //getting data function
  loadXML() {
    debugger;
    /*Read Data*/
    this.http.get('assets/data.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.xmlItems = data;
      });

  }

  submitData() {
    this.http.post("https://demo.payments.lexisnexis.com/embeddedPay/initial", this.xmlItems,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'post')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        console.log("post resonse=>", data);

      });
  }
  onConfirm() {
    debugger;
    let body: any = {
      LEXISNEXIS_TRANSACTION_TOKEN: this.LEXISNEXIS_TRANSACTION_TOKEN,
      CUSTOMER_TRANSACTION_TOKEN: this.CUSTOMER_TRANSACTION_TOKEN
    }
    this.http.post("https://demo.payments.lexisnexis.com/embeddedPay/confirm", body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('Access-Control-Allow-Methods', 'post')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
      responseType: 'text'
    }
      )
      .subscribe((data) => {
        console.log("Transection resonse=>", data);
      });

  }

}