const axios = require('axios');

async function fetchCSV(url) {
    const response = await axios.get(url);
    return response.data;
}

function parseCSVAsMapArray(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        const entry = new Map();
        headers.forEach((header, index) => {
            entry.set(header, values[index]);
        });
        return entry;
    });
}

async function processData(url) {
    try {
        const csvData = await fetchCSV(url); // Fetch the CSV data
        const parsedData = parseCSVAsMapArray(csvData); // Parse the CSV data
        return parsedData;
    } catch (error) {
        console.error('Error processing the CSV data:', error);
        throw error;
    }
}

const fetchAssociatedProducts = (domain, token) => {
    //cf. https://github.com/HubSpot/developer-code-examples/blob/main/Blog%20Posts/2023/Hello%20Word%20-%20React%20and%20GraphQL%20Custom%20Card/Fulfillment%20Card/src/app/app.functions/fetchAssociatedShipments.js
    const query = `
    query productsByDomain($domain: String!) {
        CRM {
            company_collection(filter: {domain__eq: $domain}) {
            items {
                domain
                name
                associations {
                deal_collection__company_to_deal {
                    items {
                    associations {
                        line_item_collection__primary {
                        items {
                            name
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        }
    }
    `
    // Build body for the axios request
    const body = {
      operationName: 'productsByDomain',
      query,
      variables: { domain }
    };
    // Return the axios post response
    return axios.post(
        'https://api.hubapi.com/collector/graphql',
        JSON.stringify(body),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

exports.main = async (context = {}, sendResponse) => {
    const PRIVATE_APP_TOKEN = context.secrets.PRIVATE_APP_ACCESS_TOKEN;
    const url = "https://3967897.fs1.hubspotusercontent-na1.net/hubfs/3967897/freelancer_reserved_domains_with_header.csv"
    const data = await processData(url);
    const email = context.propertiesToSend.email;
    const matched_domains = data.filter(entry => entry.get('email') === email).map(entry => entry.get('domain'));
    const unique_domains = [...new Set(matched_domains)];
    const results = {};
    for (const domain of unique_domains) {
        const { data } = await fetchAssociatedProducts(domain, PRIVATE_APP_TOKEN);
        const products = data.data.CRM.company_collection.items.map(acc => acc.associations.deal_collection__company_to_deal.items.map(deal => deal.associations.line_item_collection__primary.items.map(product => product.name))).flat(2);
        results[domain] = [...new Set(products)]
      }
    sendResponse(results);
};