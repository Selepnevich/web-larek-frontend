export interface IModal {
  open(): void;
  close(): void;
  setContent(content: HTMLElement): void;
}

export class ModalView implements IModal {
    private modalElement: HTMLElement;
    private modalContent: HTMLElement;
    private closeButton: HTMLElement;

    constructor() {
        const modal = document.querySelector('.modal') as HTMLElement;
        const content = modal?.querySelector('.modal__content') as HTMLElement;
        const closeBtn = modal?.querySelector('.modal__close') as HTMLElement;

        if (!modal || !content || !closeBtn) {
            throw new Error("Модальное окно не найдено в DOM!");
        }

        this.modalElement = modal;
        this.modalContent = content;
        this.closeButton = closeBtn;

        this.closeButton.addEventListener('click', () => this.close());
        this.modalElement.addEventListener('click', (event) => this.outsideClick(event));
    }

    open(): void {
        this.modalElement.classList.add('modal_active');
    }

    close(): void {
        this.modalElement.classList.remove('modal_active');
    }

    setContent(content: HTMLElement): void {
        this.modalContent.innerHTML = ''; // Очищаем старое содержимое
        this.modalContent.appendChild(content); // Добавляем новый контент
    }
    private outsideClick(event: MouseEvent): void {
        if (event.target === this.modalElement) {
            this.close();
        }
    }
}