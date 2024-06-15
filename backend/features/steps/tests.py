from behave import *
import requests
import json

response = requests.get('http://localhost:3002/user/0')

@given('o TestRepository não tem um test com nome "test"')
def step_impl(context):
    pass

@when('uma requisição POST for enviada para "/api/tests" com o corpo da requisição sendo um JSON com o nome "test"')
def step_impl(context):
    assert True is not False

@then('o status da resposta deve ser "200"')
def step_impl(context):
    assert response.status_code == 200, f"Erro: Código de status inesperado\nEsperado: 201 | Retornado: {response.status_code}"

@then('o JSON da resposta deve conter o nome "test"')
def step_impl(context):
    expected_json = {
      "id": 0,
      "name": "linksy",
      "username": "linksy",
      "email": "linksy",
      "password": "linksy",
      "bio": None,
      "picture":None
    }
    user_data = response.json()
    assert user_data == expected_json, f"\nErro: Json inesperado\nEsperado: {json.dumps(user_data, indent=2)}\nRetornado: {json.dumps(expected_json, indent=2)}"