import pytest
import httpx
import json
from dotenv import load_dotenv
import os

load_dotenv()

@pytest.fixture
def base_url():
    return "http://localhost:3000"

@pytest.fixture
async def client(base_url):
    async with httpx.AsyncClient(base_url=base_url) as client:
        yield client

@pytest.fixture
async def test_user(client):
    # Criar um usuário de teste
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
    # Fazer login e obter o token
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
    return {
        "Authorization": f"Bearer {auth_token}",
        "Content-Type": "application/json"
    } 