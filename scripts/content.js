// Initial setup and scraping of the info
////////////////////////////////////////////////////////////////////////////////////////////////
let demand = {
  id: '',
  name: '',
  state: '',
  currency: '',
  created: '',
  delivery: '',
  deliveryAddress: '',
  creator: '',
  client: '',
  commodities: [

  ],
  branding: [
    {
      name: '',
      placement: '',
      service: '',
      size: '',
      color: '',
    }

  ],
  calculator: {
    calcDate: '29.11.2023',
    rate: '1 CZK ≈ 0,04103 EUR',
    printer: 'MALFINI, a.s.',
    language: "čeština",
    result: [
      // {
      //   name: '',
      //   pprice: 'CZK 32.90',
      //   surcharge: '18,5167 %',
      //   customerBrandingPrice: 'EUR 1.60',
      //   customerTotalPrice: 'EUR 1.60',

      // }
    ]
  },


}

const scrapeInfo = () => {
  let idCont = document.getElementById("layout-content").firstChild.firstChild.firstChild.firstChild.firstChild;

  demand.id = idCont.children[0].firstChild.firstChild.innerText
  demand.name = idCont.firstChild.children[1].innerText;
  demand.state = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.ant-descriptions.ant-descriptions-small.ant-descriptions-bordered > div > table > tbody > tr:nth-child(1) > td > span > span").innerText;
  demand.currency = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.ant-descriptions.ant-descriptions-small.ant-descriptions-bordered > div > table > tbody > tr:nth-child(3) > td > span").innerText;
  demand.created = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.ant-descriptions.ant-descriptions-small.ant-descriptions-bordered > div > table > tbody > tr:nth-child(4) > td > span").innerText;
  demand.delivery = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.ant-descriptions.ant-descriptions-small.ant-descriptions-bordered > div > table > tbody > tr:nth-child(7) > td:nth-child(2) > span").innerText;
  demand.deliveryAddress = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.ant-descriptions.ant-descriptions-small.ant-descriptions-bordered > div > table > tbody > tr:nth-child(8) > td > span").innerText;
  demand.paymentMethod = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.ant-descriptions.ant-descriptions-small.ant-descriptions-bordered > div > table > tbody > tr:nth-child(7) > td:nth-child(4) > span").innerText
  demand.creator = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.flex.flex-col.gap-2 > div:nth-child(1) > div > div > span > div > div:nth-child(3) > div > div:nth-child(2)").innerText;
  demand.client = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.flex.flex-col.gap-2 > div:nth-child(2) > div > div > span > div > div:nth-child(3) > div > div:nth-child(1)").innerText;

}

const scrapeCommodities = () => {
  const tbody = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div:nth-child(2) > div.ant-card-body > form > div > div > div > div > div > div > table > tbody")

  // Find all rows in the table body
  var rowss = tbody.querySelectorAll('tr');
  var rows = [];
  const result = {
    mainRows: [],
  };


  for (let item of rowss) {
    rows.push(item);
  }
  const mainHeight = rows[0].offsetHeight;


  // Temporary variables to keep track of the current main row and sub row
  let currentMainRow = null;
  let currentSubRow = null;

  // Iterate over each row
  rows.forEach(rowElement => {
    if (rowElement.offsetHeight == mainHeight) {


      let bra = [];
      for (let item of rowElement.children[4].children) {
        bra.push(item.innerText);
      }

      currentMainRow = {
        id: rowElement.children[0].children[0].innerText.substring(0, 3),
        name: rowElement.children[0].children[0].innerText.substring(3,),
        pcs: rowElement.children[1].firstChild.innerText,
        bra: bra,
        nomenclatures: [],
      };
      // Add the main row to the result object
      demand.commodities.push(currentMainRow);

      // Reset the current subrow
      currentSubRow = null;
    } else if (rowElement.offsetHeight !== mainHeight && rowElement.firstChild.firstChild.firstChild.innerText == "" && rowElement.firstChild.firstChild.children[1].innerText !== "") {

      // If it's a second-level row, create a new subrow object

      let pl = rowElement.firstChild.firstChild.children[1].firstChild.firstChild.firstChild.innerText;
      var nomId = rowElement.firstChild.firstChild.children[1].firstChild.innerText.substring(1, 5).trim();
      let name = rowElement.firstChild.firstChild.children[1].firstChild.innerText.substring(6,);
      let price = rowElement.firstChild.firstChild.children[1].children[1].children[1].innerText;
      let pcs = rowElement.children[1].innerText;

      currentSubRow = {
        pl: pl,
        id: nomId,
        name: name,
        price: price,
        pcs: pcs,
        sku: [],
      };
      // Add the subrow to the current main row
      currentMainRow.nomenclatures.push(currentSubRow);

    } else if (rowElement.offsetHeight !== mainHeight && rowElement.firstChild.firstChild.firstChild.innerText == "" && rowElement.firstChild.firstChild.children[1].innerText == "") {

      // If it's a third-level row, create a new third-level row object

      let id = rowElement.firstChild.firstChild.children[2].firstChild.childNodes[0].nodeValue;
      let name = rowElement.firstChild.firstChild.children[2].firstChild.childNodes[2].nodeValue;
      let pcs = rowElement.children[1].innerText;
      let price = rowElement.children[2].firstChild.firstChild.innerText;

      const thirdLevelRow = {
        id: id,
        name: name,

        price: price,
        pcs: pcs,
      };

      // Add the third-level row to the current subrow
      currentSubRow.sku.push(thirdLevelRow);
    }
  });
}




