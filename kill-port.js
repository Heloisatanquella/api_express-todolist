// eslint-disable-next-line
const { exec } = require('child_process');

exec('netstat -ano | findstr :3000', (error, stdout) => {
  if (error) {
    console.error(`Erro ao executar netstat: ${error}`);
    return;
  }

  const lines = stdout.split('\n');
  for (const line of lines) {
    if (line.includes('LISTENING')) {
      const pid = line.trim().split(/\s+/).pop();
      console.log(`Matando processo com PID: ${pid}`);
      exec(`taskkill /F /PID ${pid}`, (error) => {
        if (error) {
          console.error(`Erro ao matar processo: ${error}`);
        } else {
          console.log(`Processo ${pid} morto com sucesso`);
        }
      });
    }
  }
}); 