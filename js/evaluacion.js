const API_URL = "http://localhost:3000/evaluacion";
let evaluacion = [];

/* INICIO GET */
function getEvaluacion() {
    fetch(`${API_URL}`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            evaluacion = data;
            imprimirEvaluacion();
        });
}
getEvaluacion();
/* FIN GET */

/* INICIO IMPRIMIR RECLUTAS */
function imprimirEvaluacion() {
    let bodyTablaEvaluacion = document.querySelector(".table-body-evaluacion");
    bodyTablaEvaluacion.innerHTML = "";
    evaluacion.forEach((data) => {
        bodyTablaEvaluacion.innerHTML += `
        <tr>
            <td>${data.idRecluta}</td>
            <td>${data.idModulo}</td>
            <td>${data.nota}</td>
            <td>
                <button id="eliminarEvaluacion" class="btn btn-danger" data-id="${data.id}">ELIMINAR</button>
            </td>
        </tr>
        `;
        listenerEliminarEvaluacion()
    });
}
/* FIN IMPRIMIR RECLUTAS */

/* INICIO POST */
const btnGuardar = document.querySelector("#guardarEvaluacion");

btnGuardar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation;

    let data = {
        idRecluta: document.querySelector("#idRecluta").value,
        idModulo: document.querySelector("#idModulo").value,
        nota: document.querySelector("#nota").value,
    };

    fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((repuesta) => {
        getEvaluacion();
    });
});
/* FIN POST */

/* INICIO DELETE */
listenerEliminarEvaluacion = () => {
    const btnEliminar = document.querySelectorAll("#eliminarEvaluacion");

    btnEliminar.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            deleteEvaluacion(e.target.dataset.id);
        });
    });
};
function deleteEvaluacion(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    }).then((respuesta) => {
        getEvaluacion();
    });
}
/* FIN DELETE */