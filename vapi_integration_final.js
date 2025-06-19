// Direkte VAPI Integration - Vereinfacht und funktional
document.addEventListener('DOMContentLoaded', function() {
    console.log('VAPI Integration wird geladen...');
    
    // VAPI SDK laden
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    script.defer = true;
    script.async = true;
    
    script.onload = function() {
        console.log('VAPI SDK geladen');
        
        // WICHTIG: Ersetzen Sie diese Werte mit Ihren echten VAPI-Zugangsdaten
        const VAPI_API_KEY = "dc061998-8b89-44ca-8980-c58502b956fe"; // Ihr Public Key aus dem VAPI Dashboard
        const ASSISTANT_ID = "471f2e1b-d4e9-4c78-8ad5-9ce7afd8e479"; // Ihre Assistant ID
        
        // VAPI initialisieren
        try {
            window.vapiInstance = window.vapiSDK.run({
                apiKey: VAPI_API_KEY,
                assistant: ASSISTANT_ID,
                config: {
                    // Floating Button Konfiguration
                    position: "bottom-right",
                    offset: {
                        bottom: "20px",
                        right: "20px"
                    },
                    buttonStyle: {
                        background: "#1da1f2",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        boxShadow: "0 4px 15px rgba(29, 161, 242, 0.4)",
                        position: "fixed",
                        zIndex: "9999"
                    }
                }
            });
            
            console.log('VAPI erfolgreich initialisiert');
            
            // Demo-Buttons finden und Event-Listener hinzufügen
            setTimeout(setupDemoButtons, 1000);
            
        } catch (error) {
            console.error('Fehler beim Initialisieren von VAPI:', error);
        }
    };
    
    script.onerror = function() {
        console.error('Fehler beim Laden des VAPI SDK');
    };
    
    document.head.appendChild(script);
    
    // Demo-Buttons Setup
    function setupDemoButtons() {
        console.log('Suche nach Demo-Buttons...');
        
        // Alle möglichen Demo-Button Selektoren
        const buttonSelectors = [
            '#demo-button',
            '.cta-button',
            'a[href*="demo"]',
            'button[class*="demo"]',
            'a[class*="demo"]'
        ];
        
        let buttonsFound = 0;
        
        buttonSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                const buttonText = button.textContent.toLowerCase();
                
                // Nur Buttons mit "demo" im Text
                if (buttonText.includes('demo')) {
                    console.log('Demo-Button gefunden:', button, 'Text:', buttonText);
                    
                    // Event-Listener hinzufügen
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('Demo-Button geklickt:', buttonText);
                        
                        if (window.vapiInstance) {
                            try {
                                // VAPI Anruf starten
                                window.vapiInstance.start();
                                console.log('VAPI Anruf gestartet');
                            } catch (error) {
                                console.error('Fehler beim Starten des VAPI Anrufs:', error);
                            }
                        } else {
                            console.error('VAPI Instance nicht verfügbar');
                        }
                    });
                    
                    buttonsFound++;
                }
            });
        });
        
        console.log(`${buttonsFound} Demo-Buttons konfiguriert`);
        
        // Fallback: Alle Buttons mit "Demo" im Text
        if (buttonsFound === 0) {
            console.log('Fallback: Suche nach allen Buttons mit "Demo" im Text');
            
            document.querySelectorAll('button, a').forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes('demo')) {
                    console.log('Fallback Demo-Button gefunden:', element);
                    
                    element.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        console.log('Fallback Demo-Button geklickt');
                        
                        if (window.vapiInstance) {
                            try {
                                window.vapiInstance.start();
                                console.log('VAPI Anruf gestartet (Fallback)');
                            } catch (error) {
                                console.error('Fehler beim Starten des VAPI Anrufs (Fallback):', error);
                            }
                        }
                    });
                }
            });
        }
    }
    
    // CSS für den Floating Button hinzufügen
    const style = document.createElement('style');
    style.textContent = `
        /* VAPI Floating Button Styles */
        [data-vapi-button] {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
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
            color: white !important;
            font-size: 20px !important;
        }
        
        [data-vapi-button]:hover {
            background: #0d8bd9 !important;
            transform: scale(1.05) !important;
            transition: all 0.2s ease !important;
        }
        
        /* Responsive Anpassungen */
        @media (max-width: 768px) {
            [data-vapi-button] {
                bottom: 15px !important;
                right: 15px !important;
                width: 50px !important;
                height: 50px !important;
                font-size: 18px !important;
            }
        }
    `;
    document.head.appendChild(style);
});