const scrapeBranding = () => {
  const bbody = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div:nth-child(3) > div.ant-card-body > div > table > tbody");
  var browss = bbody.querySelectorAll('tr');
  var brows = [];
  var tempcolumns = [];

  // Transofrm HTML collection to normal array
  for (let item of browss) {
    brows.push(item);
  }

  // Get names and create the initial array of brandings
  for (let i = 0; i < brows[0].children.length; i++) {
    if (i > 0) {
      tempcolumns.push({
        name: brows[0].children[i].innerText,
      })
    }
  }

  // Get logo placements for each item in the array
  for (let i = 0; i < tempcolumns.length; i++) {
    tempcolumns[i].placement = brows[1].children[i + 1].innerText;
  }

  // Get service for each item in the array
  for (let i = 0; i < tempcolumns.length; i++) {
    tempcolumns[i].service = brows[2].children[i + 1].innerText;
  }
  // Get logo size for each item in the array
  for (let i = 0; i < tempcolumns.length; i++) {
    tempcolumns[i].logoSize = brows[3].children[i + 1].innerText;
  }
  // Get textile color for each item in the array
  for (let i = 0; i < tempcolumns.length; i++) {
    tempcolumns[i].textileColor = brows[4].children[i + 1].innerText;
  }

  demand.branding = tempcolumns;
  demand.language
}

const scrapeCalc = () => {
  let tempcolumns = [];

  demand.calculator.printer = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div:nth-child(4) > div.ant-card-body > div > div:nth-child(1) > div > form > div.col-span-2.flex.items-center.justify-between.px-4.py-2.border.border-inherit > div.w-full").innerText
  demand.calculator.language = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div:nth-child(4) > div.ant-card-body > div > div:nth-child(1) > div > form > div:nth-child(3)").innerText;

  const cheadd = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div:nth-child(4) > div.ant-card-body > div > div.flex-1.pt-4.relative.overflow-x-auto > form > table > thead").firstChild.children;
  const chead = [];
  const cbodyy = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div:nth-child(4) > div.ant-card-body > div > div.flex-1.pt-4.relative.overflow-x-auto > form > table > tbody").children;
  const cbody = [];

  for (let item of cheadd) {
    chead.push(item);
  }

  for (let item of cbodyy) {
    cbody.push(item);
  }

  // Add names as new objects 

  for (let i = 0; i < chead.length; i++) {
    if (i > 0) {
      demand.calculator.result.push({
        name: chead[i].firstChild.children[1].firstChild.innerText,
      })
    }
  }

  // Add printer's price to objects in results

  for (let i = 0; i < demand.calculator.result.length; i++) {
    demand.calculator.result[i].pprice = cbody[0].children[1].firstChild.innerText
  }

  // Add subcharge for branding 

  for (let i = 0; i < demand.calculator.result.length; i++) {
    demand.calculator.result[i].subcharge = cbody[3].children[i + 1].innerText
  }


  // Add customer price for branding 

  for (let i = 0; i < demand.calculator.result.length; i++) {
    demand.calculator.result[i].cprice = cbody[6].children[i + 1].innerText
  }

  // Add total price for branding 

  for (let i = 0; i < demand.calculator.result.length; i++) {
    demand.calculator.result[i].totalPrice = cbody[8].children[i + 1].innerText
  }



}




