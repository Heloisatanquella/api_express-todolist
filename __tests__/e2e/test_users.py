import pytest
import json
import os

@pytest.mark.asyncio
async def test_create_user(client):
    """Testa a criação de um novo usuário"""
    user_data = {
        "name": "New Test User",
        "email": f"newtest_{os.urandom(4).hex()}@example.com",
        "password": "123456"
    }
    
    try:
        response = await client.post("/users", json=user_data)
        assert response.status_code == 201
        data = response.json()
        assert "message" in data
        assert "user" in data
        user = data["user"]
        assert user["name"] == user_data["name"]
        assert user["email"] == user_data["email"]
        assert "id" in user
    except Exception as e:
        print(f"Erro no teste test_create_user: {e}")
        raise

@pytest.mark.asyncio
async def test_login_success(client, test_user):
    """Testa o login com credenciais corretas"""
    login_data = {
        "email": test_user["user"]["email"],
        "password": "123456"
    }
    
    try:
        response = await client.post("/users/login", json=login_data)
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert isinstance(data["token"], str)
    except Exception as e:
        print(f"Erro no teste test_login_success: {e}")
        raise

@pytest.mark.asyncio
async def test_login_wrong_password(client, test_user):
    """Testa o login com senha incorreta"""
    login_data = {
        "email": test_user["user"]["email"],
        "password": "wrongpassword"
    }
    
    try:
        response = await client.post("/users/login", json=login_data)
        assert response.status_code == 401
        data = response.json()
        assert "message" in data
        assert data["message"] == "E-mail or password wrong"
    except Exception as e:
        print(f"Erro no teste test_login_wrong_password: {e}")
        raise

@pytest.mark.asyncio
async def test_login_nonexistent_user(client):
    """Testa o login com usuário inexistente"""
    login_data = {
        "email": "nonexistent@example.com",
        "password": "123456"
    }
    
    try:
        response = await client.post("/users/login", json=login_data)
        assert response.status_code == 401
        data = response.json()
        assert "message" in data
        assert data["message"] == "E-mail or password wrong"
    except Exception as e:
        print(f"Erro no teste test_login_nonexistent_user: {e}")
        raise

@pytest.mark.asyncio
async def test_get_user(client, test_user, headers):
    """Testa a obtenção dos dados do usuário autenticado"""
    try:
        response = await client.get("/users/me", headers=headers)
        assert response.status_code == 200
        data = response.json()
        user = data["user"]
        assert user["id"] == test_user["user"]["id"]
        assert user["name"] == test_user["user"]["name"]
        assert user["email"] == test_user["user"]["email"]
    except Exception as e:
        print(f"Erro no teste test_get_user: {e}")
        raise

@pytest.mark.asyncio
async def test_update_user(client, test_user, headers):
    """Testa a atualização dos dados do usuário"""
    update_data = {
        "name": "Updated Name",
        "email": f"updated_{os.urandom(4).hex()}@example.com"
    }
    
    try:
        response = await client.put("/users/me", json=update_data, headers=headers)
        assert response.status_code == 200
        data = response.json()
        user = data["user"]
        assert user["name"] == update_data["name"]
        assert user["email"] == update_data["email"]
    except Exception as e:
        print(f"Erro no teste test_update_user: {e}")
        raise

@pytest.mark.asyncio
async def test_delete_user(client, test_user, headers):
    """Testa a exclusão do usuário"""
    try:
        response = await client.delete("/users/me", headers=headers)
        assert response.status_code == 204
        
        # Verifica se o usuário foi realmente excluído
        response = await client.get("/users/me", headers=headers)
        assert response.status_code == 404
        data = response.json()
        assert "message" in data
        assert data["message"] == "User not found"
    except Exception as e:
        print(f"Erro no teste test_delete_user: {e}")
        raise 