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
      {
        name: '',
        price: 'CZK 32.90',
        surcharge: '18,5167 %',
        customerBrandingPrice: 'EUR 1.60',
        customerTotalPrice: 'EUR 1.60',

      }
    ]
  },


}


const scrapeInfo = () => {

  demand.id = document.querySelector("#layout-content > div > div.ant-page-header.has-footer > div.ant-page-header-heading > div > span > div > div:nth-child(1) > span").innerText;
  demand.name = document.querySelector("#layout-content > div > div.ant-page-header.has-footer > div.ant-page-header-heading > div > span > div > div:nth-child(2)").innerText;
  demand.state = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.ant-descriptions.ant-descriptions-small.ant-descriptions-bordered > div > table > tbody > tr:nth-child(1) > td > span > span").innerText
  demand.currency = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div.ant-card.ant-card-bordered.\\!mb-8 > div > div > div.ant-descriptions.ant-descriptions-small.ant-descriptions-bordered > div > table > tbody > tr:nth-child(3) > td > span").innerText
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
      let pl = rows[i].firstChild.firstChild.children[1].firstChild.firstChild.firstChild.innerText;
      var nomId = rows[i].firstChild.firstChild.children[1].firstChild.innerText.substring(1, 5).trim();
      let name = rows[i].firstChild.firstChild.children[1].firstChild.innerText.substring(6,);
      let price = rows[i].firstChild.firstChild.children[1].children[1].children[1].innerText;


      subrows.push({
        id: nomId,
        name: name,
        pl: pl,
        price: price,
      })
    }
  }



  demand.commodities.forEach((commodity) => {
    console.log(commodity.id)
    for (var e = 0; e < subrows.length; e++) {
      if (commodity.id === subrows[e].id) {
        commodity.nomenclatures.push(subrows[e])
      }
    }
  })

  console.log(demand)

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

  demand.branding = tempcolumns


}



scrapeInfo();
scrapeCommodities();
scrapeBranding();

console.log(demand)


