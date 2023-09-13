var chart;
var chart2;
var totalCost = 0;

/**
 * Uses handlebars.js to get the page data and load it into the correct template
 * @param {string} pageTitle - The template to load
 */
function getJsonData() {
  var pageContent = [];
  var jsonData = "data/content.json";
  fetch(jsonData)
    .then(
      response => {
        if (response.status !== 200) {
          return;
        }
        // Examine the text in the response
        response.json().then(data => {
          
          globalJson = data.pages;
                   
          getPageData();

        });
      }
    )
    .catch(err => {
    });
}

Handlebars.registerHelper("ifvalue", function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});

/**
 * Sets the page template and content to serve
 * @param {string} pageTitle - the page template to display
 */
function getPageData(pageTitle = "homePage") {
  var pageContent = globalJson[pageTitle];
 
  // Grab the template script
  var theTemplateScript = $("#"+pageTitle).html();
            
  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Pass our data to the template
  var theCompiledHtml = theTemplate(pageContent);
  // Add the compiled html to the page
  $(".content-placeholder").html(theCompiledHtml);

  if(pageTitle == "entryTemplate" || pageTitle == "enterProduct") {
    changeFunction();

    $(".external .cost").change(changeFunction);
    $(".external .quantity").change(changeFunction);

    $("#resultsModal .submit").click(function(event) {

      var data = {
        external: [],
        internal: []
      };
      $(".external .cost").each(function(cost) {
        var cost = parseInt($(this).val(), 10);
        var quantity = parseInt($('.external .quantity[data-id="' + $(this).data('id') + '"]').val(), 10);
        var reference = $('.external .reference[data-id="' + $(this).data('id') + '"]').val();
        data.external.push({
          id: $(this).data("id"),
          total: cost * quantity,
          unitCost: cost,
          quantity: quantity,
          name: "",
          reference: reference
        });
      });
      $(".internal .cost").each(function(cost) {
        var cost = parseInt($(this).val(), 10);
        var quantity = parseInt($('.internal .quantity[data-id="' + $(this).data('id') + '"]').val(), 10);
        var reference = $('.internal .reference[data-id="' + $(this).data('id') + '"]').val();
        data.internal.push({
          id: $(this).data("id"),
          total: cost * quantity,
          unitCost: cost,
          quantity: quantity,
          name: "",
          reference: reference
        });
      });

      var results = getResults();

      data.totals = results;

      data.email = $("#results-email").val();

      fetch("http://3.8.72.93:3000/api/results", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "content-type": "application/json"
        }
      }).then(function(response) {
        $(".send-results").hide();
        $(".results-success").show();
      });
    });
  }
}


/**
 * Loads a specific page template
 * @param {string} pageName - the page template to display
 */
function nextPage(pageName) {
  getPageData(pageName);
}


/**
 * Shows the correct modal and content based on target page
 * @param {string} pageTitle - title of the page (use productList or product to display product content to override the template)
 * @param {string} productCategory - used for product overview pages (eg, bloodCollection)
 * @return {string} productPage - used to display a specific product, enter product page template here.
 */
function showModal(pageTitle, productCategory = "", productPage = "") {
  var theTemplate = Handlebars.compile($("#modal-container").html());
  if (productCategory != "") {
    var products = globalJson["entryTemplate"].products;
    pageContent = [];
    var newArray = [];

    for (var i in products) {
      if (products[i].category == productCategory) {
        newArray.push(products[i]);

      }
    }
    getPageData("entryTemplate");
    pageContent["products"] = newArray;
    

  } else if (productPage != "") {

    var products = globalJson["entryTemplate"].products;
    pageContent = [];
    var newArray = [];

    for (var i in products) {
      if (products[i].name == productPage) {
        newArray.push(products[i]);

      }
    }
    getPageData("entryTemplate");
    pageContent["products"] = newArray;

  } else {
    pageContent = globalJson[pageTitle];
  }
   
 

  var myJsonObject = pageContent; //change to obj
  myJsonObject[pageTitle] = true; //add something
  myJsonObject = JSON.stringify(myJsonObject); //change back to string


  // Grab the template script
  var theCompiledHtml = theTemplate(pageContent);
 
  $("#myModal").html(theCompiledHtml);
  $("#myModal").modal("show");

}


function calculateExternalTotal() {
  totalCost = 0;
  $(".external .cost").each(function(index) {
    var quantity = $('.external .quantity[data-id="' + $(this).data('id') + '"]').val() || 0;
    var value = $(this).val() || 0;
    totalCost += parseFloat(quantity) * parseFloat(value);
  });
  return totalCost;
}

