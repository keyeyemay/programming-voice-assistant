export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getAccordionItems(accordionData) {
        let itemsHTML = '';
        accordionData.forEach((item, index) => {
            const isFirst = index === 0;
            itemsHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${item.target}">
                        <button class="accordion-button ${isFirst ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${item.target}">
                            ${item.title}
                        </button>
                    </h2>
                    <div id="collapse${item.target}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" data-bs-parent="#siriAccordion">
                        <div class="accordion-body">
                            ${item.body}
                        </div>
                    </div>
                </div>
            `;
        });
        return itemsHTML;
    }

    getHTML(data) {
        return `
            <div class="card siri-card mx-auto p-4" style="max-width: 800px;">
                <div class="row g-0">
                    <div class="col-md-3 d-flex align-items-center justify-content-center">
                        <div style="font-size: 6rem;">${data.icon}</div>
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h2 class="card-title fw-bold mb-3">${data.title}</h2>
                            <p class="card-text text-muted mb-4">${data.description}</p>

                            <div class="accordion mb-4" id="siriAccordion">
                                ${this.getAccordionItems(data.accordion)}
                            </div>

                            <button class="btn btn-primary siri-btn px-4" id="btn-extra-details">Подробнее о функции</button>

                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Принимаем функцию moreDetailsListener из страницы
    render(data, moreDetailsListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        // Вешаем слушатель на новую кнопку
        document.getElementById('btn-extra-details').addEventListener('click', moreDetailsListener);
    }
}
