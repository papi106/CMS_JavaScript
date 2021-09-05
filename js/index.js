
window.onload = () =>{

    document.getElementById("add-employee-button").addEventListener("click", AddEmployee, false);

    currentEmployees = JSON.parse(localStorage.getItem('employees'));

    if (currentEmployees == undefined)
    {
        localStorage.setItem('employees', JSON.stringify([]));
        localStorage.setItem('employeeNextId', JSON.stringify(0));
    }
    else
    {
        currentEmployees.forEach(e => {
            AppendTable(e);
        });
    }
}

//Put employee in table
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

//Get employee in local storage
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

//Employee constructor
function Employee(employeeId, lastName, firstName, email, gender, birthDate, picture) {
    this.employeeId = employeeId;
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.birthDate = birthDate;
    this.gender = gender;
    this.picture= picture;
}

//Email validation function
function emailValidation(email) {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return regex.test(email);
}

//Getting age from birthdate function
function getAge(birthDate) {
    var birthDate = new Date(birthDate);
    var diff = Date.now() - birthDate.getTime();
    var ageDayTime = new Date(diff);
    var year = ageDayTime.getFullYear();
    var age = Math.abs(year - 1970);

    return age;
}