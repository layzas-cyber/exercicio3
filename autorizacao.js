function verificarAcesso(usuario, rota) {
  if (!usuario || usuario.ativo !== true) {
    return "ACESSO_NEGADO";
  }

  if (rota === "/painel-admin") {
    if (usuario.papel === "ADMIN") {
      return "ACESSO_PERMITIDO";
    } else {
      return "ACESSO_NEGADO";
    }
  } else if (rota === "/relatorios") {
    if (usuario.papel === "ADMIN" || usuario.papel === "GERENTE") {
      return "ACESSO_PERMITIDO";
    } else {
      return "ACESSO_NEGADO";
    }
  } else {
    return "ACESSO_PERMITIDO";
  }
}

function testar(descricao, obtido, esperado) {
  if (obtido === esperado) {
    console.log("✅ " + descricao);
  } else {
    console.log("❌ " + descricao + " | esperado: " + esperado + " | obtido: " + obtido);
  }
}

const admin = { nome: "Ana", papel: "ADMIN", ativo: true };
const gerente = { nome: "Bruno", papel: "GERENTE", ativo: true };
const comum = { nome: "Carla", papel: "USUARIO", ativo: true };
const adminInativo = { nome: "Davi", papel: "ADMIN", ativo: false };

testar("Teste 1: ADMIN inativo em /painel-admin", verificarAcesso(adminInativo, "/painel-admin"), "ACESSO_NEGADO");
testar("Teste 2: ADMIN inativo em /home", verificarAcesso(adminInativo, "/home"), "ACESSO_NEGADO");

testar("Teste 3: ADMIN em /painel-admin", verificarAcesso(admin, "/painel-admin"), "ACESSO_PERMITIDO");
testar("Teste 4: GERENTE em /painel-admin", verificarAcesso(gerente, "/painel-admin"), "ACESSO_NEGADO");
testar("Teste 5: USUARIO em /painel-admin", verificarAcesso(comum, "/painel-admin"), "ACESSO_NEGADO");

testar("Teste 6: ADMIN em /relatorios", verificarAcesso(admin, "/relatorios"), "ACESSO_PERMITIDO");
testar("Teste 7: GERENTE em /relatorios", verificarAcesso(gerente, "/relatorios"), "ACESSO_PERMITIDO");
testar("Teste 8: USUARIO em /relatorios", verificarAcesso(comum, "/relatorios"), "ACESSO_NEGADO");

testar("Teste 9: USUARIO em /home", verificarAcesso(comum, "/home"), "ACESSO_PERMITIDO");

testar("Teste 10: usuário null", verificarAcesso(null, "/home"), "ACESSO_NEGADO");
testar("Teste 11: usuário sem campo 'ativo'", verificarAcesso({ nome: "Eva", papel: "ADMIN" }, "/painel-admin"), "ACESSO_NEGADO");
