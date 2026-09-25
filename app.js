$(document).ready(function () {
    const cupons = {
        LANCHE10: 0.10,
        LANCHE20: 0.20
    };

    let percentualCupomAplicado = 0;

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
        const desconto = subtotal * percentualCupomAplicado;
        const taxaEntrega = parseFloat($("#select-entrega").val()) || 0;
        const totalGeral = subtotal - desconto + taxaEntrega;

        $("#valor-subtotal").text(formatarMoeda(subtotal));
        $("#valor-taxa-entrega").text(formatarMoeda(taxaEntrega));
        $("#valor-desconto").text("- " + formatarMoeda(desconto));
        $("#total-geral").text(formatarMoeda(totalGeral));
    };

    $("#select-lanche, #select-entrega, .check-adicional").on("change", calcularTotal);
    $("#input-qtd").on("input change", calcularTotal);

    $("#btn-aplicar-cupom").on("click", () => {
        const codigoCupom = $("#input-cupom").val().trim().toUpperCase();
        percentualCupomAplicado = cupons[codigoCupom] || 0;

        if (codigoCupom && percentualCupomAplicado > 0) {
            $("#feedback-cupom")
                .removeClass("text-danger")
                .addClass("text-success")
                .text(`Cupom aplicado: ${percentualCupomAplicado * 100}% de desconto`);
        } else if (codigoCupom) {
            $("#feedback-cupom")
                .removeClass("text-success")
                .addClass("text-danger")
                .text("Cupom inválido");
        } else {
            $("#feedback-cupom").removeClass("text-success text-danger").text("");
        }

        calcularTotal();
    });

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
