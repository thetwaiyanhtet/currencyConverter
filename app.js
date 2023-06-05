$(document).ready(function () {
  
  $("#currencyOne").on("change", calculate);
  $("#currencyTwo").on("change", calculate);
  $("#amountOne").keyup(calculate);
  
  $("#btn").click(function () {
    let currencyOne = $("#currencyOne option:selected").text();
    let currencyTwo = $("#currencyTwo option:selected").text();
    var temp = currencyOne;
    currencyOne = currencyTwo;
    currencyTwo = temp;
    $("#currencyOne option:selected").text(currencyOne);
    $("#currencyTwo option:selected").text(currencyTwo);
    calculate();
  })


  async function calculate() {
    let currencyOne = $("#currencyOne option:selected").text();
    let currencyTwo = $("#currencyTwo option:selected").text();
    let amountOne = $("#amountOne");
    let amountTwo = $("#amountTwo");
    await fetch(
      `https://v6.exchangerate-api.com/v6/8e022410900f3ba28cc421bd/latest/${currencyOne}`
    )
      .then((res) => res.json())
      .then((data) => {
        const rate = data.conversion_rates[currencyTwo];
        amountTwo.val(amountOne.val() * rate);
        $("#text").text(`1 ${currencyOne} = ${rate.toFixed(5)} ${currencyTwo}`);
      })
      .catch((error) => console.log(error));
  }
});

fetch("https://v6.exchangerate-api.com/v6/8e022410900f3ba28cc421bd/latest/USD")
  .then((res) => res.json())
  .then((data) => {
    for (const key in data.conversion_rates) {
      $("#currencyOne").append(`<option>${key}</option>`);
      $("#currencyTwo").append(`<option>${key}</option>`);
    }
  })
  .catch((error) => console.log(error));
