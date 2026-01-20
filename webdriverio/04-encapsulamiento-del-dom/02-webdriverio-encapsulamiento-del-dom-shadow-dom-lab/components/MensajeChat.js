export class MensajeChat extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['texto', 'remitente', 'hora'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(nombre, valorAnterior, valorNuevo) {
        if (valorAnterior !== valorNuevo) {
            this.render();
        }
    }

    render() {
        const texto = this.getAttribute('texto') || '';
        const remitente = this.getAttribute('remitente') || 'usuario';
        const hora = this.getAttribute('hora') || new Date().toLocaleTimeString();
        const esSoporte = remitente === 'soporte';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 10px;
                    width: 100%;
                }
                .contenedor-mensaje {
                    display: flex;
                    flex-direction: column;
                    align-items: ${esSoporte ? 'flex-start' : 'flex-end'};
                }
                .burbuja {
                    max-width: 70%;
                    padding: 10px 15px;
                    border-radius: 15px;
                    background-color: ${esSoporte ? '#f0f0f0' : '#007bff'};
                    color: ${esSoporte ? '#333' : '#fff'};
                    border: 1px solid ${esSoporte ? '#ccc' : '#0056b3'};
                    font-size: 14px;
                    line-height: 1.4;
                }
                .meta {
                    font-size: 11px;
                    color: #888;
                    margin-top: 4px;
                    margin-left: ${esSoporte ? '5px' : '0'};
                    margin-right: ${esSoporte ? '0' : '5px'};
                }
                .nombre-remitente {
                    font-weight: bold;
                    margin-right: 5px;
                }
            </style>
            <div class="contenedor-mensaje" data-test="contenedor-mensaje">
                <div class="burbuja" data-test="texto-mensaje">
                    ${texto}
                </div>
                <div class="meta" data-test="meta-mensaje">
                    <span class="nombre-remitente" data-test="nombre-remitente">${esSoporte ? 'Soporte' : 'Tú'}</span>
                    <span class="hora" data-test="hora-mensaje">${hora}</span>
                </div>
            </div>
        `;
    }
}

customElements.define('mensaje-chat', MensajeChat);
