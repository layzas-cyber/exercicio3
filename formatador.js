function formatarCPF(cpf) {
  if (typeof cpf !== "string") {
    return "CPF_INVALIDO";
  }

  const limpo = cpf.replace(/[.-]/g, "");

  if (limpo.length !== 11 || !/^[0-9]+$/.test(limpo)) {
    return "CPF_INVALIDO";
  }

  return limpo;
}

function testar(descricao, obtido, esperado) {
  if (obtido === esperado) {
    console.log("✅ " + descricao);
  } else {
    console.log("❌ " + descricao + " | esperado: " + esperado + " | obtido: " + obtido);
  }
}

testar("Teste 1: CPF com máscara", formatarCPF("123.456.789-00"), "12345678900");
testar("Teste 2: CPF já limpo", formatarCPF("12345678900"), "12345678900");

testar("Teste 3: 10 dígitos (curto)", formatarCPF("123.456.789-0"), "CPF_INVALIDO");
testar("Teste 4: 12 dígitos (longo)", formatarCPF("123.456.789-001"), "CPF_INVALIDO");

testar("Teste 5: letra no meio", formatarCPF("123.456.78A-00"), "CPF_INVALIDO");
testar("Teste 6: 11 caracteres com letra no fim", formatarCPF("1234567890a"), "CPF_INVALIDO");
testar("Teste 7: espaço no meio", formatarCPF("123 456 789 0"), "CPF_INVALIDO");

testar("Teste 8: string vazia", formatarCPF(""), "CPF_INVALIDO");
testar("Teste 9: null", formatarCPF(null), "CPF_INVALIDO");
testar("Teste 10: número em vez de texto", formatarCPF(12345678900), "CPF_INVALIDO");
