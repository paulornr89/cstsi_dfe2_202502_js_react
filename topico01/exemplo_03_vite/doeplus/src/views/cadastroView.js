export function render() {
    return `
        <form class="cadastro" action="cadastrar" method="post">
            <div class="tituloCadastro titulo">
                <a target="_self" href="/" class="voltarCadastro"><img src="../../public/images/arrowIcon.png" alt="Voltar"></a>
                <h2 class="titulo-textoCadastro titulo-texto">Formulário de Cadastro</h2>
                <div class="espaco-vazio"></div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label>Nome:</label>
                        <input type="text" class="form-control" id="nome" name="nome" required/>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label>E-mail:</label>
                        <input type="text" class="form-control" id="email" name="email" required/>
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-group">
                        <label>Telefone:</label>
                        <input type="text" class="form-control" id="telefone" name="telefone" maxlength="15" required/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <div class="form-group">
                        <label>CEP:</label>
                        <input type="text" class="form-control" id="cep" name="cep" maxlength="9" required/>
                    </div>
                </div>
                <div class="col-7">
                    <div class="form-group">
                        <label>Endereço:</label>
                        <input type="text" class="form-control" id="endereco" name="endereco" readonly/>
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-group">
                        <label>Número:</label>
                        <input type="text" class="form-control" id="numero" name="numero" required/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label>Complemento:</label>
                        <input type="text" class="form-control" id="complemento" name="complemento"/>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label>Cidade:</label>
                        <input type="text" class="form-control" id="cidade" name="cidade" required/>
                    </div>
                </div>
                <div class="col-1">
                    <div class="form-group">
                        <label>UF:</label>
                        <input type="text" class="form-control" id="uf" name="uf" required/>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                       <label>Parceria será como:</label>
                       <select class="form-control" id="parceria" name="parceria" required>
                            <option value="">Selecione uma opção...</option>
                            <option>Doador</option>
                            <option>Instituição Beneficente</option>
                       </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <div class="form-group">
                        <label>Tipo:</label>
                        <div class="list-radio">
                            <div class="radio-option">
                                <input type="radio" id="pj" name="tipo" value="PJ" required> 
                                <label for="pj">PJ</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" id="pf" name="tipo" value="PF" required> 
                                <label for="pf">PF</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label class="identificador">CPF/CNPJ:</label>
                        <input type="text" class="form-control" id="cpf_cnpj" name="cpf_cnpj" maxlength="18" required/>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-group">
                        <label>Senha:</label>
                        <input type="password" class="form-control" id="senha" name="senha" required/>
                    </div>
                </div>
            </div>
            <div class="row">
                <button class="btnCancelar btn" type="reset">Cancelar</button>
                <button class="btnSalvar btn" type="submit">Salvar</button>
            </div>
        </form>
    `;
}

export default function init() {
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

    // Adicione um listener para o link "Voltar"
    document.querySelector('.voltarCadastro').addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link
        window.history.pushState({}, '', '/'); // Muda a URL para a raiz
        window.dispatchEvent(new Event('popstate')); // Dispara um evento que o main.js pode ouvir para rodar o router
    });

    function validaPreenchimento() {
        let camposVazios = false;

        document.querySelectorAll("input, select")
    }
}