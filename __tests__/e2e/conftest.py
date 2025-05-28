import pytest
import httpx
import json
from dotenv import load_dotenv
import os

load_dotenv()

@pytest.fixture
def base_url():
    return "http://localhost:3001"

@pytest.fixture
async def client(base_url):
    async with httpx.AsyncClient(base_url=base_url, follow_redirects=False) as client:
        yield client

@pytest.fixture(autouse=True)
async def clean_database(client):
    """Limpa o banco de dados antes de cada teste"""
    try:
        # Primeiro limpa todas as tarefas
        await client.delete("/tasks")
        # Depois limpa todos os usuários (exceto admin)
        await client.delete("/users/all")
    except Exception as e:
        print(f"Erro ao limpar banco de dados: {e}")
        raise

@pytest.fixture
async def test_user(client):
    """Cria um usuário de teste e retorna seus dados"""
    user_data = {
        "name": "Test User",
        "email": f"test_{os.urandom(4).hex()}@example.com",
        "password": "123456"
    }
    
    try:
        response = await client.post("/users", json=user_data)
        assert response.status_code == 201
        return response.json()
    except Exception as e:
        print(f"Erro ao criar usuário de teste: {e}")
        raise

@pytest.fixture
async def auth_token(client, test_user):
    """Faz login e retorna o token de autenticação"""
    login_data = {
        "email": test_user["user"]["email"],
        "password": "123456"
    }
    
    try:
        response = await client.post("/users/login", json=login_data)
        assert response.status_code == 200
        data = response.json()
        return data["token"]
    except Exception as e:
        print(f"Erro ao obter token: {e}")
        raise

@pytest.fixture
async def headers(auth_token):
    """Retorna os headers com o token de autenticação"""
    return {
        "Authorization": f"Bearer {auth_token}",
        "Content-Type": "application/json"
    } 