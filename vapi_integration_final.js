// VAPI WebRTC Integration für Demo-Buttons mit Floating Button
document.addEventListener('DOMContentLoaded', function() {
    // VAPI SDK laden
    const loadVapiSDK = () => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
        script.defer = true;
        script.async = true;
        script.onload = initializeVapi;
        document.head.appendChild(script);
    };

    // Füge CSS für den sticky Floating Button hinzu
    const addStickyButtonCSS = () => {
        const style = document.createElement('style');
        style.textContent = `
            .vapi-floating-button {
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                z-index: 9999 !important;
            }
        `;
        document.head.appendChild(style);
    };

    // VAPI mit Ihren Zugangsdaten initialisieren
    const initializeVapi = () => {
        // Ersetzen Sie diese mit Ihren tatsächlichen VAPI-Zugangsdaten
        const apiKey = "dc061998-8b89-44ca-8980-c58502b956fe"; // Ersetzen Sie dies mit Ihrem Public Key aus dem Vapi Dashboard
        const assistant = "471f2e1b-d4e9-4c78-8ad5-9ce7afd8e479"; // Ersetzen Sie dies mit Ihrer Assistant ID
        
        // Button-Konfiguration für den Floating Button
        const buttonConfig = {
            // Benutzerdefiniertes Styling für den Anruf-Button
            buttonStyle: {
                background: '#1da1f2',
                borderRadius: '50%', // Runder Button
                padding: '15px',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(29, 161, 242, 0.4)',
                color: 'white',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            // Benutzerdefiniertes Styling für das Anruf-Panel
            panelStyle: {
                background: 'white',
                borderRadius: '16px',
                border: '2px solid #e1e8ed',
                backdropFilter: 'blur(10px)'
            },
            // Icon statt Text für den Floating Button
            buttonMode: "icon",
            // Position des Widgets auf der Seite - explizit rechts unten
            position: "bottom-right",
            // Immer sichtbar beim Scrollen
            sticky: true,
            // Abstand vom Rand (rechts und unten)
            offset: {
                bottom: '20px',
                right: '20px'
            },
            // Zusätzliche Klasse für CSS-Styling
            buttonClass: "vapi-floating-button"
        };

        // VAPI SDK initialisieren
        window.vapiSDK = window.vapiSDK || {};
        window.vapiInstance = window.vapiSDK.run({
            apiKey: apiKey, // erforderlich
            assistant: assistant, // erforderlich
            config: buttonConfig, // optional
        });

        // Klick-Event-Listener für Demo-Buttons hinzufügen
        setupDemoButtons();
        
        // Event-Handler für Anruf-Lebenszyklus einrichten
        setupCallEventHandlers();
        
        // Stelle sicher, dass der Button sticky ist
        ensureStickyButton();
    };

    // Stelle sicher, dass der Button sticky ist
    const ensureStickyButton = () => {
        // Warte kurz, bis das Widget gerendert ist
        setTimeout(() => {
            const vapiButton = document.querySelector('.vapi-button');
            if (vapiButton) {
                // Füge zusätzliche Klasse hinzu
                vapiButton.classList.add('vapi-floating-button');
                
                // Stelle sicher, dass der Button die richtigen Styles hat
                vapiButton.style.position = 'fixed';
                vapiButton.style.bottom = '20px';
                vapiButton.style.right = '20px';
                vapiButton.style.zIndex = '9999';
                
                console.log('Floating Button wurde korrekt positioniert');
            } else {
                console.warn('VAPI Button konnte nicht gefunden werden');
            }
        }, 1000);
    };

    // Klick-Handler für Demo-Buttons einrichten
    const setupDemoButtons = () => {
        // Erster Demo-Button im Hero-Bereich
        const setupHeroButton = () => {
            // Versuche verschiedene Selektoren für den Hero-Button
            const demoButton = document.getElementById('demo-button') || 
                              document.querySelector('.hero-section .cta-button') ||
                              document.querySelector('a.button[href*="demo"]') ||
                              document.querySelector('button:contains("Demo buchen")');
            
            if (demoButton) {
                console.log('Hero Demo-Button gefunden:', demoButton);
                demoButton.addEventListener('click', function(e) {
                    e.preventDefault(); // Standardnavigation verhindern
                    console.log('Hero Demo-Button wurde geklickt');
                    if (window.vapiInstance && typeof window.vapiInstance.startCall === 'function') {
                        window.vapiInstance.startCall();
                        console.log('Anruf vom Hero-Bereich Demo-Button initiiert');
                    } else {
                        console.error('VAPI Instance oder startCall Funktion nicht verfügbar');
                    }
                });
            } else {
                console.warn('Demo-Button im Hero-Bereich nicht gefunden');
            }
        };

        // Zweiter Demo-Button im Next-Steps-Bereich
        const setupNextStepsButton = () => {
            // Versuche verschiedene Selektoren für den Next-Steps-Button
            const demoRequestButton = document.querySelector('.next-steps-section .cta-button') || 
                                     document.querySelector('#next-steps .cta-button') ||
                                     document.querySelector('a.cta-button[href*="demo"]') ||
                                     document.querySelector('button:contains("Demo anfordern")');
            
            if (demoRequestButton) {
                console.log('Next-Steps Demo-Button gefunden:', demoRequestButton);
                demoRequestButton.addEventListener('click', function(e) {
                    e.preventDefault(); // Standardnavigation verhindern
                    console.log('Next-Steps Demo-Button wurde geklickt');
                    if (window.vapiInstance && typeof window.vapiInstance.startCall === 'function') {
                        window.vapiInstance.startCall();
                        console.log('Anruf vom Next-Steps-Bereich Demo-Button initiiert');
                    } else {
                        console.error('VAPI Instance oder startCall Funktion nicht verfügbar');
                    }
                });
            } else {
                console.warn('Demo-Request-Button im Next-Steps-Bereich nicht gefunden');
            }
        };

        // Fallback: Alle Buttons mit "Demo" im Text oder in der Klasse
        const setupFallbackButtons = () => {
            document.querySelectorAll('button, a.button, .btn, .button, a.cta-button').forEach(button => {
                const buttonText = button.textContent.toLowerCase();
                const buttonClass = button.className.toLowerCase();
                
                if (buttonText.includes('demo') || buttonClass.includes('demo')) {
                    console.log('Fallback Demo-Button gefunden:', button);
                    button.addEventListener('click', function(e) {
                        e.preventDefault(); // Standardnavigation verhindern
                        console.log('Fallback Demo-Button wurde geklickt');
                        if (window.vapiInstance && typeof window.vapiInstance.startCall === 'function') {
                            window.vapiInstance.startCall();
                            console.log('Anruf von einem Demo-Button initiiert (Fallback)');
                        } else {
                            console.error('VAPI Instance oder startCall Funktion nicht verfügbar');
                        }
                    });
                }
            });
        };

        // Führe alle Button-Setup-Funktionen aus
        setupHeroButton();
        setupNextStepsButton();
        setupFallbackButtons();
    };

    // Event-Handler für Anruf-Lebenszyklus
    const setupCallEventHandlers = () => {
        if (window.vapiInstance) {
            // Anruf gestartet Event
            window.vapiInstance.on('call-start', () => {
                console.log('Sprachkonversation gestartet');
                // Analytics tracken, Benachrichtigungen anzeigen, etc.
            });

            // Anruf beendet Event
            window.vapiInstance.on('call-end', () => {
                console.log('Sprachkonversation beendet');
                // Konversationsdaten speichern, Feedback-Formular anzeigen, etc.
            });
        }
    };

    // Füge CSS für den sticky Button hinzu
    addStickyButtonCSS();
    
    // VAPI SDK laden
    loadVapiSDK();
});
