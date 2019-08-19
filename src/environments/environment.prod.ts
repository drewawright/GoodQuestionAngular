export const environment = {
  production: true
};

export let APIURL = '';

switch (window.location.hostname) {
    // this is the deployed angular application
    case 'tc-musicqeary.herokuapp.com':
        // this is the full url of your deployed API
        APIURL = 'https://musicqeary.azurewebsites.net'
        break;
    default:
        // this is the local host name of your API
        APIURL = 'https://localhost:44347';
}
