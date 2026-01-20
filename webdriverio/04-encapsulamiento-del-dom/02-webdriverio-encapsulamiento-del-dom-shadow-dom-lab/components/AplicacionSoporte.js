export class AplicacionSoporte extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.addEventListener('chat-seleccionado', (e) => {
            const conversacion = this.shadowRoot.querySelector('conversacion-chat');
            conversacion.setAttribute('nombre-chat', e.detail.nombreChat);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 900px;
                    margin: 0 auto;
                    height: 600px;
                    background: #fff;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .contenedor {
                    display: flex;
                    height: 100%;
                }
            </style>
            <div class="contenedor" id="contenedor-principal" data-test="layout-principal">
                <chats-soporte id="barra-lateral-chats" data-test="componente-chats"></chats-soporte>
                <conversacion-chat id="ventana-chat" data-test="componente-conversacion-chat" style="flex: 1;" nombre-chat="Soporte técnico"></conversacion-chat>
            </div>
        `;
    }
}

customElements.define('aplicacion-soporte', AplicacionSoporte);
