import chalk from 'chalk';
import os from 'os';

export function obtenerInfoSistema() {
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

export function mostrarInfoSistema() {
  const info = obtenerInfoSistema();
  
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