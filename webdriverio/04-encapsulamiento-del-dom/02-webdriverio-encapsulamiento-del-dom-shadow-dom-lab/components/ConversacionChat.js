export class ConversacionChat extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.mensajes = [
            { id: 1, texto: 'Hola, ¿en qué puedo ayudarte hoy?', remitente: 'soporte', hora: '10:00' }
        ];
    }

    static get observedAttributes() {
        return ['nombre-chat'];
    }

    attributeChangedCallback(nombre, valorAnterior, valorNuevo) {
        if (nombre === 'nombre-chat' && valorAnterior !== valorNuevo) {
            this.cargarMensajesParaChat(valorNuevo);
        }
    }

    cargarMensajesParaChat(nombreChat) {
        const ahora = new Date();
        const hora = (minutosOffset = 0) => {
            const t = new Date(ahora.getTime() - minutosOffset * 60000);
            return t.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        };

        if (nombreChat === 'Soporte técnico') {
            this.mensajes = [
                { id: 1, texto: 'Hola, ¿en qué puedo ayudarte hoy?', remitente: 'soporte', hora: hora(15) },
                { id: 2, texto: 'Tengo un problema con mi conexión a internet.', remitente: 'usuario', hora: hora(14) },
                { id: 3, texto: 'Entiendo. ¿Has probado a reiniciar el router?', remitente: 'soporte', hora: hora(12) },
                { id: 4, texto: 'Sí, ya lo hice pero sigue igual.', remitente: 'usuario', hora: hora(10) },
                { id: 5, texto: 'De acuerdo, voy a comprobar el estado de tu línea. Un momento por favor.', remitente: 'soporte', hora: hora(9) }
            ];
        } else if (nombreChat === 'Ventas') {
            this.mensajes = [
                { id: 10, texto: '¡Hola! Bienvenido al departamento de ventas.', remitente: 'soporte', hora: hora(60) },
                { id: 11, texto: 'Estoy interesado en el plan premium.', remitente: 'usuario', hora: hora(55) },
                { id: 12, texto: '¡Excelente elección! El plan premium incluye soporte 24/7 y acceso ilimitado.', remitente: 'soporte', hora: hora(50) },
                { id: 13, texto: '¿Tiene algún descuento anual?', remitente: 'usuario', hora: hora(45) },
                { id: 14, texto: 'Sí, si pagas anualmente te ahorras dos meses.', remitente: 'soporte', hora: hora(40) }
            ];
        } else {
            this.mensajes = [
                { id: 20, texto: `Bienvenido al canal de ${nombreChat}. ¿En qué podemos ayudarte?`, remitente: 'soporte', hora: hora(0) }
            ];
        }
        this.render();
    }

    connectedCallback() {
        const nombreChat = this.getAttribute('nombre-chat');
        if (nombreChat) {
            this.cargarMensajesParaChat(nombreChat);
        } else {
            this.render();
        }

        this.shadowRoot.addEventListener('mensaje-enviado', (e) => {
            this.agregarMensaje(e.detail.texto);
        });
    }

    agregarMensaje(texto) {
        this.mensajes.push({
            id: Date.now(),
            texto: texto,
            remitente: 'usuario',
            hora: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        });
        this.render();

        this.gestionarRespuestaAutomatica(texto);
    }

    gestionarRespuestaAutomatica(textoUsuario) {
        const nombreChat = this.getAttribute('nombre-chat');
        let textoRespuesta = '';
        let timeout = 1000;

        const textoMinusculas = textoUsuario.toLowerCase();

        if (nombreChat === 'Soporte técnico') {
            if (textoMinusculas.includes('como va la comprobación') || textoMinusculas.includes('cómo va la comprobación')) {
                textoRespuesta = 'Siguen mirándolo, por favor espere un momento más.';
            } else {
                textoRespuesta = 'Gracias por tu mensaje. Un agente te atenderá pronto.';
            }
        } else if (nombreChat === 'Facturación') {
            if (textoMinusculas.includes('no he recibido en el email la última factura') || textoMinusculas.includes('no he recibido la factura')) {
                textoRespuesta = 'Hemos tenido un problema con los envíos automáticos. ¿Quieres que te la envíe al email o por whatsapp?';
            } else if (textoMinusculas.includes('email') || textoMinusculas.includes('whatsapp')) {
                textoRespuesta = 'Te la acabo de enviar. ¿Necesitas algo más?';
            } else {
                textoRespuesta = 'Entendido. ¿En qué más puedo ayudarte con tu facturación?';
            }
        } else {
            textoRespuesta = 'Gracias por tu mensaje. Un agente te atenderá pronto.';
        }

        if (textoRespuesta) {
            setTimeout(() => {
                this.mensajes.push({
                    id: Date.now() + 1,
                    texto: textoRespuesta,
                    remitente: 'soporte',
                    hora: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                });
                this.render();
            }, timeout);
        }
    }

    render() {
        const nombreChat = this.getAttribute('nombre-chat') || 'Chat';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: #f9f9f9;
                }
                .cabecera {
                    padding: 15px 20px;
                    background: #fff;
                    border-bottom: 1px solid #eee;
                    font-weight: bold;
                    color: #333;
                }
                .area-mensajes {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                }
                .area-mensajes::-webkit-scrollbar {
                    width: 6px;
                }
                .area-mensajes::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .area-mensajes::-webkit-scrollbar-thumb {
                    background: #ccc;
                    border-radius: 3px;
                }
            </style>

            <div class="cabecera" id="cabecera-chat" data-test="cabecera-chat">${nombreChat}</div>

            <div class="area-mensajes" id="contenedor-mensajes" data-test="contenedor-mensajes">
                ${this.mensajes.map(msg => `
                    <mensaje-chat
                        id="msg-${msg.id}"
                        data-test="burbuja-mensaje"
                        texto="${msg.texto}"
                        remitente="${msg.remitente}"
                        hora="${msg.hora}">
                    </mensaje-chat>
                `).join('')}
            </div>

            <input-mensaje id="area-entrada" data-test="componente-input-mensaje"></input-mensaje>
        `;

        const areaMensajes = this.shadowRoot.querySelector('.area-mensajes');
        if (areaMensajes) {
            areaMensajes.scrollTop = areaMensajes.scrollHeight;
        }
    }
}

customElements.define('conversacion-chat', ConversacionChat);
