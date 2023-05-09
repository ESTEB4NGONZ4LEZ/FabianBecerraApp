const API_URL = "http://localhost:3000/reclutas";
let reclutas = [];

/* BTN RECULTAS */
const btnRecultas = document.querySelector("#reclutas");
const formReclutas = document.querySelector(".form-reclutas");
const tableReclutas = document.querySelector(".table-reclutas");

btnRecultas.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
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
                <button id="editar" class="btn btn-warning" onclick="datosCampos(${data.id})" data-idput="${data.id}">EDITAR</button>
            </td>
        </tr>
        `;
        listenerEliminarRecluta();
        obtenerIdRecluta();
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

/* INICIO PUT */
function datosCampos(reclutaId) {
    let recluta = reclutas.filter((e) => {
        return e.id == reclutaId;
    })[0];

    document.querySelector("#nombre").value = recluta.nombre;
    document.querySelector("#edad").value = recluta.edad;
    document.querySelector("#telefono").value = recluta.telefono;
    document.querySelector("#email").value = recluta.email;
    document.querySelector("#direccion").value = recluta.direccion;
    document.querySelector("#fechaNacimiento").value = recluta.fechaNacimiento;
    document.querySelector("#numeroIdentificacion").value =
        recluta.numeroIdentificacion;
    document.querySelector("#fechaIngreso").value = recluta.fechaIngreso;
    document.querySelector("#idTeam").value = recluta.idTeam;
    document.querySelector("#reclutaId").value = recluta.id;

    const btnGuardar = document.querySelector("#guardarRecluta");
    const btnActualizar = document.querySelector("#actualizarRecluta");

    formReclutas.style.display = "block";
    btnActualizar.style.display = "block";
    btnGuardar.style.display = "none";
}

obtenerIdRecluta = () => {
    const btnEditar = document.querySelectorAll("#editar");

    btnEditar.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            actualizarRecluta(e.target.dataset.idput);
        });
    });
};

function actualizarRecluta(id) {
    const btnActualizar = document.querySelector("#actualizarRecluta");
    btnActualizar.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        let data = {
            nombre: document.querySelector("#nombre").value,
            edad: document.querySelector("#edad").value,
            telefono: document.querySelector("#telefono").value,
            email: document.querySelector("#email").value,
            direccion: document.querySelector("#direccion").value,
            fechaNacimiento: document.querySelector("#fechaNacimiento").value,
            numeroIdentificacion: document.querySelector(
                "#numeroIdentificacion"
            ).value,
            fechaIngreso: document.querySelector("#fechaIngreso").value,
            idTeam: document.querySelector("#idTeam").value,
            id: document.querySelector("#reclutaId").value,
        };

        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((repuesta) => {
            getReclutas();
        });
    });
}

/* FIN PUT */

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