// Addition of the overlay
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const createOverlay = () => {
  const nav = document.querySelector("#root > main > nav");

  // Create a new div element
  var newDiv = document.createElement('div');

  newDiv.classList.add('extension-overlay');

  newDiv.innerHTML = `
      <div class="overlay-overview">
      <p>${demand.id}</p>
      <p>${demand.name}</p>
      <p>${demand.created}</p>
      <p>${demand.creator}</p>
      <p>${demand.client}</p>
      <p>${demand.currency}</p>
      <p>${demand.delivery}</p>
      <p>${demand.deliveryAddress}</p>
      <p>${demand.paymentMethod}</p>
      <p>${demand.state}</p>
    </div>

    <div class="overlay-table-container">
        
    </div>

    <div class="overlay-controls-container">
      <button class="save">Save changes</button>
      <button class="apply-changes">Apply changes</button>
    </div>
`

  // Attach the new div to the "nav" element
  if (nav) {
    nav.appendChild(newDiv);
  } else {
    console.error('Element with ID "navbar" not found.');
  }


  demand.commodities.forEach((commodity) => {
    let newRow = document.createElement('div');
    newRow.classList.add('commodity-row')
    newRow.innerHTML = `
    <div class="commodity-id">${commodity.id}</div>
    <div class="commodity-name">${commodity.name}</div>
    <div class="commodity-pcs">${commodity.pcs}</div>
    <div class="commodity-branding">${commodity.bra}</div>
    `
    if (commodity.nomenclatures.length > 0) {

      commodity.nomenclatures.forEach((nomenclature) => {

        let newSubrow = document.createElement('div');
        newSubrow.classList.add('commodity-subrow');
        newSubrow.innerHTML = `

          <div class="nomenclature-id">${nomenclature.id}</div>
          <div class="nomenclature-name">${nomenclature.name}</div>
          <input type="number" value="${nomenclature.pcs}" class="nomenclature-pcs"></input>
          <div class="nomenclature-price">${nomenclature.price}</div>
          <div class="nomenclature-pl">${nomenclature.pl}</div>
          
        `
        if (nomenclature.sku.length > 0) {
          nomenclature.sku.forEach((sku) => {
            let newSubSubrow = document.createElement('div');
            newSubSubrow.classList.add('commodity-subsubrow');
            newSubSubrow.innerHTML = `
                <div class="sku-id">${sku.id}</div>
                <div class="sku-name">${sku.name}</div>
                <input type="number" value="${sku.pcs}" class="sku-pcs"></input>
                <div class="sku-price">${sku.price}</div>
            `

            newSubrow.appendChild(newSubSubrow)
          })

        }
        newRow.appendChild(newSubrow)


      })
    }

    document.querySelector('.overlay-table-container').appendChild(newRow)



  })

  let inputs = document.querySelector('.extension-overlay').querySelectorAll('input')

  let nomInputs = [];



  inputs.forEach((input) => {

    if (input.classList.contains('sku-pcs')) {
      input.addEventListener('input', () => {
        let skuInputs = [];
        let grandpa = input.parentNode.parentNode;
        let grandpaSkuInputs = grandpa.querySelectorAll(".sku-pcs");

        for (let i = 0; i < grandpaSkuInputs.length; i++) {
          skuInputs.push(grandpaSkuInputs[i].value)
        }
        grandpa.children[2].value = skuInputs
          .map(function (elt) { // assure the value can be converted into an integer
            return /^\d+$/.test(elt) ? parseInt(elt) : 0;
          })
          .reduce(function (a, b) { // sum all resulting numbers
            return a + b
          })

        grandpa.children[2].dispatchEvent(new InputEvent("input"));


      });
    }

    else if (input.classList.contains('nomenclature-pcs')) {
      input.addEventListener('input', () => {
        let nomInputs = [];
        let grandpa = input.parentNode.parentNode;
        let grandpaNomInputs = grandpa.querySelectorAll(".nomenclature-pcs");


        for (let i = 0; i < grandpaNomInputs.length; i++) {
          nomInputs.push(grandpaNomInputs[i].value)
        }

        grandpa.children[2].innerText = String(nomInputs
          .map(function (elt) { // assure the value can be converted into an integer
            return /^\d+$/.test(elt) ? parseInt(elt) : 0;
          })
          .reduce(function (a, b) { // sum all resulting numbers
            return a + b
          }))



      });


    }



    // input.addEventListener('input', () => {



    //   let grandpa = input.parentNode.parentNode;
    //   let grandpaInputs = grandpa.querySelectorAll('input')
    //   let pcsArray = []

    //   for (let i = 0; i < grandpaInputs.length; i++) {

    //     pcsArray.push(grandpaInputs[i].value)

    //   }


    // grandpa.children[2].innerText = pcsArray
    //   .map(function (elt) { // assure the value can be converted into an integer
    //     return /^\d+$/.test(elt) ? parseInt(elt) : 0;
    //   })
    //   .reduce(function (a, b) { // sum all resulting numbers
    //     return a + b
    //   })
    // })



  })


}


const saveOverlay = () => {


  let table = document.querySelector('.overlay-table-container');


  let rows = [];

  for (let i = 0; i < table.children.length; i++) {

    // set demand comomdities pcs
    demand.commodities[i].pcs = table.children[i].children[2].innerText;


    for (let e = 0; e < table.children[i].children.length - 4; e++) {
      demand.commodities[i].nomenclatures[e].pcs = table.children[i].children[4].children[2].value;


      // demand.commodities[i].nomenclature[e].sku[t].pcs = 

      for (let t = 0; t < table.children[i].children[4].children.length - 5; t++) {

        demand.commodities[i].nomenclatures[e].sku[t].pcs = table.children[i].children[4].children[t + 5].children[2].value

      }
    }


  }






  console.log(demand)

}




window.addEventListener('load', function () {
  setTimeout(() => {
    scrapeInfo();
    scrapeCommodities();
    scrapeBranding();
    scrapeCalc();
    createOverlay();


    console.log(document.querySelector('.overlay-controls-container').children[0])
    document.querySelector('.overlay-controls-container').children[0].addEventListener('click', saveOverlay)
  }, 500)
})













