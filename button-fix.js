// SOFORTIGE BUTTON-KORREKTUR
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        button[style*="position: absolute"] {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            left: auto !important;
            z-index: 9999 !important;
            width: 60px !important;
            height: 60px !important;
            border-radius: 50% !important;
            background: #1da1f2 !important;
            box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4) !important;
        }
        
        @media (max-width: 768px) {
            button[style*="position: absolute"] {
                bottom: 15px !important;
                right: 15px !important;
                width: 50px !important;
                height: 50px !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Button direkt korrigieren
    setTimeout(() => {
        const phoneButton = Array.from(document.querySelectorAll('button')).find(btn => {
            const img = btn.querySelector('img');
            return img && img.alt === 'Icon';
        });
        
        if (phoneButton) {
            phoneButton.style.position = 'fixed';
            phoneButton.style.bottom = '20px';
            phoneButton.style.right = '20px';
            phoneButton.style.left = 'auto';
            phoneButton.style.zIndex = '9999';
        }
    }, 1000);
});
