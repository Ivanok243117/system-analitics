import chalk from 'chalk';
import os from 'os';

// ==================== MÓDULO LOGGER (Práctica 1) ====================
function iniciarLogging() {
  console.log(chalk.green.bold("=== Inicio del sistema ===\n"));
  console.time(chalk.yellow('⏱️ ProcesoPrincipal'));
}

function finalizarLogging() {
  console.timeEnd(chalk.yellow('⏱️ ProcesoPrincipal'));
  console.log(chalk.green.bold("\n=== Fin del sistema ==="));
}

function accesoUsuario(usuario) {
  console.count(chalk.blue(`👤 Acceso de usuario ${usuario}`));
}

function mostrarTabla(datos, titulo = '') {
  if (titulo) {
    console.log(chalk.cyan(`\n ${titulo}:`));
  }
  console.table(datos);
}

function ejecutarPractica1() {
  console.clear();
  console.log(chalk.blue.bold(' PRÁCTICA 1: REGISTRO Y DEPURACIÓN'));
  console.log('='.repeat(50));
  
  iniciarLogging();
  
  accesoUsuario('Carlos');
  accesoUsuario('Ana');
  accesoUsuario('Carlos');
  
  console.warn(chalk.yellow('⚠️ Capacidad de usuarios alcanzando el límite'));
  console.error(chalk.red.bold('❌ Error: No se pudo conectar a la base de datos'));
  
  const usuarios = [
    { nombre: "Carlos", rol: "Admin" },
    { nombre: "Ana", rol: "User" }
  ];
  
  mostrarTabla(usuarios, "Usuarios del sistema");
  
  finalizarLogging();
  
  volverAlMenu();
}

// ==================== MÓDULO SYSTEM MONITOR (Práctica 3) ====================
function obtenerInfoSistema() {
  return {
    plataforma: `${os.platform()} (${os.arch()})`,
    cpu: os.cpus()[0].model,
    nucleos: os.cpus().length,
    memoriaLibre: `${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`,
    memoriaTotal: `${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`,
    tiempoActivo: `${(os.uptime() / 60).toFixed(2)} minutos`,
    usuario: os.userInfo().username
  };
}

function mostrarInfoSistema() {
  const info = obtenerInfoSistema();
  
  console.clear();
  console.log(chalk.blue.bold(' PRÁCTICA 3: MONITOR DEL SISTEMA'));
  console.log('='.repeat(50));
  console.log('🖥️ Monitor de Sistema');
  console.log('========================');
  console.log(`Sistema: ${info.plataforma}`);
  console.log(`CPU: ${info.cpu}`);
  console.log(`Cores: ${info.nucleos}`);
  console.log(`Memoria Libre: ${info.memoriaLibre}`);
  console.log(`Memoria Total: ${info.memoriaTotal}`);
  console.log(`Uptime: ${info.tiempoActivo}`);
  console.log(`Usuario: ${info.usuario}`);
  console.log('========================\n');
  
  return info;
}

function ejecutarPractica3() {
  mostrarInfoSistema();
  volverAlMenu();
}

// ==================== MÓDULO CLI (Práctica 2) ====================
function iniciarCLI() {
  console.clear();
  console.log(chalk.blue.bold(' PRÁCTICA 2: CLI INTERACTIVA'));
  console.log('='.repeat(50));
  console.log('Bienvenido a la CLI de ejemplo');
  console.log('Comandos disponibles: hola, tiempo, volver');
  console.log('='.repeat(50));
  
  let buffer = '';
  let readingInput = true;
  
  process.stdin.setRawMode(true);
  process.stdin.setEncoding('utf8');
  
  console.log('Ingresa un comando: ');
  
  process.stdin.on('data', (key) => {
    if (!readingInput) return;
    
    if (key === '\u0003') {
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
          process.stdin.removeAllListeners('data');
          process.stdin.setRawMode(false);
          setTimeout(mostrarMenuPrincipal, 1000);
          return;
        default:
          console.log('Comando no reconocido');
      }
      
      console.log('\nIngresa un comando: ');
    } else if (key === '\u007f' || key === '\b') {
      if (buffer.length > 0) {
        buffer = buffer.slice(0, -1);
        process.stdout.write('\b \b');
      }
    } else {
      buffer += key;
      process.stdout.write(key);
    }
  });
}

// ==================== MENÚ PRINCIPAL ====================
function mostrarMenuPrincipal() {
  console.clear();
  console.log(chalk.green.bold(' SYSTEM ANALYTICS - MENÚ PRINCIPAL'));
  console.log('='.repeat(40));
  console.log(chalk.blue('1  Práctica 1: Registro y Depuración'));
  console.log(chalk.blue('2  Práctica 2: CLI Interactiva'));
  console.log(chalk.blue('3  Práctica 3: Monitor del Sistema'));
  console.log(chalk.red('0  Salir del programa'));
  console.log('='.repeat(40));
  
  process.stdin.setEncoding('utf8');
  process.stdout.write('Selecciona una opción (0-3): ');
  
  process.stdin.once('data', (opcion) => {
    const input = opcion.trim();
    
    switch (input) {
      case '1':
        ejecutarPractica1();
        break;
      case '2':
        iniciarCLI();
        break;
      case '3':
        ejecutarPractica3();
        break;
      case '0':
        console.log(chalk.yellow(' ¡Hasta la vista baby!'));
        process.exit(0);
        break;
      default:
        console.log(chalk.red('❌ Opción no válida. Intenta de nuevo.'));
        setTimeout(mostrarMenuPrincipal, 1500);
        break;
    }
  });
}

function volverAlMenu() {
  process.stdout.write('\nPresiona Enter para volver al menú principal...');
  process.stdin.once('data', () => {
    mostrarMenuPrincipal();
  });
}

// ==================== MANEJO DE ERRORES ====================
process.on('uncaughtException', (error) => {
  console.error(chalk.red('❌ Error no capturado:'), error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('❌ Promesa rechazada no manejada:'), reason);
  process.exit(1);
});

// ==================== INICIO DE LA APLICACIÓN ====================
function main() {
  console.clear();
  console.log(chalk.blue.bold('Bienvenido a System Analytics'));
  console.log(chalk.blue('Sistema integrado de las 3 prácticas'));
  console.log('='.repeat(40));
  
  setTimeout(() => {
    mostrarMenuPrincipal();
  }, 1000);
}

// Ejecutar la aplicación
main();