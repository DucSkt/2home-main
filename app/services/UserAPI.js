
import AWS, {
  Config,
  CognitoIdentityCredentials
} from 'aws-sdk/dist/aws-sdk-react-native';
import {
  CognitoUserSession,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken
} from 'react-native-aws-cognito-js';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'react-native-aws-cognito-js';

import { AsyncStorage, Alert } from 'react-native';
import Constants from '../common/Constants';

import I18n from '../localization';

const poolData = {
  UserPoolId: Constants.Server.userPoolId,
  ClientId: Constants.Server.clientId
};

const userPool = new CognitoUserPool(poolData);

const UserAPI = {
  login: (username, password) =>
    new Promise((resolve, reject) => {
      try {
        const authenticationData = {
          Username: username,
          Password: password
        };

        const authenticationDetails = new AuthenticationDetails(
          authenticationData
        );

        const userData = {
          Username: username,
          Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: result => {
            const idToken = result.idToken.jwtToken;
            const accessToken = result.getAccessToken();
            const idTokenString = result.getIdToken();
            const refreshToken = result.getRefreshToken();

            const session = { accessToken, idToken: idTokenString, refreshToken };

            AsyncStorage.setItem(Constants.AuthorizationKey, idToken);
            AsyncStorage.setItem(Constants.SessionKey, JSON.stringify(session));

            //AWS.config.credentials.params.Logins['cognito-idp.ap-southeast-1.compute.amazonaws.com/ap-southeast-1_fJNNUUsE4']  = idToken;

            resolve({ state: 1, idToken });
          },
          onFailure: error => {
            reject(error);
          },
          newPasswordRequired: userAttr => {
            console.log('require a confirm password');
            resolve({ state: 2, cognitoUser, userAttr })
          }
        });
      } catch (error) {
        reject(error);
      }
    }),

  changePasswordFirstTime(newPassword, cognitoUser, userAttr) {
    return new Promise((resolve, reject) => {
      try {
        cognitoUser.completeNewPasswordChallenge(newPassword, userAttr, {
          onSuccess: result => {
            // like success when login
            const idToken = result.idToken.jwtToken;
            const accessToken = result.getAccessToken();
            const idTokenString = result.getIdToken();
            const refreshToken = result.getRefreshToken();

            const session = { accessToken, idToken: idTokenString, refreshToken };

            AsyncStorage.setItem(Constants.AuthorizationKey, idToken);
            AsyncStorage.setItem(Constants.SessionKey, JSON.stringify(session));

            resolve({ state: true, idToken });
          },
          onFailure: error => {
            reject(error);
          },
        })
      } catch (error) {
        reject(error);
      }

    })
  },
  currentUser: () =>
    new Promise((resolve, reject) => {
      userPool.storage.sync((err, result) => {
        if (err) {
          reject(err);
        } else if (result === 'SUCCESS') {
          const cognitoUser = userPool.getCurrentUser();
          // Continue with steps in Use case 16
          resolve(cognitoUser);
        }
      });
    }),

  logout() {
    return new Promise((resolve, reject) => {
      userPool.storage.sync((error, result) => {
        if (error) {
          reject(error);
        } else if (result === 'SUCCESS') {
          const cognitoUser = userPool.getCurrentUser();
          if (cognitoUser) {
            console.log('logout: have user: ', cognitoUser);
            cognitoUser.signOut();
            AsyncStorage.clear();
            resolve({ success: true });
          } else {
            AsyncStorage.clear();
            reject({ error: { message: 'No current user' } });
          }
        } else {
          AsyncStorage.clear();
          reject({ error: { message: 'No current user' } });
        }
      });
    });
  },

  forgotPassword() {
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.forgotPassword({
      onSuccess(data) {
        // successfully initiated reset password request
      },
      onFailure(err) {
        alert(err.message || JSON.stringify(err));
      },
      // Optional automatic callback
      inputVerificationCode(data) {
        const verificationCode = prompt('Please input verification code ', '');
        const newPassword = prompt('Enter new password ', '');
        cognitoUser.confirmPassword(verificationCode, newPassword, {
          onSuccess() { },
          onFailure(err) { }
        });
      }
    });
  },

  changePassword: (oldPassword, newPassword) => new Promise((resolve, reject) => {
    userPool.storage.sync((err, result) => {
      if (err) {
        reject({
          success: false,
          message: err.message || JSON.stringify(err)
        });
      } else if (result === 'SUCCESS') {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
          cognitoUser.getSession((err, session) => {
            if (err) {
              reject({
                success: false,
                message: err.message || JSON.stringify(err)
              });
              return;
            }
            cognitoUser.changePassword(
              oldPassword,
              newPassword,
              (err, result) => {
                if (err) {
                  reject({
                    success: false,
                    message: err.message || JSON.stringify(err)
                  });
                  return;
                }
                console.log("change pass word success")
                resolve({ success: true, data: result || JSON.stringify(result) });
              }
            );
          });
        }
      }
    });
  }),

  updateInfoUser() {
    const attributeList = [];
    var attribute = {
      Name: 'nickname',
      Value: 'joe'
    };
    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
    attributeList.push(attribute);

    cognitoUser.updateAttributes(attributeList, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
      }
    });
  },

  refreshToken: () => {
    return new Promise(async (resolve, reject) => {
      const userToken = await AsyncStorage.getItem(Constants.AuthorizationKey);
      if (userToken) {
        console.log("old token: ", userToken)
        try {
          let sessionData = await AsyncStorage.getItem(Constants.SessionKey);
          sessionData = JSON.parse(sessionData)
          if (sessionData) {
            const AccessToken = new CognitoAccessToken({
              AccessToken: sessionData.accessToken.jwtToken
            });
            const IdToken = new CognitoIdToken({
              IdToken: sessionData.idToken.jwtToken
            });
            const RefreshToken = new CognitoRefreshToken({
              RefreshToken: sessionData.refreshToken.token
            });
            const session = new CognitoUserSession({
              IdToken,
              RefreshToken,
              AccessToken
            });
            if (!session.isValid()) {
              let currentUser = await UserAPI.currentUser();
              console.log("Current user: ", JSON.stringify(currentUser))
              await currentUser.refreshSession(RefreshToken, async (err, session) => {
                if (err) {
                  console.log("error in refresh token0 ", JSON.stringify(err))
                  reject(err)
                } else {
                  console.log("refesh token success ", JSON.stringify(err))
                  const idToken = session.idToken.jwtToken;
                  const accessToken = session.getAccessToken();
                  const idTokenString = session.getIdToken();
                  const refreshToken = session.getRefreshToken();
                  const sessionData = {
                    accessToken,
                    idToken: idTokenString,
                    refreshToken
                  };

                  await AsyncStorage.setItem(Constants.AuthorizationKey, idToken);
                  await AsyncStorage.setItem(
                    Constants.SessionKey,
                    JSON.stringify(sessionData)
                  );
                  console.log("new token: ", idToken)
                  resolve({ success: true, idToken });
                }
              });
            } else {
              resolve({ success: true, idToken:userToken });
            }
          }
            } catch (err) {
              console.log("error in refresh token ", err)
              reject(err)
            }
          } else {
            reject({ message: 'User token was error!' });
          }

        })
  }
}

export default UserAPI;
