$(document).ready(function () {
    const formatarMoeda = (valor) => {
        return "R$ " + valor.toFixed(2).replace(".", ",");
    };

    const calcularTotal = () => {
        const precoLanche = parseFloat($("#select-lanche").val()) || 0;

        let somaAdicionais = 0;
        $(".check-adicional:checked").each(function () {
            somaAdicionais += parseFloat($(this).val()) || 0;
        });

        const quantidade = parseInt($("#input-qtd").val()) || 1;
        const subtotal = (precoLanche + somaAdicionais) * quantidade;
        const taxaEntrega = parseFloat($("#select-entrega").val()) || 0;
        const totalGeral = subtotal + taxaEntrega;

        $("#valor-subtotal").text(formatarMoeda(subtotal));
        $("#valor-taxa-entrega").text(formatarMoeda(taxaEntrega));
        $("#total-geral").text(formatarMoeda(totalGeral));
    };

    $("#select-lanche, #select-entrega, .check-adicional").on("change", calcularTotal);
    $("#input-qtd").on("input change", calcularTotal);

    $("#btn-aumentar").on("click", () => {
        const quantidadeAtual = parseInt($("#input-qtd").val()) || 1;
        $("#input-qtd").val(quantidadeAtual + 1).trigger("change");
    });

    $("#btn-diminuir").on("click", () => {
        const quantidadeAtual = parseInt($("#input-qtd").val()) || 1;
        const novaQuantidade = Math.max(1, quantidadeAtual - 1);
        $("#input-qtd").val(novaQuantidade).trigger("change");
    });

    calcularTotal();
});
