/**
 * 自定义校验方法， 输入框不能输入汉字
 * @param rule
 * @param value
 * @param callback
 */
export const checkData =  (rule, value, callback) => {
    const reg = new RegExp("[\\u4E00-\\u9FFF]+","g")
    if (value) {
        if (reg.test(value)) {
            callback(new Error('不能包含汉字!'));
        }
    }
    callback&&callback();
};