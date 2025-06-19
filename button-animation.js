// VERBESSERTE VAPI BUTTON-ANIMATION
// Rot bei Verbindung + Intensives Pulsieren beim KI-Sprechen

document.addEventListener('DOMContentLoaded', function() {
    console.log('Verbesserte Button-Animation wird geladen...');
    
    // CSS-Animationen hinzufügen
    const animationStyle = document.createElement('style');
    animationStyle.id = 'vapi-button-enhanced-animations';
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
            transition: background 0.5s ease, box-shadow 0.3s ease !important;
        }
        
        /* VERBESSERTE ANIMATIONEN */
        
        /* Sanftes Pulsieren für Bereitschaft (Blau) */
        @keyframes idlePulse {
            0% {
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(29, 161, 242, 0.6);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
        }
        
        /* Verbindungsaufbau Animation (Gelb zu Rot) */
        @keyframes connecting {
            0% {
                background: #1da1f2;
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
            25% {
                background: #ffc107;
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(255, 193, 7, 0.6);
            }
            50% {
                background: #ff6b35;
                transform: scale(1.05);
                box-shadow: 0 8px 25px rgba(255, 107, 53, 0.7);
            }
            75% {
                background: #dc3545;
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(220, 53, 69, 0.6);
            }
            100% {
                background: #dc3545;
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5);
            }
        }
        
        /* Verbunden - Sanftes Rot-Pulsieren */
        @keyframes connectedPulse {
            0% {
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5);
            }
            50% {
                transform: scale(1.03);
                box-shadow: 0 6px 18px rgba(220, 53, 69, 0.7);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5);
            }
        }
        
        /* INTENSIVES KI-SPRECHEN PULSIEREN (Sehr sichtbar!) */
        @keyframes aiSpeaking {
            0% {
                transform: scale(1);
                background: #dc3545;
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5);
            }
            25% {
                transform: scale(1.2);
                background: #ff1744;
                box-shadow: 0 10px 40px rgba(255, 23, 68, 0.9);
            }
            50% {
                transform: scale(1.15);
                background: #f44336;
                box-shadow: 0 12px 45px rgba(244, 67, 54, 1);
            }
            75% {
                transform: scale(1.25);
                background: #e91e63;
                box-shadow: 0 15px 50px rgba(233, 30, 99, 0.95);
            }
            100% {
                transform: scale(1);
                background: #dc3545;
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5);
            }
        }
        
        /* Zuhören - Mittleres Pulsieren (Rot) */
        @keyframes aiListening {
            0% {
                transform: scale(1);
                background: #dc3545;
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5);
            }
            50% {
                transform: scale(1.08);
                background: #c82333;
                box-shadow: 0 8px 30px rgba(200, 35, 51, 0.8);
            }
            100% {
                transform: scale(1);
                background: #dc3545;
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5);
            }
        }
        
        /* Auflegen Animation (Rot zu Blau) */
        @keyframes disconnecting {
            0% {
                background: #dc3545;
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5);
            }
            25% {
                background: #6f42c1;
                transform: scale(0.95);
                box-shadow: 0 6px 20px rgba(111, 66, 193, 0.6);
            }
            50% {
                background: #007bff;
                transform: scale(1.05);
                box-shadow: 0 8px 25px rgba(0, 123, 255, 0.7);
            }
            75% {
                background: #17a2b8;
                transform: scale(0.98);
                box-shadow: 0 6px 20px rgba(23, 162, 184, 0.6);
            }
            100% {
                background: #1da1f2;
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(29, 161, 242, 0.4);
            }
        }
        
        /* STATUS-KLASSEN für verschiedene Zustände */
        .vapi-button-idle {
            background: #1da1f2 !important;
            animation: idlePulse 3s ease-in-out infinite !important;
        }
        
        .vapi-button-connecting {
            animation: connecting 2s ease-in-out !important;
        }
        
        .vapi-button-connected {
            background: #dc3545 !important;
            animation: connectedPulse 2.5s ease-in-out infinite !important;
        }
        
        .vapi-button-speaking {
            background: #dc3545 !important;
            animation: aiSpeaking 0.6s ease-in-out infinite !important;
        }
        
        .vapi-button-listening {
            background: #dc3545 !important;
            animation: aiListening 1.2s ease-in-out infinite !important;
        }
        
        .vapi-button-disconnecting {
            animation: disconnecting 1.5s ease-in-out !important;
        }
        
        /* Hover-Effekt (angepasst für Zustand) */
        button[style*="position: absolute"]:hover.vapi-button-idle {
            background: #0d8bd9 !important;
            transform: scale(1.05) !important;
            box-shadow: 0 6px 20px rgba(13, 139, 217, 0.8) !important;
        }
        
        button[style*="position: absolute"]:hover.vapi-button-connected,
        button[style*="position: absolute"]:hover.vapi-button-speaking,
        button[style*="position: absolute"]:hover.vapi-button-listening {
            background: #c82333 !important;
            transform: scale(1.05) !important;
            box-shadow: 0 8px 25px rgba(200, 35, 51, 0.9) !important;
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
    console.log('Verbesserte Button-Animationen hinzugefügt');
    
    // Button-Referenz für Animationen
    let vapiButton = null;
    let currentState = 'idle';
    let isConnected = false;
    
    // Button finden und Setup
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
            vapiButton.style.transition = 'background 0.5s ease, box-shadow 0.3s ease';
            
            // Idle-Animation starten
            setButtonState('idle');
            
            console.log('Button gefunden und verbessert animiert');
            return true;
        }
        return false;
    }
    
    // Button-Status ändern mit verbesserter Logik
    function setButtonState(state) {
        if (!vapiButton) return;
        
        // Alle Animations-Klassen entfernen
        vapiButton.classList.remove(
            'vapi-button-idle', 
            'vapi-button-connecting', 
            'vapi-button-connected', 
            'vapi-button-speaking', 
            'vapi-button-listening',
            'vapi-button-disconnecting'
        );
        
        // Neue Klasse hinzufügen
        vapiButton.classList.add(`vapi-button-${state}`);
        currentState = state;
        
        // Verbindungsstatus verfolgen
        if (state === 'connected' || state === 'speaking' || state === 'listening') {
            isConnected = true;
        } else if (state === 'idle') {
            isConnected = false;
        }
        
        console.log(`Button-Status geändert zu: ${state} (Verbunden: ${isConnected})`);
    }
    
    // Verbesserte Vapi-Events überwachen
    function setupVapiEventListeners() {
        if (window.vapiInstance) {
            console.log('Verbesserte Vapi-Events werden überwacht...');
            
            // Event-Listener für Vapi-Status
            if (window.vapiInstance.on) {
                // Anruf startet - Verbindungsaufbau
                window.vapiInstance.on('call-start', () => {
                    console.log('🔄 Anruf startet - Verbindungsaufbau');
                    setButtonState('connecting');
                    
                    // Nach 2 Sekunden zu "verbunden" wechseln
                    setTimeout(() => {
                        setButtonState('connected');
                    }, 2000);
                });
                
                // Anruf beendet - Zurück zu Blau
                window.vapiInstance.on('call-end', () => {
                    console.log('📞 Anruf beendet - Zurück zu Blau');
                    setButtonState('disconnecting');
                    
                    // Nach Animation zu idle wechseln
                    setTimeout(() => {
                        setButtonState('idle');
                    }, 1500);
                });
                
                // KI spricht - INTENSIVES Pulsieren
                window.vapiInstance.on('speech-start', () => {
                    console.log('🗣️ KI spricht - INTENSIVES Pulsieren');
                    if (isConnected) {
                        setButtonState('speaking');
                    }
                });
                
                // KI hört auf zu sprechen - Normales Rot-Pulsieren
                window.vapiInstance.on('speech-end', () => {
                    console.log('👂 KI hört zu - Normales Rot-Pulsieren');
                    if (isConnected) {
                        setButtonState('listening');
                    }
                });
                
                // Message-Events für feinere Kontrolle
                window.vapiInstance.on('message', (message) => {
                    if (message.type === 'conversation-update') {
                        if (message.role === 'assistant' && isConnected) {
                            console.log('💬 Assistant spricht');
                            setButtonState('speaking');
                        } else if (message.role === 'user' && isConnected) {
                            console.log('👤 User spricht');
                            setButtonState('listening');
                        }
                    }
                    
                    // Transcript-Events
                    if (message.type === 'transcript' && isConnected) {
                        if (message.role === 'assistant') {
                            setButtonState('speaking');
                        } else {
                            setButtonState('listening');
                        }
                    }
                });
                
                // Weitere Events
                window.vapiInstance.on('error', () => {
                    console.log('❌ Fehler - Zurück zu Blau');
                    setButtonState('idle');
                });
                
                window.vapiInstance.on('volume-level', (level) => {
                    // Bei hohem Volume-Level = KI spricht wahrscheinlich
                    if (level > 0.1 && isConnected && currentState !== 'speaking') {
                        setButtonState('speaking');
                    } else if (level <= 0.1 && isConnected && currentState === 'speaking') {
                        setButtonState('listening');
                    }
                });
            }
        }
        
        // Fallback: Demo-Simulation für Tests
        if (window.location.search.includes('demo=true')) {
            console.log('🎭 Demo-Modus aktiviert');
            setTimeout(() => {
                setButtonState('connecting');
                setTimeout(() => setButtonState('connected'), 2000);
                setTimeout(() => setButtonState('speaking'), 4000);
                setTimeout(() => setButtonState('listening'), 6000);
                setTimeout(() => setButtonState('speaking'), 8000);
                setTimeout(() => setButtonState('disconnecting'), 10000);
                setTimeout(() => setButtonState('idle'), 12000);
            }, 3000);
        }
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
    
    console.log('🎨 Verbesserte Button-Animation System aktiviert');
    console.log('🔵 Blau = Bereit | 🔴 Rot = Verbunden | 💥 Intensiv = KI spricht');
});
