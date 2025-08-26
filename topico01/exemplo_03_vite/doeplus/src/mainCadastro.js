export default function mainCadastro() {
    document.querySelector(".cadastro").onsubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(); // Coleta tudo automaticamente        
            formData.append('email', document.getElementById('email').value);        
            formData.append('telefone', document.getElementById('telefone').value.replace(/\D/g, ""));
            formData.append('cep', document.getElementById('cep').value.replace(/\D/g, ""));
            formData.append('endereco', document.getElementById('endereco').value + " - " + document.getElementById('numero').value + " - " + document.getElementById('complemento').value);
            formData.append('cidade', document.getElementById('cidade').value);
            formData.append('uf', document.getElementById('uf').value);
            formData.append('tipo', document.querySelector('input[name="tipo"]:checked').value);
            formData.append('senha', document.getElementById('senha').value);

            if(document.querySelector("#parceria").value == "Doador") {
                formData.append('nome', document.getElementById('nome').value);
                formData.append('cpf_cnpj', document.getElementById('cpf_cnpj').value.replace(/\D/g, ""));

                const response = await fetch('../../public/index.php?action=cadastrarDoador', {
                    method: 'POST',
                    body: formData
                })
        
                const resultado = await response.json();
                alert(JSON.stringify(resultado));
                console.log(await response)
            } else {
                formData.append('razao', document.getElementById('nome').value);
                formData.append('nome_fantasia', document.getElementById('nome').value);
                formData.append('cnpj', document.getElementById('cpf_cnpj').value.replace(/\D/g, ""));

                const response = await fetch('../../public/index.php?action=cadastrarInstituicao', {
                    method: 'POST',
                    body: formData
                })
        
                const resultado = await response.json();
                alert(JSON.stringify(resultado));
                console.log(response)
            }

            window.location.href = "../../public/login.php";
        
        } catch (e) {
            console.log(e)
            /**
             * VALIDAR SE JÁ EXISTE CADASTRO
             */
            alert("Não foi possível cadastrar, verifique se cadastro já foi realizado!")
        }
    }

    document.querySelector("#cep").onblur = async (e) => {
        console.log("chamou")
        const cep = e.target.value.replace("-","");
        console.log(cep)
        if(cep.match(/(?=^.{8,8}$)(?=.*^[0-9]+$).*$/)){
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(async data => {
                const dados = await data.json();
                console.log(dados)
                document.querySelector("#endereco").value = dados.logradouro;
                document.querySelector("#uf").value = dados.uf;
                document.querySelector("#cidade").value = dados.localidade;
            })
            
        } else {
            console.log("CEP inválido");
        }

    }

    document.querySelector("#cep").onkeyup = (e) => {//mascara cep
        let valor = document.querySelector("#cep").value;
        // Remove todos os caracteres que não são dígitos
        valor = valor.replace(/\D/g, "");

        // Limita a 8 dígitos
        if (valor.length > 8) {
            valor = valor.substring(0, 8);
        }

        // Aplica a máscara dinamicamente
        if (valor.length > 5) {
            valor = valor.replace(/(\d{5})(\d+)/, "$1-$2");
        }
        document.querySelector("#cep").value = valor;
    }

    document.querySelector("#cpf_cnpj").onkeyup = async (e) => {//mascara cpf
        let valor = document.querySelector("#cpf_cnpj").value;
        valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
        
        if((document.querySelector("#parceria").value == "Doador") && document.querySelector("#pf").checked) {
            // Limita a 11 dígitos
            if (valor.length > 11) {
                valor = valor.substring(0, 11);
            }
        
            // Aplica a máscara dinamicamente
            if (valor.length >= 9) {
                valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
            } else if (valor.length >= 6) {
                valor = valor.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
            } else if (valor.length >= 3) {
                valor = valor.replace(/(\d{3})(\d{0,3})/, "$1.$2");
            }

        } else {
            // Limita a 11 dígitos
            if (valor.length > 14) {
                valor = valor.substring(0, 14);
            }
        
            // Aplica a máscara dinamicamente
            if (valor.length >= 12) {
                valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5");
            } else if (valor.length >= 9) {
                valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, "$1.$2.$3/$4");
            } else if (valor.length >= 5) {
                valor = valor.replace(/(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
            } else if (valor.length >= 2) {
                valor = valor.replace(/(\d{2})(\d{0,3})/, "$1.$2");
            }
        }

        document.querySelector("#cpf_cnpj").value = valor;
    }

    document.querySelector("#telefone").onkeyup = async (e) => {//mascara telefone
        let valor = document.querySelector("#telefone").value;
        valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
        
        // Limita a 11 dígitos
        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        // Aplica a máscara dinamicamente
        if (valor.length >= 7) {
            valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        } else if (valor.length >= 2) {
            valor = valor.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        } else if (valor.length < 2) {
            valor = valor.replace(/(\d{1,2})/, "($1");
        }
        
        document.querySelector("#telefone").value = valor;
    }

    document.querySelector("#parceria").onchange = (e) => {
        if(e.target.value == "Instituição Beneficente") {
            document.querySelector("#pj").checked = true;
            document.querySelector("#pf").checked = false;
            document.querySelector("#pj").disabled = true;
            document.querySelector("#pf").disabled = true;
            document.querySelector(".identificador").textContent = "CNPJ:";
        } else {
            document.querySelector("#pj").checked = false;
            document.querySelector("#pf").checked = false;
            document.querySelector("#pj").disabled = false;
            document.querySelector("#pf").disabled = false;
            document.querySelector(".identificador").textContent = "CPF/CNPJ:";
        }
    }

    function validaPreenchimento() {
        let camposVazios = false;

        document.querySelectorAll("input, select")
    }
}