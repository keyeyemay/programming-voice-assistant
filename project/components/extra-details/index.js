export class ExtraDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card siri-card mx-auto p-5 text-center" style="max-width: 600px; margin-top: 40px;">
                <h2 class="fw-bold mb-4">${data.title}</h2>
                <p class="text-muted mb-5 fs-5">${data.text}</p>

                <div class="d-flex justify-content-center gap-3 mt-4">
                    <button id="btn-back-to-card" class="btn btn-secondary siri-btn px-4" style="background-color: #8e8e93;">
                        ← Назад
                    </button>
                    <button id="btn-go-home" class="btn btn-primary siri-btn px-4">
                        Домой 🏠
                    </button>
                </div>
            </div>
        `;
    }

    render(data, backListener, homeListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        // Привязываем события к кнопкам
        document.getElementById('btn-back-to-card').addEventListener('click', backListener);
        document.getElementById('btn-go-home').addEventListener('click', homeListener);
    }
}
