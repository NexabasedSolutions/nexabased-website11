// Verbesserte VAPI Integration mit korrekter Button-Positionierung
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
        
        // VAPI initialisieren mit korrekter Positionierung
        try {
            window.vapiInstance = window.vapiSDK.run({
                apiKey: VAPI_API_KEY,
                assistant: ASSISTANT_ID,
                config: {
                    // Floating Button Konfiguration - RECHTS UNTEN
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
                        zIndex: "9999",
                        bottom: "20px",
                        right: "20px",
                        left: "auto" // Wichtig: left auf auto setzen
                    }
                }
            });
            
            console.log('VAPI erfolgreich initialisiert');
            
            // Button-Position nach Initialisierung korrigieren
            setTimeout(fixButtonPosition, 1000);
            setTimeout(fixButtonPosition, 3000); // Zweiter Versuch nach 3 Sekunden
            
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
    
    // Funktion zur Korrektur der Button-Position
    function fixButtonPosition() {
        console.log('Korrigiere Button-Position...');
        
        // Verschiedene Selektoren für den VAPI-Button
        const buttonSelectors = [
            '[data-vapi-button]',
            '.vapi-button',
            '#vapi-button',
            'button[style*="position: fixed"]',
            'div[style*="position: fixed"]'
        ];
        
        buttonSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                if (button) {
                    console.log('Button gefunden:', selector, button);
                    
                    // Position korrigieren
                    button.style.position = 'fixed';
                    button.style.bottom = '20px';
                    button.style.right = '20px';
                    button.style.left = 'auto';
                    button.style.zIndex = '9999';
                    button.style.width = '60px';
                    button.style.height = '60px';
                    button.style.borderRadius = '50%';
                    button.style.background = '#1da1f2';
                    button.style.boxShadow = '0 4px 15px rgba(29, 161, 242, 0.4)';
                    button.style.border = 'none';
                    button.style.cursor = 'pointer';
                    button.style.display = 'flex';
                    button.style.alignItems = 'center';
                    button.style.justifyContent = 'center';
                    button.style.color = 'white';
                    button.style.fontSize = '20px';
                    button.style.transition = 'all 0.3s ease';
                    
                    console.log('Button-Position korrigiert');
                }
            });
        });
        
        // Fallback: Alle fixed-positionierten Elemente prüfen
        const allFixedElements = document.querySelectorAll('*');
        allFixedElements.forEach(element => {
            const style = window.getComputedStyle(element);
            if (style.position === 'fixed' && 
                (element.textContent.includes('📞') || 
                 element.innerHTML.includes('phone') || 
                 element.innerHTML.includes('call') ||
                 element.tagName === 'BUTTON')) {
                
                // Prüfen ob es links positioniert ist
                const left = parseInt(style.left);
                const right = parseInt(style.right);
                
                if (left < 100 && (isNaN(right) || right > 100)) {
                    console.log('Verdächtiger Button gefunden, korrigiere Position:', element);
                    element.style.left = 'auto';
                    element.style.right = '20px';
                    element.style.bottom = '20px';
                }
            }
        });
    }
    
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
    
    // CSS für den Floating Button hinzufügen (verbessert)
    const style = document.createElement('style');
    style.textContent = `
        /* VAPI Floating Button Styles - RECHTS UNTEN */
        [data-vapi-button],
        .vapi-button,
        #vapi-button {
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
            color: white !important;
            font-size: 20px !important;
            transition: all 0.3s ease !important;
        }
        
        [data-vapi-button]:hover,
        .vapi-button:hover,
        #vapi-button:hover {
            background: #0d8bd9 !important;
            transform: scale(1.05) !important;
            box-shadow: 0 6px 20px rgba(29, 161, 242, 0.6) !important;
        }
        
        /* Überschreibung für alle fixed-positionierten Button-ähnlichen Elemente */
        button[style*="position: fixed"],
        div[style*="position: fixed"] {
            bottom: 20px !important;
            right: 20px !important;
            left: auto !important;
        }
        
        /* Responsive Anpassungen */
        @media (max-width: 768px) {
            [data-vapi-button],
            .vapi-button,
            #vapi-button {
                bottom: 15px !important;
                right: 15px !important;
                width: 50px !important;
                height: 50px !important;
                font-size: 18px !important;
            }
        }
        
        @media (max-width: 480px) {
            [data-vapi-button],
            .vapi-button,
            #vapi-button {
                bottom: 10px !important;
                right: 10px !important;
                width: 45px !important;
                height: 45px !important;
                font-size: 16px !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Überwachung für dynamisch hinzugefügte Elemente
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Prüfen ob es ein Button ist
                        if (node.tagName === 'BUTTON' || 
                            node.querySelector && node.querySelector('button')) {
                            setTimeout(fixButtonPosition, 100);
                        }
                    }
                });
            }
        });
    });
    
    // Observer starten
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

