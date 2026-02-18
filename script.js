document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('corretorForm');
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');

    // IMPORTANT: User needs to replace this URL after deploying the Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyH8cSHSjIb6lB-UYonlk1y6cmhcGlLsXemCJrO7NaYN82hWel3i1X0-0yL2FbLSFF0/exec';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation check (HTML5 required attribute handles most)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Check if URL is configured
        if (GOOGLE_SCRIPT_URL === 'INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE') {
            showToast('Erro: URL do script não configurada. Veja as instruções.', 'error');
            return;
        }

        setLoading(true);

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        // Handle inputs, including multiple checkboxes with same name
        for (const [key, value] of formData.entries()) {
            if (data[key]) {
                // If key already exists (multi-select checkboxes), append value
                data[key] = data[key] + ', ' + value;
            } else {
                data[key] = value;
            }
        }

        try {
            // Send data to Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Since mode is 'no-cors', we can't read the response status directly in a standard way
            // But if it doesn't throw an error, it usually means it went through.
            // For better error handling, we would need to use a proxy or CORS-enabled backend,
            // but for this simple use case, 'no-cors' + try/catch is standard for GAS.
            
            showToast('Formulário enviado com sucesso!', 'success');
            form.reset();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Erro ao enviar:', error);
            showToast('Erro ao enviar formulário. Tente novamente.', 'error');
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Enviar Respostas';
            submitBtn.disabled = false;
        }
    }

    function showToast(message, type) {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.className = 'toast hidden';
        }, 3000);
    }
});
