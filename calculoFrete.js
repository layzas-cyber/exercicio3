function calcularFrete(peso, uf) {
  if (typeof peso !== "number" || isNaN(peso) || peso <= 0) {
    return -1;
  }

  let frete;
  if (typeof uf === "string" && uf.toUpperCase() === "BA") {
    frete = 10 + 2 * peso;
  } else {
    frete = 25 + 5 * peso;
  }

  if (peso > 20) {
    frete = frete + 50;
  }

  return frete;
}

function testar(descricao, obtido, esperado) {
  if (obtido === esperado) {
    console.log("✅ " + descricao);
  } else {
    console.log("❌ " + descricao + " | esperado: " + esperado + " | obtido: " + obtido);
  }
}

testar("Teste 1: peso 0 -> -1", calcularFrete(0, "BA"), -1);
testar("Teste 2: peso negativo -> -1", calcularFrete(-5, "SP"), -1);
testar("Teste 3: peso não numérico -> -1", calcularFrete("dez", "BA"), -1);

testar("Teste 4: BA, 5 kg = 10 + 10 = 20", calcularFrete(5, "BA"), 20);
testar("Teste 5: BA, 0.5 kg = 10 + 1 = 11", calcularFrete(0.5, "BA"), 11);

testar("Teste 6: SP, 5 kg = 25 + 25 = 50", calcularFrete(5, "SP"), 50);

testar("Teste 7: BA, 20 kg (limite) = 10 + 40 = 50, sem sobretaxa", calcularFrete(20, "BA"), 50);
testar("Teste 8: BA, 21 kg = 10 + 42 + 50 = 102", calcularFrete(21, "BA"), 102);
testar("Teste 9: SP, 20 kg (limite) = 25 + 100 = 125, sem sobretaxa", calcularFrete(20, "SP"), 125);
testar("Teste 10: SP, 21 kg = 25 + 105 + 50 = 180", calcularFrete(21, "SP"), 180);

testar("Teste 11: UF em minúsculo 'ba' tratada como BA", calcularFrete(5, "ba"), 20);
testar("Teste 12: UF ausente cai na regra de outros estados", calcularFrete(5), 50);
