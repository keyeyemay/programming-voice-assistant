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
                        <button class="accordion-button ${isFirst ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${item.target}" aria-expanded="${isFirst}" aria-controls="collapse${item.target}">
                            ${item.title}
                        </button>
                    </h2>
                    <div id="collapse${item.target}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" aria-labelledby="heading${item.target}" data-bs-parent="#siriAccordion">
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

                            <div class="accordion" id="siriAccordion">
                                ${this.getAccordionItems(data.accordion)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
