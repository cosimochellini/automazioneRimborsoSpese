const axios = require('axios');

let timecard = {
    /***
     * ritorna tutte le timecards dato il token
     * @param {Object} settings 
     * @param {string} token the token
     * @returns {Promise<Array<Object>} response
     */
    getTimecards: async (settings, token) => {

        let auth = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let url = timecard.generateUrlTimecards(settings);

        const response = await axios.get(url, auth);
        return response.data.value;
    },

    generateUrlTimecards = (settings) => {
        let date = new Date(), y = date.getFullYear(), m = date.getMonth();
        let firstDay = new Date(Date.UTC(y, m, 1));
        let lastDay = new Date(Date.UTC(y, m + 1, 0));

        let filter = `((Worker/Id eq ${settings.auth.id}) and (Date ge datetime'${firstDay.toISOString()}')) and (Date le datetime'${lastDay.toISOString()}')`;

        let url = `${settings.constant.baseUrlTimecard}/odata/TimecardEntries?$filter=${filter}`;

        let requestSettings = "&$orderby=Date&$expand=Activity,Order,Worker&$inlinecount=allpages";

        return url + requestSettings;
    },

    getToken = async settings => {

        const requestParams = {
            grant_type: 'password',
            username: settings.auth.username,
            password: settings.auth.password,
            client_id: 'TimecardNgApp'
        };

        const response = await axios.post(`${settings.constant.baseUrlTimecard}/token`, querystring.stringify(requestParams));
        return response.data.access_token;
    },


    filterFunction: {
        inlinea: (item, settings, clientName) => {
            return item.Activity.Code === settings.clients.find(client => client.name === clientName).activityType;
        },

        adacto: (item, settings, clientName) => {
            return item.Activity.Code === settings.clients.find(client => client.name === clientName).activityType;
        },
    }


};

module.exports = timecard;