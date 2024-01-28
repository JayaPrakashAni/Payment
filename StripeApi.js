import axios from "axios";

const createPaymentIntent = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://10.0.2.2:4002/payment-sheet', data)   // http://10.0.2.2:3000   // http://10.0.2.2:4002/payment-sheet //http://localhost:4002/payment-sheet
            .then(function (res) {
                resolve(res);
            })
            .catch(function (error) {
                console.error("Axios Error:" , error);
                reject(error);
            });
    });
};
export default createPaymentIntent;