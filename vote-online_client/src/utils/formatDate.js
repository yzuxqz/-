/**
 * 将antd中的日期格式处理为mysql中的日期格式
 * @param date
 * @returns {*}
 */
export function formatDate(date){
    let arr = date.split('T')
    let arr2 = arr[1].split('.')
    let str = arr[0].slice(1)+' '+arr2[0]
    return str
}