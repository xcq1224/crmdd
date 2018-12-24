import locList from "./locList"

let data = []
function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}
locList.data.Location.CountryRegion.map((item0, index0) => {
    index0++
    data.push({
        name: item0['-Name'],
        value: index0 + '',
        parent: 0,
    })
    if(!item0.State){
        //  只有国家
        data.push({
            name: '-',
            value: index0 + '-0',
            parent: index0 + '',
        })
        data.push({
            name: '-',
            value: index0 + '-0-0',
            parent: index0 + '-0',
        })
    }else if(isArray(item0.State)){
        item0.State.map((item1, index1) => {
            data.push({
                name: item1['-Name'],
                value: index0 + '-' + index1,
                parent: index0 + '',
            })
            if(!item1.City){
                //  有州，没城市
                data.push({
                    name: '-',
                    value: index0 + '-' + index1 + '-0',
                    parent: index0 + '-' + index1,
                })
            }else if(isArray(item1.City)){
                //  有州有城市
                item1.City.map((item2, index2) => {
                    data.push({
                        name: item2['-Name'],
                        value: index0 + '-' + index1 + '-' + index2,
                        parent: index0 + '-' + index1,
                    })
                })
            }else{
                //  有州只有一个城市
                data.push({
                    name: item1.City['-Name'],
                    value: index0 + '-' + index1 + '-0',
                    parent: index0 + '-' + index1,
                })
            }
        })
    }else{
        //  没有州，有城市
        data.push({
            name: '-',
            value: index0 + '-0',
            parent: index0 + '',
        })
        item0.State.City.map((item3, index3) => {
            data.push({
                name: item3['-Name'],
                value: index0 + '-0-' + index3,
                parent: index0 + '-0',
            })
        })
    }
})
function code2area(arr){
    let area = []
    console.log(arr)
    if(arr.length){
        let num1 = arr[0] -1
        let num2 = parseInt(arr[1].split('-')[1])
        let num3 = parseInt(arr[2].split('-')[2])
        let obj = locList.data.Location.CountryRegion[num1]
        let country = obj['-Name']
        let state
        let city
        if(!obj.State){
            state = '-'
            city = '-'
        }else if(isArray(obj.State)){
            state = obj.State[num2]['-Name']
            if(!obj.State[num2].City){
                city = '-'
            }else if(isArray(obj.State[num2].City)){
                city = obj.State[num2].City[num3]['-Name']
            }else{
                city = obj.State[num2].City['-Name']
            }
        }else{
            state = '-'
            city = obj.State.City[num3]['-Name']
        }
        area.push(country)
        area.push(state)
        area.push(city)
    }
    return area
}
export default {
    data,
    code2area,
}