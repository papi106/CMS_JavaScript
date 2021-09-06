
window.onload = () =>{

    document.getElementById("add-employee-button").addEventListener("click", AddEmployee, false);

    document.getElementById("modalButton").addEventListener("click", openModal, false);

    document.querySelectorAll(".close-myModal").forEach(e =>{
        e.addEventListener("click", closeModal, false);
    });

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

    deleteEmployee();
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

 //Open modal function
function openModal() {
    document.getElementById('myModal').style = "display:block";
    document.getElementById('myModal').classList.add("show");
}

//Close modal function
function closeModal() {
    document.getElementById('myModal').style = "display:none";
    document.getElementById('myModal').classList.remove("show");
}

//Closing modal at outside click function
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
      closeModal();
    }
}

//Delete event set on click
function deleteEmployee() {
    document.querySelectorAll(".stergere").forEach(e => {
        e.addEventListener("click", deleteEmployeeRow, false);
    });
}

//Delete employee function
function deleteEmployeeRow(htmlDeleteElement) {
    if (confirm('Are you sure to delete this employee ?')) {
        rowToBeDeleted = htmlDeleteElement.target.closest("tr");

        employeeToDeleteId = rowToBeDeleted.getAttribute("employee-id");
        rowToBeDeleted.remove();

        allEmployees = JSON.parse(localStorage.getItem(employees));
        allEmployees = allEmployees.filter(e => e.employeeId != employeeToDeleteId);

        localStorage.setItem(employees, JSON.stringify(allEmployees));
    }
}

//Getting age and validation of 16+ from birthdate function
function getAge(dateStr) {
    birthDate = new Date(dateStr);
    diff = Date.now() - birthDate.getTime();
    ageDayTime = new Date(diff);
    year = ageDayTime.getFullYear();
    age = Math.abs(year - 1970);

    return age >= 16;
}

//Validation function
function validate(lastName, firstName, email, sex, birthDate) {

    if (lastName == null || lastName == "") {
        alert('Last name must not be empty.');
        return false;
    }

    if (firstName == null || firstName == "") {
        alert('First name must not be empty.');
        return false;
    }

    if (email == null || email == "") {
        alert('Email must not be empty.');
        return false;
    } else {

        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!regex.test(email)) {
            alert('Email is invalid.');
            return false;
        }
    }

    if (sex == null || sex == "") {
        alert('Gender must be selected.');
        return false;
    }

    if (birthDate == null) {
        alert('You must enter your birthdate.');
        return false;
    } else if (!getAge(birthDate)) {
        alert('You must have at least 16 years old.');
        return false;
    } 

    return true;
}