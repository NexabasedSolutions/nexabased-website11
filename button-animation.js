// ERWEITERTE BUTTON-ANIMATION für Vapi-Gespräche
// Fügt lebendige Animationen hinzu, die während des Gesprächs aktiviert werden

document.addEventListener('DOMContentLoaded', function() {
    console.log('Button-Animation wird geladen...');
    
    // CSS-Animationen hinzufügen
    const animationStyle = document.createElement('style');
    animationStyle.id = 'vapi-button-animations';
    animationStyle.textContent = `
        /* Basis Button-Position (unverändert) */
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
            border: none !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.3s ease !important;
        }
        
        /* NEUE ANIMATIONEN */
        
        /* Pulsing Animation für aktives Gespräch */
        @keyframes vapiPulse {
            0% {
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(29, 161, 242, 0.8);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
        }
        
        /* Glowing Animation für KI-Sprechen */
        @keyframes vapiGlow {
            0% {
                background: #1da1f2;
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
            25% {
                background: #00d4ff;
                box-shadow: 0 6px 20px rgba(0, 212, 255, 0.6);
            }
            50% {
                background: #1da1f2;
                box-shadow: 0 8px 30px rgba(29, 161, 242, 0.8);
            }
            75% {
                background: #0099cc;
                box-shadow: 0 6px 20px rgba(0, 153, 204, 0.6);
            }
            100% {
                background: #1da1f2;
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
        }
        
        /* Breathing Animation für Bereitschaft */
        @keyframes vapiBreathe {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.05);
                opacity: 0.9;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        /* Ring Animation für eingehende Anrufe */
        @keyframes vapiRing {
            0% {
                transform: scale(1) rotate(0deg);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
            25% {
                transform: scale(1.15) rotate(5deg);
                box-shadow: 0 8px 25px rgba(255, 193, 7, 0.7);
            }
            50% {
                transform: scale(1) rotate(0deg);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
            75% {
                transform: scale(1.15) rotate(-5deg);
                box-shadow: 0 8px 25px rgba(255, 193, 7, 0.7);
            }
            100% {
                transform: scale(1) rotate(0deg);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
        }
        
        /* Status-Klassen für verschiedene Zustände */
        .vapi-button-idle {
            animation: vapiBreathe 3s ease-in-out infinite;
        }
        
        .vapi-button-calling {
            animation: vapiRing 1s ease-in-out infinite;
            background: #ffc107 !important;
        }
        
        .vapi-button-connected {
            animation: vapiPulse 1.5s ease-in-out infinite;
            background: #28a745 !important;
        }
        
        .vapi-button-speaking {
            animation: vapiGlow 0.8s ease-in-out infinite;
        }
        
        .vapi-button-listening {
            animation: vapiPulse 2s ease-in-out infinite;
            background: #17a2b8 !important;
        }
        
        /* Hover-Effekt (unverändert) */
        button[style*="position: absolute"]:hover {
            background: #0d8bd9 !important;
            transform: scale(1.05) !important;
            box-shadow: 0 6px 20px rgba(29, 161, 242, 0.6) !important;
        }
        
        /* Responsive (unverändert) */
        @media (max-width: 768px) {
            button[style*="position: absolute"] {
                bottom: 15px !important;
                right: 15px !important;
                width: 50px !important;
                height: 50px !important;
            }
        }
        
        @media (max-width: 480px) {
            button[style*="position: absolute"] {
                bottom: 10px !important;
                right: 10px !important;
                width: 45px !important;
                height: 45px !important;
            }
        }
    `;
    
    document.head.appendChild(animationStyle);
    console.log('Button-Animationen hinzugefügt');
    
    // Button-Referenz für Animationen
    let vapiButton = null;
    let currentState = 'idle';
    
    // Button finden und Basis-Setup
    function setupButton() {
        vapiButton = Array.from(document.querySelectorAll('button')).find(btn => {
            const img = btn.querySelector('img');
            return img && img.alt === 'Icon';
        });
        
        if (vapiButton) {
            // Position korrigieren (unverändert)
            vapiButton.style.position = 'fixed';
            vapiButton.style.bottom = '20px';
            vapiButton.style.right = '20px';
            vapiButton.style.left = 'auto';
            vapiButton.style.zIndex = '9999';
            vapiButton.style.width = '60px';
            vapiButton.style.height = '60px';
            vapiButton.style.borderRadius = '50%';
            vapiButton.style.background = '#1da1f2';
            vapiButton.style.boxShadow = '0 4px 15px rgba(29, 161, 242, 0.4)';
            vapiButton.style.border = 'none';
            vapiButton.style.cursor = 'pointer';
            vapiButton.style.display = 'flex';
            vapiButton.style.alignItems = 'center';
            vapiButton.style.justifyContent = 'center';
            vapiButton.style.transition = 'all 0.3s ease';
            
            // Idle-Animation starten
            setButtonState('idle');
            
            console.log('Button gefunden und animiert');
            return true;
        }
        return false;
    }
    
    // Button-Status ändern
    function setButtonState(state) {
        if (!vapiButton) return;
        
        // Alle Animations-Klassen entfernen
        vapiButton.classList.remove('vapi-button-idle', 'vapi-button-calling', 'vapi-button-connected', 'vapi-button-speaking', 'vapi-button-listening');
        
        // Neue Klasse hinzufügen
        vapiButton.classList.add(`vapi-button-${state}`);
        currentState = state;
        
        console.log(`Button-Status geändert zu: ${state}`);
    }
    
    // Vapi-Events überwachen
    function setupVapiEventListeners() {
        if (window.vapiInstance) {
            console.log('Vapi-Events werden überwacht...');
            
            // Event-Listener für Vapi-Status
            if (window.vapiInstance.on) {
                window.vapiInstance.on('call-start', () => {
                    console.log('Anruf gestartet');
                    setButtonState('calling');
                });
                
                window.vapiInstance.on('call-end', () => {
                    console.log('Anruf beendet');
                    setButtonState('idle');
                });
                
                window.vapiInstance.on('speech-start', () => {
                    console.log('KI spricht');
                    setButtonState('speaking');
                });
                
                window.vapiInstance.on('speech-end', () => {
                    console.log('KI hört auf zu sprechen');
                    setButtonState('listening');
                });
                
                window.vapiInstance.on('message', (message) => {
                    if (message.type === 'conversation-update') {
                        if (message.role === 'assistant') {
                            setButtonState('speaking');
                        } else if (message.role === 'user') {
                            setButtonState('listening');
                        }
                    }
                });
            }
        }
        
        // Fallback: Periodische Zustandsänderung für Demo-Zwecke
        setInterval(() => {
            if (currentState === 'idle') {
                // Zufällige sanfte Animation alle 10 Sekunden
                if (Math.random() > 0.7) {
                    setButtonState('idle');
                }
            }
        }, 10000);
    }
    
    // Setup ausführen
    setTimeout(setupButton, 500);
    setTimeout(setupButton, 1000);
    setTimeout(setupButton, 2000);
    
    // Vapi-Events nach Initialisierung überwachen
    setTimeout(setupVapiEventListeners, 3000);
    
    // Button bei dynamischen Änderungen überwachen
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.tagName === 'BUTTON') {
                        setTimeout(setupButton, 100);
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('Button-Animation System aktiviert');
});

