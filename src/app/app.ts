import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { employeeModel } from './models/employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule], // ✅ Required
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angular-crud-operation');
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: employeeModel = new employeeModel();
  employeeList:employeeModel[]=[];
  constructor() {
    this.createForm();
    debugger;
    const oldData=localStorage.getItem("EmpData");
    if(oldData != null)
    {
      const parseData=JSON.parse(oldData);
      this.employeeList=parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      emailId: new FormControl(this.employeeObj.emailId,[Validators.required]),
      contactNo: new FormControl(this.employeeObj.contactNo,[Validators.required]),
      address: new FormControl(this.employeeObj.address),
      pinCode: new FormControl(this.employeeObj.pinCode),
    });
  }
  
  onSave() {
  if (this.employeeForm.invalid) {
    alert('Please fill all required fields!');
    return;
  }

  const oldData = localStorage.getItem("EmpData");
  if (oldData != null) {
    const parseData = JSON.parse(oldData);
    this.employeeForm.controls['empId'].setValue(parseData.length + 1);
    this.employeeList.unshift(this.employeeForm.value);
  } else {
    this.employeeForm.controls['empId'].setValue(1); // ✅ First record
    this.employeeList.unshift(this.employeeForm.value);
  }

  localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  alert('Employee added successfully!');
  this.onReset(); // ✅ Clear form after save
}

  onEdit(item:employeeModel)
  {
    this.employeeObj=item;
    this.createForm();

  }
  
 onUpdate() {
  const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empId'].value);
  if (record) {
    record.address = this.employeeForm.controls['address'].value;
    record.name = this.employeeForm.controls['name'].value;
    record.contactNo = this.employeeForm.controls['contactNo'].value;
    record.emailId = this.employeeForm.controls['emailId'].value;
    record.city = this.employeeForm.controls['city'].value;
    record.state = this.employeeForm.controls['state'].value;
    record.pinCode = this.employeeForm.controls['pinCode'].value;
  }
  localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  alert('Employee updated successfully!');
  this.onReset(); // ✅ Clear form after update
}

  onReset() {
  this.employeeObj = new employeeModel();
  this.employeeForm.reset(); 
}
 onDelete(id:number)
  {
    const isDelete=confirm("Are you sure want to delete");
     if(isDelete){
      const index=this.employeeList.findIndex(m=>m.empId==id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
     }
  }


}