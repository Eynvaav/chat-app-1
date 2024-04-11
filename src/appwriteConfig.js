import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '6617fdd4df75fb9c31ce';
export const DATABASE_ID = '6617ffafe1b96d54a2ed';
export const COLLECTION_ID_MESSAGES = '6617ffc0020daea7daac';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6617fdd4df75fb9c31ce');

export const databases = new Databases(client);

export default client;