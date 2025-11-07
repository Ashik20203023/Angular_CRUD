export class employeeModel{
    empId:number;
    name:string;
    city:string;
    state:string;
    emailId:string;
    contactNo:string;
    address:string;
    pinCode:string;
    constructor()
    {
        this.address='';
        this.state='';
        this.city='';
        this.name='';
        this.contactNo='';
        this.empId=1;
        this.emailId='';
        this.pinCode='';

    }
}