import chalk from 'chalk';

export function iniciarLogging() {
  console.log(chalk.green.bold("=== Inicio del sistema ===\n"));
  console.time(chalk.yellow(' ProcesoPrincipal'));
}

export function finalizarLogging() {
  console.timeEnd(chalk.yellow(' ProcesoPrincipal'));
  console.log(chalk.green.bold("\n=== Fin del sistema ==="));
}

export function accesoUsuario(usuario) {
  console.count(chalk.blue(`👤 Acceso de usuario ${usuario}`));
}

export function mostrarAdvertencia(mensaje) {
  console.warn(chalk.yellow(` ${mensaje}`));
}

export function mostrarError(mensaje) {
  console.error(chalk.red.bold(`❌ ${mensaje}`));
}

export function mostrarTabla(datos, titulo = '') {
  if (titulo) {
    console.log(chalk.cyan(`\n ${titulo}:`));
  }
  console.table(datos);
}