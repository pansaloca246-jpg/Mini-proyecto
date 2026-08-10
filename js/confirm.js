export function showConfirm(message) {
    return new Promise((resolve) => {
        let modal = document.getElementById('custom-confirm-modal');
        
        if (!modal) {
            const html = `
                <div class="modal" id="custom-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title" hidden>
                    <div class="modal__backdrop" id="confirm-modal-backdrop"></div>
                    <div class="modal__content" style="max-width: 400px; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                        <h3 id="confirm-modal-title" style="margin-bottom: 1rem;">¿Estás seguro?</h3>
                        <p class="modal__description" id="confirm-modal-message" style="margin-bottom: 2rem;">${message}</p>
                        <div class="form-group form-actions" style="justify-content: center; gap: 1rem;">
                            <button class="btn btn--danger" id="confirm-btn-yes" type="button">Eliminar</button>
                            <button class="btn btn--ghost" id="confirm-btn-no" type="button">Cancelar</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
            modal = document.getElementById('custom-confirm-modal');
        } else {
            document.getElementById('confirm-modal-message').textContent = message;
        }

        const btnYes = document.getElementById('confirm-btn-yes');
        const btnNo = document.getElementById('confirm-btn-no');
        const backdrop = document.getElementById('confirm-modal-backdrop');

        const cleanup = () => {
            modal.hidden = true;
            // Clonamos los nodos para remover los event listeners viejos
            btnYes.replaceWith(btnYes.cloneNode(true));
            btnNo.replaceWith(btnNo.cloneNode(true));
            backdrop.replaceWith(backdrop.cloneNode(true));
            document.removeEventListener('keydown', handleKeydown);
        };

        const handleKeydown = (e) => {
            if (e.key === 'Escape' && !modal.hidden) {
                cleanup();
                resolve(false);
            }
        };

        btnYes.addEventListener('click', () => {
            cleanup();
            resolve(true);
        });

        btnNo.addEventListener('click', () => {
            cleanup();
            resolve(false);
        });

        backdrop.addEventListener('click', () => {
            cleanup();
            resolve(false);
        });

        document.addEventListener('keydown', handleKeydown);

        modal.hidden = false;
        // Animación suave de entrada
        const content = modal.querySelector('.modal__content');
        content.style.transform = 'scale(0.95) translateY(10px)';
        content.style.opacity = '0';
        
        requestAnimationFrame(() => {
            content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            content.style.transform = 'scale(1) translateY(0)';
            content.style.opacity = '1';
        });

        btnNo.focus();
    });
}
