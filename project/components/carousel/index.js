import { ProductCardComponent } from "../product-card/index.js";

export class CarouselComponent {
    constructor(parent) {
        this.parent = parent;
    }

    chunkData(data, chunkSize) {
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }
        return chunks;
    }

    getHTML(chunks) {
        let indicatorsHTML = '';
        let itemsHTML = '';

        chunks.forEach((chunk, index) => {
            const isActive = index === 0 ? 'active' : '';

            indicatorsHTML += `<button type="button" data-bs-target="#siriCarousel" data-bs-slide-to="${index}" class="${isActive}" aria-current="true"></button>`;

            itemsHTML += `
                <div class="carousel-item ${isActive}">
                    <div class="d-flex justify-content-center gap-4 p-4" id="carousel-slide-${index}">
                        </div>
                </div>
            `;
        });

        return `
            <div id="siriCarousel" class="carousel carousel-dark slide" data-bs-ride="carousel" style="padding-bottom: 50px;">
                <div class="carousel-indicators" style="bottom: 0;">
                    ${indicatorsHTML}
                </div>
                <div class="carousel-inner">
                    ${itemsHTML}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#siriCarousel" data-bs-slide="prev" style="width: 5%;">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Предыдущий</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#siriCarousel" data-bs-slide="next" style="width: 5%;">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Следующий</span>
                </button>
            </div>
        `;
    }

    render(data, clickHandler) {
        const chunks = this.chunkData(data, 3);

        const html = this.getHTML(chunks);
        this.parent.insertAdjacentHTML('beforeend', html);

        chunks.forEach((chunk, index) => {
            const slideContainer = document.getElementById(`carousel-slide-${index}`);
            chunk.forEach(item => {
                const productCard = new ProductCardComponent(slideContainer);
                productCard.render(item, clickHandler);
            });
        });
    }
}
