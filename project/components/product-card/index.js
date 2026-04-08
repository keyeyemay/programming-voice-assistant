export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card siri-card flex-fill" style="max-width: 300px; min-width: 250px;">
                <div class="siri-icon">${data.icon}</div>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title fw-bold">${data.title}</h5>
                    <p class="card-text text-muted flex-grow-1">${data.text}</p>
                    <button class="btn btn-primary siri-btn mt-auto" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
