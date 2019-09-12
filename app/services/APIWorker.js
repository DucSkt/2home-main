import APIRequest from './APIRequest';
import Constants from '../common/Constants';
import { log } from '../common/Logger';

const API = new APIRequest({
  url: Constants.Server.url,
  consumerKey: Constants.Server.clientId,
  consumerSecret: Constants.Server.userPoolId
});

const APIWorker = {
  /**
   * GET Dashboard
   */

  getDashboard: async locale => {
    try {
      const response = await API.get('dashboard', {
        locale
      });

      const json = await response.json();

      return json;
    } catch (err) {
      return err;
    }
  },

  /**
   * Expense APIs
   */

  getExpense: async locale => {
    try {
      const response = await API.get('expense', {
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getMonthToDateExpenseByPropertyId: async (propertyId, locale) => {
    try {
      const response = await API.get(`expense/mtd/${propertyId}`, {
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getYearToDateExpenseByPropertyId: async (propertyId, locale) => {
    try {
      const response = await API.get(`expense/ytd/${propertyId}`, {
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getExpenseByYear: async (year, locale) => {
    try {
      const response = await API.get(`expense/${year}`, {
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  // Profile
  getProfile: async locale => {
    console.log('api');
    try {
      const response = await API.get('user/profile', {
        locale
      });
      console.log('response', response);
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * Income APIs
   */

  getIncome: async locale => {
    try {
      const response = await API.get('income', { locale });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getMonthToDateIncomeByPropertyId: async (propertyId, locale) => {
    try {
      const response = await API.get(`income/mtd/${propertyId}`, { locale });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getYearToDateIncomeByPropertyId: async (propertyId, locale) => {
    try {
      const response = await API.get(`income/ytd/${propertyId}`, { locale });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getIncomeByYear: async (year, locale) => {
    try {
      const response = await API.get(`income/${year}`, { locale });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * Property APIs
   */

  getPropertiesByLocale: async locale => {
    try {
      const response = await API.get('properties', {
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getPropertieById: async (propertyId, locale) => {
    try {
      // const response = await API.get('property',{
      //   locale:locale,
      //   id: propertyId
      // });
      const link = `property/${propertyId}`;
      const response = await API.get(link, {
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * Services APIs
   */

  rejectRequestById: async requestId => {
    try {
      const response = await API.delete(`service/request/${requestId}`);
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  acceptRequestById: async requestId => {
    try {
      const response = await API.post(`service/request/${requestId}`);
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getRequestsByLocale: async locale => {
    try {
      const response = await API.get('service/requests', {
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  getHistorysByLocale: async (from, size, locale) => {
    try {
      const response = await API.get('service/request/history', {
        from,
        size,
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * Unit APIs
   */

  getFacilitiesByPropertyId: async propertyId => {
    try {
      const response = await API.get(`unit/${propertyId}`);
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * get tenant api
   */
  getTenant: async locale => {
    try {
      const response = await API.get('tenant', { locale });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * get number notification count
   */
  getNumberNotification: async () => {
    try {
      const response = await API.get('notifications/unread-count');
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * get notification Data
   */
  getNotificationsData: async (from, size, locale) => {
    try {
      const response = await API.get('notifications', {
        from,
        size,
        locale
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * Delete one notification
   */
  deleteNotification: async notificationId => {
    try {
      const path = `notifications/${notificationId}`;
      const response = await API.delete(path);
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * Post notifications (were read)
   */
  postNotification: async idArr => {
    try {
      const response = await API.post('notifications', {
        values: idArr
      });
      return await response.json();
    } catch (err) {
      return err;
    }
  },

  /**
   * Register device
   */

   registerDevice: async(uuid, deviceToken) => {
     try {
       console.log('DEVICE TOKEN = ' + deviceToken);
       const response = await API.post('user/register-device', {
         uuid,
         deviceToken,
         platform: 'ios'
       });
       let json = await response.json();
       return json;
     } catch (err) {
       return err;
     }
   },

   logout: async() => {
     try {
       const response = await API.delete('user/logout');
       return await response.json();
     } catch (err) {
       return err;
     }
   }

};

export default APIWorker;
