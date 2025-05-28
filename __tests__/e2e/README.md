# Testes da API TodoList

Este diretório contém os testes unitários para a API TodoList.

## Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- API rodando localmente na porta 3000

## Instalação

1. Crie um ambiente virtual (opcional):
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

## Executando os Testes

Para executar todos os testes:
```bash
pytest
```

Para executar testes específicos:
```bash
pytest tests/test_users.py  # Apenas testes de usuários
pytest tests/test_tasks.py  # Apenas testes de tarefas
```

Para ver a cobertura de testes:
```bash
pytest --cov=.
```

## Estrutura dos Testes

- `conftest.py`: Configurações e fixtures comuns
- `test_users.py`: Testes para as rotas de usuários
- `test_tasks.py`: Testes para as rotas de tarefas

## Observações

- Certifique-se de que a API está rodando antes de executar os testes
- Os testes assumem que a API está rodando em `http://localhost:3000`
- É necessário configurar um token de autenticação válido no arquivo `.env` 