import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './service/employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './service/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'employeemanagerapp';

  public employees: Employee[] | undefined;

  public editEmployee: Employee | null = null;
  public deleteEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) { } 

  ngOnInit() {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'add') {
      
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if(mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
      this.deleteEmployee = employee;
    }

    container?.appendChild(button);
    button.click();

  }

  public onAddEmployee(addForm: NgForm) : void {
    const addEmployeeModal = document.getElementById('addEmployeeModal');
    if (addEmployeeModal) {
      addEmployeeModal.click();
    } else {
      alert("Unable to complete the action");
    }
    
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();

      }, (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee) : void {
   
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();

      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number) : void {
   
    this.employeeService.removeEmployees(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();

      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key : string) : void {
    const results : Employee[] = [];

    if (this.employees) { 
      for (const employee of this.employees) {
        if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(employee);
        }
      }
    }

    this.employees = results;

    if(results.length === 0 || !key) {
      this.getEmployees();
    }

  }

}
