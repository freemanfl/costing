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
  snapshots: [
    {
      timestamp: "12122023200261",
      commodities: [
        {
          id: '',
          name: '',
          branding: '',
          nomenclatures: [
            {
              id: '',
              name: '',
              color: '',
              priceList: '',
              price: '',

            }
          ],
          pcs: 1,

        }
      ],
      branding: [
        {
          name: '',
          placement: '',
          service: '',
          size: '',
          color: '',
        },

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
      }

    }

  ]
}

function scrapeTableRows(tableBody) {

  // Find all rows in the table body
  var rows = tableBody.querySelectorAll('tr');

  // Initialize an array to store the rows
  var resultRows = [];
  const mainHeight = rows[0].offsetHeight;
  console.log(rows[0])
  console.log(mainHeight)
  // Iterate through each row
  rows.forEach(function (row) {
    // Initialize an object to store data for each row
    var rowData = {
      id: '',
      name: '',
      branding: '',
      nomenclatures: [
        {
          id: '',
          name: '',
          color: '',
          priceList: '',
          price: '',

        }
      ],
      pcs: 1,

    };

    console.log(row.children[0])


    // Iterate through each cell in the row
    // row.querySelectorAll('td').forEach(function (cell, index) {
    //   // Use the cell content as the key and the cell value as the value
    //   rowData['column_' + index] = cell.textContent.trim();
    // });

    // Add the row data to the array
    resultRows.push(rowData);
  });

  // Return the array of rows
  return resultRows;
}


const scrapeCommodities = () => {
  const tbody = document.querySelector("#layout-content > div > div.grow.p-6.overflow-auto > div:nth-child(2) > div.ant-card-body > form > div > div > div > div > div > div > table > tbody")
  console.log(scrapeTableRows(tbody));


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




  console.log('');
  console.log(demand);
}

scrapeInfo();
scrapeCommodities();




