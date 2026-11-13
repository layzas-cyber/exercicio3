function validarSessao(token, tempoSegundos) {
  if (token === null || token === undefined || token === "") {
    return "TOKEN_AUSENTE";
  }

  if (typeof tempoSegundos !== "number" || isNaN(tempoSegundos) || tempoSegundos <= 0) {
    return "SESSAO_EXPIRADA";
  }

  return "SESSAO_ATIVA";
}

function testar(descricao, obtido, esperado) {
  if (obtido === esperado) {
    console.log("✅ " + descricao);
  } else {
    console.log("❌ " + descricao + " | esperado: " + esperado + " | obtido: " + obtido);
  }
}

testar("Teste 1: token null", validarSessao(null, 300), "TOKEN_AUSENTE");
testar("Teste 2: token undefined", validarSessao(undefined, 300), "TOKEN_AUSENTE");
testar("Teste 3: token vazio ''", validarSessao("", 300), "TOKEN_AUSENTE");

testar("Teste 4: tempo 0 (limite)", validarSessao("abc123", 0), "SESSAO_EXPIRADA");
testar("Teste 5: tempo negativo", validarSessao("abc123", -10), "SESSAO_EXPIRADA");
testar("Teste 6: tempo ausente (undefined)", validarSessao("abc123"), "SESSAO_EXPIRADA");

testar("Teste 7: tempo 1 segundo (limite)", validarSessao("abc123", 1), "SESSAO_ATIVA");
testar("Teste 8: tempo 3600", validarSessao("abc123", 3600), "SESSAO_ATIVA");

testar("Teste 9: sem token E expirado -> TOKEN_AUSENTE tem prioridade",
  validarSessao(null, 0), "TOKEN_AUSENTE");
