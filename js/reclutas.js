const API_URL = "http://localhost:3000/reclutas";
let reclutas = [];

/* BTN RECULTAS */
const btnRecultas = document.querySelector("#reclutas");
const formReclutas = document.querySelector(".form-reclutas");
const tableReclutas = document.querySelector(".table-reclutas");

btnRecultas.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation()
    formReclutas.style.display = "block";
    tableReclutas.style.display = "none";
});
/* FIN BTN RECULTAS */

/* INICIO GET */
function getReclutas() {
    fetch(`${API_URL}`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            reclutas = data;
            imprimirReclutas();
        });
}
getReclutas();
/* FIN GET */

/* INICIO IMPRIMIR RECLUTAS */
function imprimirReclutas() {
    let bodyTablaReclutas = document.querySelector(".table-body-reclutas");
    bodyTablaReclutas.innerHTML = "";
    reclutas.forEach((data) => {
        bodyTablaReclutas.innerHTML += `
        <tr>
            <td>${data.id}</td>
            <td>${data.nombre}</td>
            <td>${data.edad}</td>
            <td>${data.telefono}</td>
            <td>${data.email}</td>
            <td>${data.direccion}</td>
            <td>${data.fechaNacimiento}</td>
            <td>${data.numeroIdentificacion}</td>
            <td>${data.fechaIngreso}</td>
            <td>${data.idTeam}</td>
            <td>
                <button id="eliminarRecluta" class="btn btn-danger" data-id="${data.id}">ELIMINAR</button>
            </td>
        </tr>
        `;
        listenerEliminarRecluta();
    });
}
/* FIN IMPRIMIR RECLUTAS */

/* INICIO POST */
const btnGuardar = document.querySelector("#guardarRecluta");

btnGuardar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation;

    let data = {
        nombre: document.querySelector("#nombre").value,
        edad: document.querySelector("#edad").value,
        telefono: document.querySelector("#telefono").value,
        email: document.querySelector("#email").value,
        direccion: document.querySelector("#direccion").value,
        fechaNacimiento: document.querySelector("#fechaNacimiento").value,
        numeroIdentificacion: document.querySelector("#numeroIdentificacion")
            .value,
        fechaIngreso: document.querySelector("#fechaIngreso").value,
        idTeam: document.querySelector("#idTeam").value,
    };

    fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((repuesta) => {
        getReclutas();
    });
});
/* FIN POST */

/* INICIO DELETE */
listenerEliminarRecluta = () => {
    const btnEliminar = document.querySelectorAll("#eliminarRecluta");

    btnEliminar.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            deleteRecluta(e.target.dataset.id);
        });
    });
};
function deleteRecluta(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    }).then((respuesta) => {
        getReclutas();
    });
}
/* FIN DELETE */
