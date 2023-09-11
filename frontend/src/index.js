
const axios = require('axios');

document.addEventListener("DOMContentLoaded", readAllStudents);

function readAllStudents(){
    // Make a request for get all students
axios.get("http://localhost:3000/api/read")
  .then(function (response) {
    let rowData = response.data;
    // Ordenar el arreglo rowData por ID de menor a mayor
    rowData.sort((a, b) => a.student.ID - b.student.ID);
    
    let tabla = document.getElementById("studentList");
    tabla.innerHTML = "";
    for (let i = 0; i < rowData.length; i++) {
      const student = rowData[i].student;
      let newRow = tabla.insertRow();
      newRow.id = student.ID;
      let idCell = newRow.insertCell();
      let nameCell = newRow.insertCell();
      let ageCell = newRow.insertCell();
      let gradeCell = newRow.insertCell();
      let actionsCell = createActionButton(student.ID); // Crear celda con botones para acciones

      idCell.textContent = student.ID;
      nameCell.textContent = student.name;
      ageCell.textContent = student.age;
      gradeCell.textContent = student.grade;
      newRow.appendChild(actionsCell); // Agregar la celda con botones a la fila
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

// Función para crear los botones de acción en cada fila
function createActionButton(studentId) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteStudent(studentId);
  });

  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.classList.add("update-button");
  updateButton.addEventListener("click", () => {
    updateStudentData(studentId); // Llamar a la función para mostrar el formulario de actualización
  });

  const actionsCell = document.createElement("td");
  actionsCell.classList.add("action-buttons");
  actionsCell.appendChild(deleteButton);
  actionsCell.appendChild(updateButton);

  return actionsCell;
}
// ...

function updateStudentData(studentId) {
  // Simplemente llamamos a la función fillUpdateFormWithStudentData para llenar el formulario con los datos del estudiante
  fillUpdateFormWithStudentData(studentId);
}

function fillUpdateFormWithStudentData(studentId) {
  // En esta función, vamos a obtener los datos del estudiante directamente de la tabla en lugar de hacer una nueva solicitud al backend
  let row = document.getElementById(studentId);
  if (row) {
    let name = row.cells[1].textContent;
    let age = row.cells[2].textContent;
    let grade = row.cells[3].textContent;

    // Llenar el formulario con los datos del estudiante
    document.getElementById("updateName").value = name;
    document.getElementById("updateAge").value = age;
    document.getElementById("updateGrade").value = grade;

    // Mostrar el formulario de actualización
    document.getElementById("updateForm").style.display = "block";

    // Asignar un manejador de eventos al botón de Guardar (Save) para que realice la actualización
    let saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
      // Llamamos a la función updateStudent con el ID del estudiante y los datos actualizados
      updateStudent(studentId);
      document.getElementById("updateForm").style.display = "none";
    });
  } else {
    console.log("Estudiante no encontrado en la tabla.");
  }
}

function updateStudent(studentId) {
  let updateName = document.getElementById("updateName").value;
  let updateAge = document.getElementById("updateAge").value;
  let updateGrade = document.getElementById("updateGrade").value;

  let updatedFields = {
    ID: parseInt(studentId),
    name: updateName,
    age: parseInt(updateAge),
    grade: updateGrade,
  };

  // Verificar que los valores sean válidos antes de realizar la solicitud
  if (isNaN(updatedFields.age)) {
    console.log("La edad debe ser un número válido.");
    return;
  }

  // Realizar la solicitud PUT al backend para actualizar el estudiante
  axios
    .put(`http://localhost:3000/api/update/${studentId}`, { student: updatedFields })
    .then(function (response) {
      console.log(response.data);
      document.getElementById("updateForm").style.display = "none";
      readAllStudents(); // Actualizar la tabla mostrando la lista actualizada de estudiantes
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Limpiar Datos del formulario
function clearForm() {
  document.getElementById("ID").value = "";
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("grade").value = "";
}

// Agregar un estudiante
function addStudent(event) {
  event.preventDefault();
  let ID = document.getElementById("ID").value;
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let grade = document.getElementById("grade").value;

  // Crear el objeto student con los datos ingresados
  let student = {
      ID: parseInt(ID),
      name: name,
      age: parseInt(age),
      grade: grade
  };

  // Hacer la solicitud POST al backend para agregar el estudiante
  axios.post('http://localhost:3000/api/create', { student })
      .then(function (response) {
        // handle success
        console.log(response.data);
        // Agregar el nuevo estudiante a la tabla sin recargar la página
        let tabla = document.getElementById("studentList");
        let newRow = tabla.insertRow();
        let idCell = newRow.insertCell();
        let nameCell = newRow.insertCell();
        let ageCell = newRow.insertCell();
        let gradeCell = newRow.insertCell();
        let actionsCell = createActionButton(student.ID); // Crear celda con botones para acciones

        idCell.textContent = student.ID;
        nameCell.textContent = student.name;
        ageCell.textContent = student.age;
        gradeCell.textContent = student.grade;
        newRow.appendChild(actionsCell); // Agregar la celda con botones a la fila

        // Limpiar el formulario después de agregar el estudiante
        clearForm();
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      });
}

function deleteStudent(studentId) {
  const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este estudiante?");
  if (confirmDelete) {
    // Obtener el ID del documento de Firebase usando el ID del estudiante
    axios.get(`http://localhost:3000/api/read/${studentId}`)
      .then(function (response) {
        const docId = response.data[0].id;
        axios.delete(`http://localhost:3000/api/delete/${docId}`)
          .then(function (response) {
            console.log(response.data);
            // Después de eliminar el estudiante, también eliminamos la fila correspondiente en la tabla
            let tableRow = document.getElementById(studentId);
            if (tableRow) {
              tableRow.remove();
              alert("Estudiante eliminado exitosamente.");
            }
            // Actualizar la tabla mostrando la lista actualizada de estudiantes
            readAllStudents();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

let form = document.getElementById("studentForm");
form.addEventListener("submit", addStudent);

