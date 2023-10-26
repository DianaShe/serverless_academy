const axios = require("axios");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const URL = "https://api.monobank.ua/bank/currency"

const getMonoCurrency = async (value) => {
    const index = value === 'EUR' ? 0 : 1
    try {
        const res = await axios.get(URL)
        myCache.set('curr', res.data)
        
        const buy = res.data[index].rateBuy
        const sale = res.data[index].rateSell
        return {buy, sale}

    } catch (error) {
        console.log(error.message)
        if (error.message.includes('429')) {
            const data = myCache.get('curr')
            const buy = data[index].rateBuy
            const sale = data[index].rateSell
            return {buy, sale}
        }
    }
}


module.exports = getMonoCurrency
