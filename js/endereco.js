const urlEndereco = 'https://go-wash-api.onrender.com/api/auth/address';

async function cadastrarEndereco() {
    const title = document.getElementById('title').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('number').value;
    const complement = document.getElementById('complement').value;


    let user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;

    if (!token) {
        alert('Token de acesso não encontrado. Faça login novamente.');
        return;
    }

    try {
        let response = await fetch(urlEndereco, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });


        if (response.ok) {
            let resposta = await response.json();
            alert(resposta.message || 'Endereço cadastrado com sucesso!');
            window.location.href = 'home.html';
        } else {
            let errorData;
            try {
                errorData = await response.json();
                alert(errorData.message || 'Erro ao cadastrar endereço. Verifique os dados.');
            } catch (jsonError) {
                alert('Erro ao processar resposta do servidor.');
                console.error('Erro ao processar JSON de erro:', jsonError);
            }
        }

    } catch (networkError) {

        alert('Erro de conexão. Verifique sua internet ou tente mais tarde.');
        console.error('Erro de rede:', networkError);
    }
}
