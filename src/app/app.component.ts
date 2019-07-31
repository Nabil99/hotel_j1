import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import { element } from 'protractor';
import { ApiServiceService } from './api-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  fruits : Array<String> = ['Admin', 'Waiter', 'Kitchen'];
  selectedFruitValues = [];
  constructor(private fb: FormBuilder, private _http:ApiServiceService){

  }

ngOnInit(){

}

  //title = 'HotelEntry';
  createHotelForm = this.fb.group({
    hotelName : [''],
    contactNo : [''],
    ownerName : [''],
    ownerEmail : [''],
    password : [''],
    hotelBankDetails : [''],
    bankName : [''],
    accountNo : [''],
    ifscNo : [''],
    accType : [''],
    ownerAadhar : [''],
    panCardNo : [''],
    saledid : [''],
    plan : [''],
    views : [''],
    favFruits : this.addFruitsControls()
  });

  addFruitsControls(){
    const arr = this.fruits.map(element => {
      return this.fb.control(false);
    });

    return this.fb.array(arr);
  }

  get fruitsArray() {
    return <FormArray>this.createHotelForm.get('favFruits');
  }

  getselectedFruitValues() {
    this.selectedFruitValues = [];
    this.fruitsArray.controls.forEach((control, i)=>{
      if (control.value){
        this.selectedFruitValues.push(this.fruits[i]);
      }
    });
    console.log(this.selectedFruitValues);
  }



  onSubmit() {
    this.createHotelForm.patchValue({'favFruits': this.selectedFruitValues});
    console.log(this.createHotelForm.value);
    this._http.addHotel(this.createHotelForm.value)
    console.log(typeof(this.createHotelForm.value).toString());
  }

}
