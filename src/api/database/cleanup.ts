import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  try {
    // Limpar todas as tabelas na ordem correta (respeitando as chaves estrangeiras)
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('Banco de dados limpo com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a limpeza se o script for chamado diretamente
if (require.main === module) {
  cleanup()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { cleanup }; 