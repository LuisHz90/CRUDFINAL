// 1.- Arreglo que almacena las tareas de mi CRUD
let tareas = ["Casa", "Trabajo", "Estudio", "Ejercicio"];

// 2.- Vincular el HTML con el JS (DOM)
const inputTarea = document.getElementById("nueva-tarea");
const btnAgregar = document.getElementById("btn-agregar");
const listaTareas = document.getElementById("lista-tareas");

// 3.- Mostrar tolas las tareas en la pantalla
function mostrarTareas() {
  listaTareas.innerHTML = "";
  tareas.forEach((tareasDeLaListaDelArreglo, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${tareasDeLaListaDelArreglo}</span>
      <div>
        <button class="btn btn-warning btn-sm me-2" onclick="editarTarea(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="borrarTarea(${index})">Borrar</button>
      </div>
    `;
    listaTareas.appendChild(li);
  });
}

// 4.- Agregar una nueva tarea (Primero vamos a crear la función para recuperar el valor del input)
function agregarTarea() {
  const tarea = inputTarea.value.trim();
  if (tarea === "") {
    Swal.fire({
  title: "Error",
  text: "El campo no puede estar vacío",
  icon: "error"
});
  return;
  }
  tareas.push(tarea);
  Swal.fire({
    title: "Éxito",
    text: "Tarea ingresada correctamente",
    icon: "success"
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
  inputTarea.value = "";
  mostrarTareas();
}

// 5.- Borrar una tarea
function borrarTarea(index) {
  // Eliminar tarea con de éxito
  Swal.fire({
    title: "¡Oye!",
    text: "¿Seguro que quieres eliminar esta tarea?",
    icon: "Yes/No",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "No, cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Eliminado!",
        text: "La tarea ha sido eliminada",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Cancelado",
        text: "La tarea no ha sido eliminada",
        icon: "error"
      });
    }
  });
  tareas.splice(index, 1);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
}

// 6.- Editar una tarea, cuando le de clic, el valor se va al input, el botón debe cambiar a "Actualizar" y al dar clic se actualiza la tarea
function editarTarea(index) {
  inputTarea.value = tareas[index];
  btnAgregar.innerText = "Actualizar";
  btnAgregar.onclick = function () {
    const tareaActualizada = inputTarea.value.trim();
    if (tareaActualizada === "") {
     Swal.fire({
  title: "Error",
  text: "El campo no puede estar vacío",
  icon: "error"
});
      return;
    }
    tareas[index] = tareaActualizada;
    localStorage.setItem("tareas", JSON.stringify(tareas));
    inputTarea.value = "";
    btnAgregar.innerText = "Agregar";
    btnAgregar.onclick = agregarTarea;
    mostrarTareas();
  };
}

mostrarTareas();