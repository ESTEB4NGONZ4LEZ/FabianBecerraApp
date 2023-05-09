const API_URL = "http://localhost:3000/moduloSkill";
let moduloSkill = [];

/* INICIO GET */
function getModuloSkill() {
    fetch(`${API_URL}`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            moduloSkill = data;
            imprimirModuloSkill();
        });
}
getModuloSkill();
/* FIN GET */

/* INICIO IMPRIMIR RECLUTAS */
function imprimirModuloSkill() {
    let bodyTablaModuloSkill = document.querySelector(".table-body-modulo-skill");
    bodyTablaModuloSkill.innerHTML = "";
    moduloSkill.forEach((data) => {
        bodyTablaModuloSkill.innerHTML += `
        <tr>
            <td>${data.id}</td>
            <td>${data.nombre}</td>
            <td>${data.idSkill}</td>
            <td>
                <button id="eliminarModuloSkill" class="btn btn-danger" data-id="${data.id}">ELIMINAR</button>
            </td>
        </tr>
        `;
        listenerEliminarModuloSkill()
    });
}
/* FIN IMPRIMIR RECLUTAS */

/* INICIO POST */
const btnGuardar = document.querySelector("#guardarModuloSkill");

btnGuardar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation;

    let data = {
        nombre: document.querySelector("#nombre").value,
        idSkill: document.querySelector("#idSkill").value,
    };

    fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((repuesta) => {
        getModuloSkill();
    });
});
/* FIN POST */

/* INICIO DELETE */
listenerEliminarModuloSkill = () => {
    const btnEliminar = document.querySelectorAll("#eliminarModuloSkill");

    btnEliminar.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            deleteModuloSkill(e.target.dataset.id);
        });
    });
};
function deleteModuloSkill(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    }).then((respuesta) => {
        getModuloSkill();
    });
}
/* FIN DELETE */