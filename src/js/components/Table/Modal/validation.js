const numberFields = ['id', 'forks', 'watchers', 'issues'];
const countOfFields = 5;

export const checkFields = (props) => {
    let count = 0;  //проверяем, чтоб на выходе было проверенно нужное количество полей
    // pr.values
    for (let key in props) {
        count++;
        if (!props[key].trim()) {
            alert("Please Fill All Required Field");
            return false;
        }
        if (numberFields.find(item => item === key))
            if (isNaN(props[key])) {
                alert(`${key} is should be a number`);
                return false;
            }
    }
    console.log(count)
    if (count-1 === countOfFields) //поле _id тоже входит в остав объекта
        return true;
    else
        alert("Please Fill All Required Field");
    return false;
};