
window.onload = () =>{

    document.getElementById("add-employee-button").addEventListener("click", AddEmployee, false);

    localStorage.setItem('employees', JSON.stringify([]));
    localStorage.setItem('employeeNextId', JSON.stringify(0));
}

function AppendTable(employee) {
    tableContent = `<tr employee-id=${employee.employeeId}>
    <td>${employee.picture}</td>
    <td>${employee.lastName}</td>
    <td>${employee.firstName}</td>
    <td>${employee.email}</td>
    <td>${employee.gender}</td>
    <td>${employee.birthDate}</td>
    <td class="stergere"><img src="/images/trash.svg"></td>
    </tr>`
    console.log(employee);
    document.getElementById("table-employees").innerHTML += tableContent;
}

function AddEmployee() {
    lastName = document.getElementById("last-name").value;
    firstName = document.getElementById("first-name").value;
    email = document.getElementById("email-input").value;
    gender = document.getElementById("gender-input").value;
    birthDate = document.getElementById("birthdate-input").value;
    picture = document.getElementById("picture-input").value;


    employeeId = JSON.parse(localStorage.getItem('employeeNextId'));
    allEmployees =  JSON.parse(localStorage.getItem('employees'));

    newEmployee = new Employee(employeeId++, lastName, firstName, email, gender, birthDate, picture);
    allEmployees.push(newEmployee);

    localStorage.setItem('employeeNextId', JSON.stringify(employeeId));
    localStorage.setItem('employees', JSON.stringify(allEmployees));

    AppendTable(newEmployee);
}

function Employee(employeeId, lastName, firstName, email, gender, birthDate, picture) {
    this.employeeId = employeeId;
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.birthDate = birthDate;
    this.gender = gender;
    this.picture= picture;
}