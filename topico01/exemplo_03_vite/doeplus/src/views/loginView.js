export function render() {
    return `
        <form class="login"><!-- action="./processaLogin.php" method="POST" -->
            <div class="titulo">
                <h2>Doe+</h2>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="email" name="email" placeholder="Login"/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" id="senha" name="senha" placeholder="Senha"/>
                <!-- <span><a>Esqueceu sua senha?</a></span> -->
            </div>
            <div class="form-group">
                <button type="submit" class="btnLogin">Login</button>
                <span><a target="_self" href="/cadastro">Criar novo acesso?</a></span>
            </div>
        </form>
    `
}