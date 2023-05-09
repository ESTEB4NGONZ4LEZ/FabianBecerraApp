const API_URL = "http://localhost:3000/team";
let team = [];

/* INICIO GET */
function getTeam() {
    fetch(`${API_URL}`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            team = data;
            imprimirTeam();
        });
}
getTeam();
/* FIN GET */

/* INICIO IMPRIMIR RECLUTAS */
function imprimirTeam() {
    let bodyTablaTeam = document.querySelector(".table-body-team");
    bodyTablaTeam.innerHTML = "";
    team.forEach((data) => {
        bodyTablaTeam.innerHTML += `
        <tr>
            <td>${data.idTeam}</td>
            <td>${data.nombre}</td>
            <td>${data.trainerAsociado}</td>
            <td>
                <button id="eliminarTeam" class="btn btn-danger" data-id="${data.id}">ELIMINAR</button>
            </td>
        </tr>
        `;
        listenerEliminarTeam()
    });
}
/* FIN IMPRIMIR RECLUTAS */

/* INICIO POST */
const btnGuardar = document.querySelector("#guardarTeam");

btnGuardar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation;

    let data = {
        idTeam: document.querySelector("#idTeam").value,
        nombre: document.querySelector("#nombre").value,
        trainerAsociado: document.querySelector("#trainerAsociado").value,
    };

    fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((repuesta) => {
        getTeam();
    });
});
/* FIN POST */

/* INICIO DELETE */
listenerEliminarTeam = () => {
    const btnEliminar = document.querySelectorAll("#eliminarTeam");

    btnEliminar.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            deleteTeam(e.target.dataset.id);
        });
    });
};
function deleteTeam(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    }).then((respuesta) => {
        getTeam();
    });
}
/* FIN DELETE */