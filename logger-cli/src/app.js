import chalk from 'chalk';
import { 
  iniciarLogging, finalizarLogging, accesoUsuario, 
  mostrarAdvertencia, mostrarError, mostrarTabla 
} from './modules/logger.js';

import { obtenerInfoSistema, mostrarInfoSistema } from './modules/systemMonitor.js';
import { iniciarCLI } from './modules/cli.js';

// ==================== MANEJO DE ERRORES ====================
process.on('uncaughtException', (error) => {
  console.error(chalk.red('❌ Error no capturado:'), error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('❌ Promesa rechazada no manejada:'), reason);
  process.exit(1);
});

// ==================== FUNCIONES DE PRÁCTICAS ====================
function ejecutarPractica1() {
  console.clear();
  console.log(chalk.blue.bold(' PRÁCTICA 1: REGISTRO Y DEPURACIÓN'));
  console.log('='.repeat(50));
  
  iniciarLogging();
  accesoUsuario('Carlos');
  accesoUsuario('Ana');
  accesoUsuario('Carlos');
  mostrarAdvertencia('Capacidad de usuarios alcanzando el límite');
  mostrarError('No se pudo conectar a la base de datos');
  
  const usuarios = [
    { nombre: "Carlos", rol: "Admin" },
    { nombre: "Ana", rol: "User" }
  ];
  
  mostrarTabla(usuarios, "Usuarios del sistema");
  finalizarLogging();
}

async function ejecutarPractica2() {
  console.clear();
  await iniciarCLI();
}

function ejecutarPractica3() {
  console.clear();
  console.log(chalk.blue.bold(' PRÁCTICA 3: MONITOR DEL SISTEMA'));
  console.log('='.repeat(50));
  mostrarInfoSistema();
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
  
  process.stdout.write('Selecciona una opción (0-3): ');
  
  process.stdin.once('data', async (opcion) => {
    // ✅ CORRECCIÓN: Convertir Buffer a string
    const input = opcion.toString().trim();
    
    switch (input) {
      case '1':
        ejecutarPractica1();
        volverAlMenu();
        break;
      case '2':
        await ejecutarPractica2();
        volverAlMenu();
        break;
      case '3':
        ejecutarPractica3();
        volverAlMenu();
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