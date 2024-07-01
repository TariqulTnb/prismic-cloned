const { client } = require('@prismicio/client');
const { writeFileSync } = require('fs');

const sourceRepoClient = client('https://repore2.cdn.prismic.io/api/v2', {
  accessToken: 'MC5ab0Q5eEJjQUFDVUF0VVg3.77-977-9elnvv70W77-9IAV377-977-9THPvv70b77-9bO-_ve-_ve-_vTcw77-9Au-_ve-_ve-_vWAKLDw'
});

const fetchDocuments = async () => {
  try {
    const response = await sourceRepoClient.query('');
    const documents = response.results;
    writeFileSync('documents.json', JSON.stringify(documents, null, 2));
    console.log('Documents have been saved to documents.json');
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};

fetchDocuments();
