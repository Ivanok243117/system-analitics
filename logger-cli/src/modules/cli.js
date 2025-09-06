import chalk from 'chalk';

export function iniciarCLI() {
  console.clear();
  console.log(chalk.blue.bold(' PRÁCTICA 2: CLI INTERACTIVA'));
  console.log('='.repeat(50));
  console.log('Bienvenido a la CLI de ejemplo');
  console.log('Comandos disponibles: hola, tiempo, volver');
  console.log('='.repeat(50));
  
  let buffer = '';
  let readingInput = true;
  
  // Guardar el estado original de stdin
  const originalIsRaw = process.stdin.isRaw;
  const originalListeners = [...process.stdin.listeners('data')];
  
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  console.log('Ingresa un comando: ');
  
  return new Promise((resolve) => {
    const onData = (key) => {
      if (!readingInput) return;
      
      if (key === '\u0003') { // Ctrl+C
        process.stdin.setRawMode(false);
        console.log('\nSaliendo...');
        process.exit(0);
      }
      
      if (key === '\r' || key === '\n') {
        const input = buffer.trim().toLowerCase();
        buffer = '';
        console.log('');
        
        switch (input) {
          case 'hola':
            console.log('¡Hola! ¿Cómo estás?');
            break;
          case 'tiempo':
            console.log(`Tiempo activo: ${process.uptime().toFixed(2)} segundos`);
            break;
          case 'volver':
            console.log('Volviendo al menú principal...');
            readingInput = false;
            
            // Limpiar y restaurar stdin
            process.stdin.removeListener('data', onData);
            process.stdin.setRawMode(originalIsRaw);
            
            // Restaurar listeners originales
            process.stdin.removeAllListeners('data');
            originalListeners.forEach(listener => {
              process.stdin.on('data', listener);
            });
            
            // Resolver la promesa después de limpiar
            setTimeout(() => resolve(), 100);
            return;
            
          default:
            console.log('Comando no reconocido');
        }
        
        console.log('\nIngresa un comando: ');
      } else if (key === '\u007f' || key === '\b') {
        // Backspace
        if (buffer.length > 0) {
          buffer = buffer.slice(0, -1);
          process.stdout.write('\b \b');
        }
      } else {
        buffer += key;
        process.stdout.write(key);
      }
    };
    
    process.stdin.on('data', onData);
  });
}