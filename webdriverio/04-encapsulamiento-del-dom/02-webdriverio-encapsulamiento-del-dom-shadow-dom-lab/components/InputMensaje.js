export class InputMensaje extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.inicializarEventListeners();
    }

    inicializarEventListeners() {
        const formulario = this.shadowRoot.querySelector('form');
        const input = this.shadowRoot.querySelector('input');

        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            const texto = input.value.trim();
            if (texto) {
                this.dispatchEvent(new CustomEvent('mensaje-enviado', {
                    detail: { texto },
                    bubbles: true,
                    composed: true
                }));
                input.value = '';
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 15px;
                    background: #fff;
                    border-top: 1px solid #eee;
                }
                form {
                    display: flex;
                    gap: 10px;
                }
                input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                }
                button {
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                }
                button:hover {
                    background: #0056b3;
                }
            </style>
            <form id="formulario-mensaje" data-test="formulario-mensaje">
                <input id="input-mensaje" data-test="input-mensaje" type="text" placeholder="Escribe un mensaje..." required>
                <button id="boton-enviar" data-test="boton-enviar" type="submit">Enviar</button>
            </form>
        `;
    }
}

customElements.define('input-mensaje', InputMensaje);
