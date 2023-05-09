const API_URL = "http://localhost:3000/skill";
let skill = [];

/* INICIO GET */
function getSkill() {
    fetch(`${API_URL}`)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            skill = data;
            imprimirSkill();
        });
}
getSkill();
/* FIN GET */

/* INICIO IMPRIMIR RECLUTAS */
function imprimirSkill() {
    let bodyTablaSkill = document.querySelector(".table-body-skill");
    bodyTablaSkill.innerHTML = "";
    skill.forEach((data) => {
        bodyTablaSkill.innerHTML += `
        <tr>
            <td>${data.idSkill}</td>
            <td>${data.nombre}</td>
            <td>
                <button id="eliminarSkill" class="btn btn-danger" data-id="${data.id}">ELIMINAR</button>
            </td>
        </tr>
        `;
        listenerEliminarSkill()
    });
}
/* FIN IMPRIMIR RECLUTAS */

/* INICIO POST */
const btnGuardar = document.querySelector("#guardarSkill");

btnGuardar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation;

    let data = {
        idSkill: document.querySelector("#idSkill").value,
        nombre: document.querySelector("#nombre").value,
    };

    fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((repuesta) => {
        getSkill();
    });
});
/* FIN POST */

/* INICIO DELETE */
listenerEliminarSkill = () => {
    const btnEliminar = document.querySelectorAll("#eliminarSkill");

    btnEliminar.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            deleteSkill(e.target.dataset.id);
        });
    });
};
function deleteSkill(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    }).then((respuesta) => {
        getSkill();
    });
}
/* FIN DELETE */