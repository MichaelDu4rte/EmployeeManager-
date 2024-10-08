package com.employee.EmployeeManager.controller;

import com.employee.EmployeeManager.model.Employee;
import com.employee.EmployeeManager.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeResouce {

    private final EmployeeService employeeService;

    public EmployeeResouce(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAllEmployee();

        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getAllEmployeeById(@PathVariable("id") Long id) {
        Employee employee = employeeService.findEmployeeById(id);

        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody  Employee employee) {
        Employee newEmployee = employeeService.addEmployee(employee);

        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody  Employee employee) {
        Employee updateEployee = employeeService.updateEmployee(employee);

        return new ResponseEntity<>(updateEployee, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
