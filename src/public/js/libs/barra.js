import Swal from "sweetalert2";
export const barra = () => {
  const tareas = document.querySelectorAll(".tarea-li").length;
  if (tareas) {
    const completadas = document.querySelectorAll("i.completo").length;
    const porcentaje = document.getElementById("porcentaje");
    let avance = Math.round((completadas / tareas) * 100);
    avance += "%";
    porcentaje.style.width = avance;
    if (avance === "100%") {
      Swal.fire("Completado!", "Haz terminado todas las tareas", "success");
    }
  }
};
