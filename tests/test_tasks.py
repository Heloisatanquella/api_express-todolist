import pytest
import json
import os

@pytest.mark.asyncio
async def test_create_task(client, test_user, headers):
    task_data = {
        "title": "Test Task",
        "description": "This is a test task"
    }
    
    try:
        response = await client.post("/tasks", json=task_data, headers=headers)
        assert response.status_code == 201
        data = response.json()
        task = data["task"]
        assert task["title"] == task_data["title"]
        assert task["description"] == task_data["description"]
        assert "id" in task
        assert task["userId"] == test_user["user"]["id"]
        return data
    except Exception as e:
        print(f"Erro no teste test_create_task: {e}")
        raise

@pytest.mark.asyncio
async def test_get_all_tasks(client, headers):
    try:
        response = await client.get("/tasks", headers=headers)
        assert response.status_code == 200
        data = response.json()
        tasks = data["tasks"]
        assert isinstance(tasks, list)
        if tasks:
            assert "id" in tasks[0]
            assert "title" in tasks[0]
            assert "description" in tasks[0]
    except Exception as e:
        print(f"Erro no teste test_get_all_tasks: {e}")
        raise

@pytest.mark.asyncio
async def test_get_task_by_id(client, test_user, headers):
    try:
        # Primeiro criamos uma tarefa
        task_created = await test_create_task(client, test_user, headers)
        task = task_created["task"]
        
        # Depois buscamos ela pelo ID
        response = await client.get(f"/tasks/{task['id']}", headers=headers)
        assert response.status_code == 200
        data = response.json()
        task_found = data["task"]
        assert task_found["id"] == task["id"]
        assert task_found["title"] == task["title"]
        assert task_found["description"] == task["description"]
        assert task_found["userId"] == test_user["user"]["id"]
    except Exception as e:
        print(f"Erro no teste test_get_task_by_id: {e}")
        raise

@pytest.mark.asyncio
async def test_update_task(client, test_user, headers):
    try:
        # Primeiro criamos uma tarefa
        task_created = await test_create_task(client, test_user, headers)
        task = task_created["task"]
        
        update_data = {
            "title": "Updated Task",
            "description": "This is an updated task"
        }
        
        response = await client.put(f"/tasks/{task['id']}", json=update_data, headers=headers)
        assert response.status_code == 200
        data = response.json()
        updated_task = data["task"]
        assert updated_task["title"] == update_data["title"]
        assert updated_task["description"] == update_data["description"]
    except Exception as e:
        print(f"Erro no teste test_update_task: {e}")
        raise

@pytest.mark.asyncio
async def test_delete_task(client, test_user, headers):
    try:
        # Primeiro criamos uma tarefa
        task_created = await test_create_task(client, test_user, headers)
        task = task_created["task"]
        
        response = await client.delete(f"/tasks/{task['id']}", headers=headers)
        assert response.status_code == 204
    except Exception as e:
        print(f"Erro no teste test_delete_task: {e}")
        raise 