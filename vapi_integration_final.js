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
            // Position des Widgets auf der Seite - immer unten rechts
            position: "bottom-right",
            // Immer sichtbar beim Scrollen
            sticky: true,
            // Abstand vom Rand
            offset: {
                bottom: '20px',
                right: '20px'
            }
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
    };

    // Klick-Handler für Demo-Buttons einrichten
    const setupDemoButtons = () => {
        // Erster Demo-Button im Hero-Bereich
        const demoButton = document.getElementById('demo-button');
        if (demoButton) {
            demoButton.addEventListener('click', function(e) {
                e.preventDefault(); // Standardnavigation verhindern
                if (window.vapiInstance && window.vapiInstance.startCall) {
                    window.vapiInstance.startCall();
                    console.log('Anruf vom Hero-Bereich Demo-Button initiiert');
                }
            });
        }

        // Zweiter Demo-Button im Next-Steps-Bereich
        const demoRequestButton = document.querySelector('.next-steps-section .cta-button');
        if (demoRequestButton) {
            demoRequestButton.addEventListener('click', function(e) {
                e.preventDefault(); // Standardnavigation verhindern
                if (window.vapiInstance && window.vapiInstance.startCall) {
                    window.vapiInstance.startCall();
                    console.log('Anruf vom Next-Steps-Bereich Demo-Button initiiert');
                }
            });
        }
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

    // VAPI SDK laden
    loadVapiSDK();
});
