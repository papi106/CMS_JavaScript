
function AppendTable(employees) {
    tableContent = '';

    employees.forEach(e => {
        tableContent += 
        `<tr employee-id=${e.employeeId}>
        <td>${e.picture}</td>
        <td>${e.lastName}</td>
        <td>${e.firstName}</td>
        <td>${e.email}</td>
        <td>${e.gender}</td>
        <td>${e.birthDate}</td>
        <td class="stergere"><img src="/images/trash.svg"></td>
        </tr>`
    });
    
    document.getElementById("table-employees").innerHTML = tableContent;
}


function AddEmployee() {
    lastName = document.getElementById("last-name").value;
    firstName = document.getElementById("first-name").value;
    email = document.getElementById("email-input").value;
    gender = document.getElementById("gender-input").value;
    birthDate = document.getElementById("birthdate-input").value;
    picture = document.getElementById("picture-input").value;


    employeeId = JSON.parse(localStorage.getItem('employeeInitilId'));
    allEmployees =  JSON.parse(localStorage.getItem('employees'));

    newEmployee = new Employee(employeeId++, lastName, firstName, email, gender, birthDate, picture);
    allEmployees.push(newEmployee);

    localStorage.setItem('employeeInitialId', JSON.stringify(employeeId));
    localStorage.setItem('employees', JSON.stringify(allEmployees));

    AppendTable(allEmployees);
}