function calculateInternalTotal() {
  totalCost = 0;
  $(".internal .cost").each(function(index) {
    var quantity = $('.internal .quantity[data-id="' + $(this).data('id') + '"]').val() || 0;
    var value = $(this).val() || 0;
    totalCost += parseFloat(quantity) * parseFloat(value);
  });
  return totalCost;
}

function getQuantity(id) {
  return parseFloat($('.external .quantity[data-id="' + id + '"]').val()) || 0;
}

function getResults() {
  var externalTotal = calculateExternalTotal().toFixed(2);
  var internalTotal = calculateInternalTotal().toFixed(2);

  var difference = (externalTotal - internalTotal).toFixed(2);
  var profit = (((externalTotal - internalTotal) / externalTotal) * 100).toFixed(0);
 
  var simpleTotal = 0;
  var voiesTotal = 0;
  var sécuritéTotal = 0;
  $(".external.simple .quantity").each(function(index) {
    var quantity = $('.external.simple .quantity[data-id="' + $(this).data('id') + '"]').val() || 0;
    simpleTotal += parseFloat(quantity);
  });

  $(".external.voies .quantity").each(function(index) {
    var quantity = $('.external.voies .quantity[data-id="' + $(this).data('id') + '"]').val() || 0;
    voiesTotal += parseFloat(quantity);
  });

  $(".external.sécurité .quantity").each(function(index) {
    var quantity = $('.external.sécurité .quantity[data-id="' + $(this).data('id') + '"]').val() || 0;
    sécuritéTotal += parseFloat(quantity);
  });

  return {
    external: calculateExternalTotal().toFixed(2),
    internal: calculateInternalTotal().toFixed(2),
    difference: difference,
    profit: profit,
    simpleTotal: simpleTotal,
    voiesTotal: voiesTotal,
    sécuritéTotal: sécuritéTotal

  }
}

var changeFunction = function(event) {
  
  $(".internal .quantity").each(function(index) {
    var internalQuantity;
    switch ($(this).data("id")) {
    case 0:
      internalQuantity =  0.95 * getQuantity(4) + getQuantity(0);
      break;
    case 1:
      internalQuantity = 0.95 * getQuantity(6);
      break;
    case 2:
      internalQuantity = getQuantity(5) * 0.95;
      break;
    case 3:
      internalQuantity = getQuantity(7) * 0.95;
      break;
    case 4:
      internalQuantity =  (0.05 * getQuantity(4)) + (0.05 * getQuantity(6)) + (0.05 * getQuantity(7));
      break;
    case 5:
      internalQuantity =  0.05 * getQuantity(5);
      break;
    case 6:
      internalQuantity =  0.05 * getQuantity(6);
      break;
    case 7:
      internalQuantity =  0.05 * getQuantity(7);
      break;
      // case 8:
      //   break;
      // case 9:
      //   break;
      // case 10:
      //   break;
      // case 11:
      //   break;
    default:
      internalQuantity = 0;
      break;
    }

    $(this).val(internalQuantity);
  });
  
  var results = getResults();

  $(".external .total").text(results.external);
  $(".internal .total").text(results.internal);
  $(".external .simpleTotal, .simpleTotal").text(results.simpleTotal);
  $(".external .voiesTotal, .voiesTotal").text(results.voiesTotal);
  $(".external .sécuritéTotal, .sécuritéTotal").text(results.sécuritéTotal);
   
  $(".difference").text(results.difference);
  $(".profit").text(results.profit);

  if (parseFloat($(".external .total").text()) > 0) {
    $(".results-button").show();
  }
  if (chart) {
    chart.data.datasets[0].data = [results.external, results.internal, results.difference];
    chart.update();
  } else {
    chart = new Chart('results-chart', {
      type: "bar",
      data: {
        labels: ["External", "Internal", "Difference"],
        datasets: [{
          label: "Cost",
          data: [results.external, results.internal, results.difference],
          backgroundColor: [
            "rgb(0, 69, 146)",
            "rgb(241, 119, 6)",
            "rgb(0, 184, 175)"
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }
  if (chart2) {
    chart2.data.datasets[0].data = [results.external, results.internal, results.difference];
    chart2.update();
  } else {
    chart2 = new Chart("results-chart2", {
      type: "bar",
      data: {
        labels: ["External", "Internal", "Difference"],
        datasets: [{
          label: "Cost",
          data: [results.external, results.internal, results.difference],
          backgroundColor: [
            "rgb(0, 69, 146)",
            "rgb(241, 119, 6)",
            "rgb(0, 184, 175)"
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }
}

function showProducts() {
  $("#results-chart").hide();
  $("#product-area").show();
}

// update subtitle
function shortenSubtitle() {
  document.querySelector('.subtitle').innerHTML = "annuelle";
}

function extendSubtitle() {
  document.querySelector('.subtitle').innerHTML = "annuelle avec la solution BD";
} 

$(function () {

  getJsonData();

});
 
 
 