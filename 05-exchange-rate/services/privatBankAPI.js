const axios = require("axios");

const URL = "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5"

const getPrivatCurrency = async (curr) => {
    try {
        const {data} = await axios.get(URL)
        
        if (curr === 'EUR') {
            const buy = data[0].buy
            const sale = data[0].sale
            return {buy, sale}
            
        }
        if (curr === 'USD') {
            const buy = data[1].buy
            const sale = data[1].sale
            return {buy, sale}
            
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {getPrivatCurrency}