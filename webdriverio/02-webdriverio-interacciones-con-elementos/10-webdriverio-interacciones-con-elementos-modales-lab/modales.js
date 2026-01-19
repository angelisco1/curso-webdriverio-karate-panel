const btnAlerta = document.getElementById('btn-alerta')
const btnConfirmar = document.getElementById('btn-confirmar')
const btnSolicitud = document.getElementById('btn-solicitud')

const resultadoConfirmacion = document.getElementById('resultado-confirmacion')
const resultadoSolicitud = document.getElementById('resultado-solicitud')

if (btnAlerta) {
    btnAlerta.addEventListener('click', () => {
        alert('Esto es una alerta nativa del navegador.')
    })
}

if (btnConfirmar) {
    btnConfirmar.addEventListener('click', () => {
        const resultado = confirm('¿Estás seguro de que deseas continuar?')
        resultadoConfirmacion.textContent = resultado ? 'Confirmado' : 'Cancelado'
        resultadoConfirmacion.style.color = resultado ? 'green' : 'red'
    })
}

if (btnSolicitud) {
    btnSolicitud.addEventListener('click', () => {
        const nombre = prompt('Por favor, introduce tu nombre:', 'Usuario')
        if (nombre !== null) {
            resultadoSolicitud.textContent = nombre ? nombre : '(Vacío)'
        } else {
            resultadoSolicitud.textContent = 'Cancelado'
        }
    })
}

const btnModal = document.getElementById('btn-modal')
const modal = document.getElementById('modal')
const btnCerrarModal = document.getElementById('btn-cerrar-modal')
const btnCerrarFooterModal = document.getElementById('btn-cerrar-footer-modal')
const btnGuardarModal = document.getElementById('btn-guardar-modal')
const notificacion = document.getElementById('notificacion')

function abrirModal() {
    modal.classList.add('abierto')
}

function cerrarModal() {
    modal.classList.remove('abierto')
}

function mostrarNotificacion() {
    if (notificacion) {
        notificacion.classList.add('mostrar')
        setTimeout(() => {
            notificacion.classList.remove('mostrar')
        }, 3000)
    }
}

if (btnModal) {
    btnModal.addEventListener('click', abrirModal)
}

if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', cerrarModal)
}

if (btnCerrarFooterModal) {
    btnCerrarFooterModal.addEventListener('click', cerrarModal)
}

if (btnGuardarModal) {
    btnGuardarModal.addEventListener('click', () => {
        console.log('Guardando cambios del modal...')
        cerrarModal()
        mostrarNotificacion()
    })
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal()
        }
    })
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('abierto')) {
        cerrarModal()
    }
})
