// KORRIGIERTE DEMO-BUTTON INTEGRATION
// Vereinfacht und optimiert für Ihre Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Demo-Button Integration wird geladen...');
    
    let isCallActive = false;
    let vapiInstance = null;
    
    // Warten bis Vapi geladen ist
    function waitForVapi() {
        return new Promise((resolve) => {
            function checkVapi() {
                if (window.vapiInstance && window.vapiInstance.start) {
                    vapiInstance = window.vapiInstance;
                    console.log('✅ Vapi-Instance gefunden');
                    resolve();
                } else {
                    console.log('⏳ Warte auf Vapi-Instance...');
                    setTimeout(checkVapi, 500);
                }
            }
            checkVapi();
        });
    }
    
    // Demo-Buttons finden und konfigurieren
    function setupDemoButtons() {
        console.log('🔍 Suche Demo-Buttons...');
        
        // Alle Demo-Buttons finden
        const demoButtons = [];
        
        // 1. Navigation Demo-Button
        const navDemo = document.querySelector('a.nav-cta');
        if (navDemo && navDemo.textContent.includes('Demo')) {
            demoButtons.push({element: navDemo, type: 'Navigation'});
        }
        
        // 2. Hero Demo-Button
        const heroDemo = document.querySelector('a#demo-button');
        if (heroDemo) {
            demoButtons.push({element: heroDemo, type: 'Hero'});
        }
        
        // 3. Alle anderen Demo-Buttons
        const allCTAButtons = document.querySelectorAll('a.cta-button');
        allCTAButtons.forEach(button => {
            const text = button.textContent.toLowerCase();
            if (text.includes('demo') && !demoButtons.find(db => db.element === button)) {
                demoButtons.push({element: button, type: 'CTA'});
            }
        });
        
        console.log(`📋 ${demoButtons.length} Demo-Buttons gefunden`);
        
        // Event-Listener für alle Demo-Buttons
        demoButtons.forEach((btn, index) => {
            const {element, type} = btn;
            const text = element.textContent.trim();
            
            console.log(`🔗 Konfiguriere ${type} Button: "${text}"`);
            
            // Click-Event hinzufügen
            element.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                console.log(`🎯 ${type} Demo-Button geklickt: "${text}"`);
                
                if (!isCallActive) {
                    startVapiCall();
                } else {
                    endVapiCall();
                }
            });
            
            // Tooltip hinzufügen
            updateButtonTooltip(element);
        });
        
        return demoButtons.length > 0;
    }
    
    // Vapi-Button als Auflege-Button konfigurieren
    function setupVapiButton() {
        const vapiButton = Array.from(document.querySelectorAll('button')).find(btn => {
            const img = btn.querySelector('img');
            return img && img.alt === 'Icon';
        });
        
        if (vapiButton) {
            console.log('📞 Konfiguriere Vapi-Button als Auflege-Button');
            
            // Neuen Click-Handler hinzufügen
            vapiButton.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                console.log('📞 Vapi-Button geklickt');
                
                if (!isCallActive) {
                    startVapiCall();
                } else {
                    endVapiCall();
                }
            });
            
            updateButtonTooltip(vapiButton);
            return true;
        }
        
        return false;
    }
    
    // Vapi-Anruf starten
    function startVapiCall() {
        if (isCallActive) {
            console.log('⚠️ Anruf bereits aktiv');
            return;
        }
        
        console.log('🚀 Starte Vapi-Anruf...');
        
        try {
            if (vapiInstance && vapiInstance.start) {
                vapiInstance.start();
                isCallActive = true;
                
                console.log('✅ Vapi-Anruf gestartet');
                updateAllTooltips();
                
            } else {
                console.error('❌ Vapi-Instance nicht verfügbar');
            }
        } catch (error) {
            console.error('❌ Fehler beim Starten:', error);
        }
    }
    
    // Vapi-Anruf beenden
    function endVapiCall() {
        if (!isCallActive) {
            console.log('⚠️ Kein aktiver Anruf');
            return;
        }
        
        console.log('🛑 Beende Vapi-Anruf...');
        
        try {
            if (vapiInstance && vapiInstance.stop) {
                vapiInstance.stop();
            }
            
            isCallActive = false;
            console.log('✅ Vapi-Anruf beendet');
            updateAllTooltips();
            
        } catch (error) {
            console.error('❌ Fehler beim Beenden:', error);
            isCallActive = false;
            updateAllTooltips();
        }
    }
    
    // Button-Tooltip aktualisieren
    function updateButtonTooltip(button) {
        if (isCallActive) {
            button.title = 'Anruf beenden (Auflegen)';
        } else {
            button.title = 'Demo-Anruf starten';
        }
    }
    
    // Alle Tooltips aktualisieren
    function updateAllTooltips() {
        // Demo-Buttons
        document.querySelectorAll('a.nav-cta, a#demo-button, a.cta-button').forEach(btn => {
            const text = btn.textContent.toLowerCase();
            if (text.includes('demo')) {
                updateButtonTooltip(btn);
            }
        });
        
        // Vapi-Button
        const vapiButton = Array.from(document.querySelectorAll('button')).find(btn => {
            const img = btn.querySelector('img');
            return img && img.alt === 'Icon';
        });
        if (vapiButton) {
            updateButtonTooltip(vapiButton);
        }
    }
    
    // Vapi-Events überwachen
    function setupVapiEvents() {
        if (!vapiInstance || !vapiInstance.on) return;
        
        console.log('🔄 Überwache Vapi-Events...');
        
        vapiInstance.on('call-start', () => {
            console.log('📞 Vapi-Event: Anruf gestartet');
            isCallActive = true;
            updateAllTooltips();
        });
        
        vapiInstance.on('call-end', () => {
            console.log('📞 Vapi-Event: Anruf beendet');
            isCallActive = false;
            updateAllTooltips();
        });
        
        vapiInstance.on('error', () => {
            console.log('❌ Vapi-Event: Fehler');
            isCallActive = false;
            updateAllTooltips();
        });
    }
    
    // Hauptinitialisierung
    async function initialize() {
        try {
            console.log('🚀 Starte Demo-Button Integration...');
            
            // Warte auf Vapi
            await waitForVapi();
            
            // Setup Demo-Buttons
            const demoButtonsFound = setupDemoButtons();
            if (!demoButtonsFound) {
                console.log('⚠️ Keine Demo-Buttons gefunden');
            }
            
            // Setup Vapi-Button
            const vapiButtonFound = setupVapiButton();
            if (!vapiButtonFound) {
                console.log('⚠️ Vapi-Button nicht gefunden');
            }
            
            // Setup Events
            setupVapiEvents();
            
            console.log('✅ Demo-Button Integration erfolgreich aktiviert');
            console.log('📋 Alle Demo-Buttons starten jetzt Vapi-Anrufe');
            console.log('📞 Roter Button dient als Auflege-Button');
            
        } catch (error) {
            console.error('❌ Fehler bei Initialisierung:', error);
        }
    }
    
    // Starte nach kurzer Verzögerung
    setTimeout(initialize, 1000);
    
    // Zusätzliche Überwachung für dynamische Inhalte
    const observer = new MutationObserver(function(mutations) {
        let shouldReinitialize = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        const hasNewButtons = node.querySelectorAll && 
                            node.querySelectorAll('a[href="#contact"], button').length > 0;
                        if (hasNewButtons) {
                            shouldReinitialize = true;
                        }
                    }
                });
            }
        });
        
        if (shouldReinitialize) {
            console.log('🔄 Neue Buttons erkannt, aktualisiere...');
            setTimeout(() => {
                setupDemoButtons();
                setupVapiButton();
            }, 500);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('🎯 Demo-Button Integration System geladen');
});
