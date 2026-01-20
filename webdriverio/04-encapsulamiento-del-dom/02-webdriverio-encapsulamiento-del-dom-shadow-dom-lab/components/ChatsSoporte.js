export class ChatsSoporte extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.chats = [
            { id: 1, nombre: 'Soporte técnico', activo: true },
            { id: 2, nombre: 'Ventas', activo: false },
            { id: 3, nombre: 'Facturación', activo: false }
        ];
    }

    connectedCallback() {
        this.render();
        this.inicializarEventListeners();
    }

    inicializarEventListeners() {
        this.shadowRoot.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', () => {
                const id = parseInt(li.getAttribute('data-id'));
                this.setChatActivo(id);
                this.dispatchEvent(new CustomEvent('chat-seleccionado', {
                    detail: { chatId: id, nombreChat: this.chats.find(c => c.id === id).nombre },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }

    setChatActivo(id) {
        this.chats = this.chats.map(c => ({ ...c, activo: c.id === id }));
        this.render();
        this.inicializarEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 250px;
                    border-right: 1px solid #eee;
                    background: #fff;
                    height: 100%;
                }
                h3 {
                    padding: 20px;
                    margin: 0;
                    border-bottom: 1px solid #eee;
                    font-size: 16px;
                    color: #333;
                }
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                li {
                    padding: 15px 20px;
                    cursor: pointer;
                    border-bottom: 1px solid #f9f9f9;
                    transition: background 0.2s;
                }
                li:hover {
                    background: #f5f5f5;
                }
                li.activo {
                    background: #e3f2fd;
                    border-left: 4px solid #007bff;
                }
                .estado {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: #28a745;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            </style>
            <h3 data-test="titulo-lista-chats">Conversaciones</h3>
            <ul id="ul-lista-chats" data-test="elementos-lista-chats">
                ${this.chats.map(chat => `
                    <li class="${chat.activo ? 'activo' : ''}"
                        data-id="${chat.id}"
                        data-test="elemento-chat-${chat.id}"
                        id="elemento-chat-${chat.id}">
                        <span class="estado"></span>${chat.nombre}
                    </li>
                `).join('')}
            </ul>
        `;
    }
}

customElements.define('chats-soporte', ChatsSoporte);
