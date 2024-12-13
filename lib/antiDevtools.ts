export function preventDevTools() {
    function detectDevTools() {
      const widthThreshold = window.outerWidth - window.innerWidth > 160
      const heightThreshold = window.outerHeight - window.innerHeight > 160
      return widthThreshold || heightThreshold
    }
  
    function handleDevToolsOpen() {
      document.body.innerHTML = 'Developer tools are not allowed on this site.'
    }
  
    setInterval(() => {
      if (detectDevTools()) {
        handleDevToolsOpen()
      }
    }, 1000)
  
    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault())
  
    // Disable some keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (
        // Disable F12
        e.key === 'F12' ||
        // Disable Ctrl+Shift+I (Windows) and Cmd+Option+I (Mac)
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') ||
        // Disable Ctrl+Shift+J (Windows) and Cmd+Option+J (Mac)
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'j') ||
        // Disable Ctrl+Shift+C (Windows) and Cmd+Option+C (Mac)
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c')
      ) {
        e.preventDefault()
      }
    })
  }
  
  