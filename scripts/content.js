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


	console.log(demand);
}

const scrapeCommodities = () => {
  const tbody = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div:nth-child(2) > div.ant-card-body > form > div > div > div > div > div > div > table > tbody")

  // Find all rows in the table body
  var rowss = tbody.querySelectorAll('tr');
  var rows = [];
  var subrows = [];
  for (let item of rowss) {
    rows.push(item);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Initialize an array to store the rows

  const mainHeight = rows[0].offsetHeight;


  // First loop to find main ones
  for (var i = 0; i < rows.length; i++) {

    if (rows[i].offsetHeight == mainHeight) {
      let id = rows[i].children[0].children[0].innerText.substring(0, 3);
      let name = rows[i].children[0].children[0].innerText.substring(3,);
      let pcs = rows[i].children[1].firstChild.innerText;
      let bra = [];
      for (let item of rows[i].children[4].children) {
        bra.push(item.innerText);
      }


      demand.commodities.push({
        id: id,
        name: name,
        branding: bra,
        pcs: pcs,
        nomenclatures: [],
      })

    }
  }


  // Second loop to find sub rows

  for (var i = 0; i < rows.length; i++) {

    if (rows[i].offsetHeight !== mainHeight) {


		console.log()
      let pl = rows[i].firstChild.firstChild.children[1].firstChild.firstChild.firstChild.innerText;
      var nomId = rows[i].firstChild.firstChild.children[1].firstChild.innerText.substring(1, 5).trim();
      let name = rows[i].firstChild.firstChild.children[1].firstChild.innerText.substring(6,);
      let price = rows[i].firstChild.firstChild.children[1].children[1].children[1].innerText;
      let pcs = rows[i].children[1].innerText;


      subrows.push({
        id: nomId,
        name: name,
        pl: pl,
        price: price,
        pcs: pcs,
      })
    }
  }



  demand.commodities.forEach((commodity) => {

    for (var e = 0; e < subrows.length; e++) {
      if (commodity.id === subrows[e].id) {
        commodity.nomenclatures.push(subrows[e])
      }
    }
  })


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
    <div class="commodity-branding">${commodity.branding}</div>
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

        newRow.appendChild(newSubrow)
      })
    }

    document.querySelector('.overlay-table-container').appendChild(newRow)



  })

  let inputs = document.querySelector('.extension-overlay').querySelectorAll('input')

  inputs.forEach((input) => {

    input.addEventListener('input', () => {

      let grandpa = input.parentNode.parentNode;
      let grandpaInputs = grandpa.querySelectorAll('input')
      let pcsArray = []

      for (let i = 0; i < grandpaInputs.length; i++) {

        pcsArray.push(grandpaInputs[i].value)

      }


      grandpa.children[2].innerText = pcsArray
        .map(function (elt) { // assure the value can be converted into an integer
          return /^\d+$/.test(elt) ? parseInt(elt) : 0;
        })
        .reduce(function (a, b) { // sum all resulting numbers
          return a + b
        })
    })



  })

}


const saveOverlay = () => {


  let table = document.querySelector('.overlay-table-container');
  let rows = [];

  for (let i = 0; i < table.children.length; i++) {
    demand.commodities[i].pcs = table.children[i].children[2].innerText;


    for (let e = 0; e < table.children[i].children.length - 4; e++) {
      demand.commodities[i].nomenclatures[e] = table.children[i].children[4].children[2].value
    }
  }






  console.log(demand)

}




window.addEventListener('load', function () {
  setTimeout(()=> {
	  scrapeInfo();
		scrapeCommodities();
		scrapeBranding();
		scrapeCalc();
		createOverlay();
  }, 2000)
})







console.log(document.querySelector('.overlay-controls-container').children[0])
document.querySelector('.overlay-controls-container').children[0].addEventListener('click', saveOverlay)




console.log(demand);
