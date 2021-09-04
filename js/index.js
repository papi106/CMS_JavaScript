function AddEmployees() {
    lastName = document.getElementById("last-name").value;
    firstName = document.getElementById("first-name").value;
    email = document.getElementById("email-input").value;
    gender = document.getElementById("gender-input").value;
    birthDate = document.getElementById("birthdate-input").value;
    picture = document.getElementById("picture-input").value;

    employeeInitialId = 0;
    employeeId = JSON.parse(localStorage.getItem('employeeInitialId'));
    allEmployees =  JSON.parse(localStorage.getItem('employees'));

    newEmployee = new Employee(employeeId++, lastName, firstName, email, gender, birthDate, picture);
    allEmployees.push(newEmployee);

    localStorage.setItem('employeeInitialId', JSON.stringify(employeeId));
    localStorage.setItem('employees', JSON.stringify(allEmployees));

    AppendTable(allEmployees);

}
