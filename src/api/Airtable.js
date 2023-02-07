import axios from 'axios';
import CryptoJS from 'crypto-js';

export class Airtable {
    
    url = "https://api.airtable.com/v0/app5EVgcbBND74d5W";
    config = {
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        }
    };

    // sites table

    // create site
    createSite = (userID, siteDescription, siteGoal) => {
        return new Promise((resolve, reject) => {
            let data = {
                fields: {
                    "Owner": [userID],
                    "SiteDescription": siteDescription,
                    "SiteGoal": siteGoal
                }
            }
            axios.post(`${this.url}/Portfolios`, data, this.config)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }


    // user table

    // encrypt password
    encrypt = (string) => {
        let secretPass = process.env.REACT_APP_ENCRYPTION_KEY;
        return CryptoJS.AES.encrypt(string, secretPass).toString();
    }

    // decrypt password
    decrypt = (string) => {
        let secretPass = process.env.REACT_APP_ENCRYPTION_KEY;
        return CryptoJS.AES.decrypt(string, secretPass).toString(CryptoJS.enc.Utf8);
    }

    // login user
    loginUser(email, password) {
        return new Promise((resolve, reject) => {
            let filterByFormula = `filterByFormula=%7BEmail%7D%3D%22${encodeURIComponent(email)}%22`
            
            axios.get(`${this.url}/Users?${filterByFormula}`, this.config)
                .then(x => {
                    for (let i = 0; i < x.data.records.length; i++) {
                        let record = x.data.records[i];
                        let decrypted = this.decrypt(record.fields.Password);
                        if (decrypted === password) {
                            resolve(record);
                            return;
                        }
                    }
                    alert("Incorrect email or password");
                    reject();
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    // check if user exists
    checkIfUserExists(email) {
        return new Promise((resolve, reject) => {
            let filterByFormula = `filterByFormula=%7BEmail%7D%3D%22${encodeURIComponent(email)}%22`

            axios.get(`${this.url}/Users?${filterByFormula}`, this.config)

                .then(x => {
                    if (x.data.records.length > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    // create user if they dont already exist
    createUser(first, last, email, password, option) {

        return new Promise((resolve, reject) => {
            this.checkIfUserExists(email)
                .then(x => {
                    if (x) {
                        alert("User already exists");
                        reject();
                    } else {
                        let encrypted = this.encrypt(password);
                        let data = {
                            fields: {
                                First: first,
                                Last: last,
                                Email: email,
                                Password: encrypted,
                            }
                        }
                        axios.post(`${this.url}/Users`, data, this.config)
                            .then(x => {
                                resolve(x.data);
                            })
                            .catch(x => {
                                alert(x);
                                reject(x);
                            })
                    }
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

}