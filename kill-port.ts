import { exec } from 'child_process';

exec('npx kill-port 3000', (error, stdout) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`Output: ${stdout}`);
}); 