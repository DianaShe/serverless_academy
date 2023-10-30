const fs = require('fs')
const path = require('path')

const pathToData = path.resolve(__dirname, "data.json")

const data = fs.readFileSync(pathToData, 'utf8')

const parsedData = JSON.parse(data)

const res = parsedData.reduce((result, item)=> {
    
    const dublicate = result.find((value)=> value.userName === item.user.name)
    if (dublicate) {
        const vacPeriod = {startDate: item.startDate, endDate: item.endDate}
        dublicate.vacations.push(vacPeriod)
        return result
    }
    const user = {
        userId: item.user._id,
        userName: item.user.name,
        vacations: [{startDate: item.startDate, endDate: item.endDate}]
    }
    result.push(user)
    return result
}, [])

console.log(res)
