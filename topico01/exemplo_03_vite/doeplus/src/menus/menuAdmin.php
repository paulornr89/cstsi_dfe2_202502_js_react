<?php
    session_start();

    if ($_SESSION['usuario_id'] != 'paulornr89@gmail.com') {
        header('Location: logout.php');
        exit;
    }
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Página do Projeto Doe+ - Objetivamos com esta solução auxiliar quaisquer instituições que realizam atividades em favor do próximo. Venha nos ajudar.">
    <meta name="keywords" content="doar, doador, instituição">
    <meta name="author" content="Paulo Rosa">

    <link rel="stylesheet" href="./css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <title>Menu - Administrador</title>
</head>
<body>
    <header>
        <a href="./menuDoador.php" class="voltar"><img src="./assets/arrowIcon.png" alt="Voltar"></a>
        <h2>Doe+</h2>
        <a class="perfil"><img src="./assets/perfil/<?php echo $_SESSION['imagem']; ?>" alt="Imagem de Perfil" onerror="this.onerror=null; this.src='./assets/perfilDefault.png'"></a>
    </header>
    <main>
        <ul class="menu">
            <li><a target="_self" href="../app/views/cadastroItens.php"><div class="icone"><img src="/projetoDoar/public/assets/default.svg" alt="Cadastrar Itens"></div><div class="texto">Cadastrar Itens</div></a></li>
            <li><a target="_self" href="../app/views/listarItens.php"><div class="icone"><img src="/projetoDoar/public/assets/default.svg" alt="Listar Itens"></div><div class="texto">Listar Itens</div></a></li>
            <li><a target="_self" href="../app/views/listarInstituicoes.php"><div class="icone"><img src="/projetoDoar/public/assets/default.svg" alt="Listar Instituições"></div><div class="texto">Listar Instituições</div></a></li>
            <li><a target="_self" href="../app/views/listarDoadores.php"><div class="icone"><img src="/projetoDoar/public/assets/default.svg" alt="Listar Doadores"></div><div class="texto">Listar Doadores</div></a></li>
        </ul>
    </main>
    <script type="text/javascript" src="../app/views/mainMenu.js"></script>
</body>
</html>