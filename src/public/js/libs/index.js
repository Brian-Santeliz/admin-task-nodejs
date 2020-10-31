import Swal from "sweetalert2";
import axios from "axios";

const btn = document.getElementById("eliminar");
if (btn) {
  btn.addEventListener("click", (e) => {
    const url = e.target.dataset.url;
    Swal.fire({
      title: "¿Estás seguro en eliminar este proyecto?",
      text: "Despues de eliminar este proyecto no se puede recuperar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const peticion = `${location.origin}/proyecto/eliminar/${url}`;
        axios
          .delete(peticion, { params: { url } })
          .then((respuesta) => {
            Swal.fire("Eliminado!", `${respuesta.data}`, "success");
            setTimeout(() => {
              location.href = "/";
            }, 1000);
          })
          .catch(() => {
            Swal.fire(
              "Ha ocurrido un error",
              "No se pudo eliminar este proyecto",
              "error"
            );
          });
      }
    });
  });
}

const li = document.querySelector(".listado-pendientes");
if (li) {
  li.addEventListener("click", (e) => {
    const clase = e.target.classList.contains("fa-check-circle");
    if (clase) {
      console.log("click en la clase");
    }
  });
}
