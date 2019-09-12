import { AsyncStorage } from 'react-native';
import Constants from '../common/Constants';


export default APIRequest;

function APIRequest(opt) {
    if (!(this instanceof APIRequest)) {
        return new APIRequest(opt);
    }

    opt = opt || {};

    if (!(opt.url)) {
        throw new Error('url is required');
    }
    if (!(opt.consumerKey)) {
        throw new Error('consumerKey is required');
    }
    if (!(opt.consumerSecret)) {
        throw new Error('consumerSecret is required');
    }

    // this.classVersion = '1.0.0';
    this._setDefaultsOptions(opt);
}

APIRequest.prototype._setDefaultsOptions = function (opt) {
    this.url = opt.url;
    this.clientId = opt.clientId;
    this.userPoolId = opt.userPoolId;
};

APIRequest.prototype._normalizeQueryString = function (url) {
    // Exit if don't find query string
    if (-1 === url.indexOf('?')) return url;

    // let query       = _url.parse(url, true).query;
    let query = url;
    let params = [];
    let queryString = '';

    for (let p in query) params.push(p);
    params.sort();

    for (let i in params) {
        if (queryString.length) queryString += '&';

        queryString += encodeURIComponent(params[i]).replace('%5B', '[').replace('%5D', ']');
        queryString += '=';
        queryString += encodeURIComponent(query[params[i]]);
    }

    return url.split('?')[0] + '?' + queryString;
};

APIRequest.prototype._getUrl = function (endpoint) {
    let url = '/' === this.url.slice(-1) ? this.url : this.url + '/';

    url = url + endpoint;

    return url;
};


APIRequest.prototype.join = function (obj, separator) {
    let arr = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key + '=' + obj[key]);
        }
    }
    return arr.join(separator);
};

APIRequest.prototype._request = async function (method, endpoint, data) {

    let url = this._getUrl(endpoint);

    let params = {
        url: url,
        method: method,
    };


    if (method == 'GET') {
        params.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      };
    } else if (method == 'POST') {

        params.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };


        params.body = JSON.stringify(data);
    }

    let idToken = await AsyncStorage.getItem(Constants.AuthorizationKey);
    if (idToken !== null && idToken !== undefined && idToken !== '') {
      params.headers = { ...params.headers, 'Authorization': 'Bearer ' + idToken}
    }

    return await fetch(params.url, params);
};

APIRequest.prototype.get = async function (endpoint, data, callback) {
    return await this._request('GET', endpoint, data, callback);
};

APIRequest.prototype.post = async function (endpoint, data, callback) {
    return await this._request('POST', endpoint, data, callback);
};

APIRequest.prototype.put = async function (endpoint, data, callback) {
    return await this._request('PUT', endpoint, data, callback);
};

APIRequest.prototype.delete = async function (endpoint, callback) {
    return await this._request('DELETE', endpoint, null, callback);
};

APIRequest.prototype.options = async function (endpoint, callback) {
    return await this._request('OPTIONS', endpoint, null, callback);
};
