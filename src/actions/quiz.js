
const toggleQuizCheckbox = (p,q='',id='') => {

    return {
        type: 'TOGGLE_CHECKBOX',
        id: `${p},${q},${id}`, // hash key for each choice (page_num,question_num,checkbox_id)
    }
}

const resetCheckboxes = () => {
    return {
        type: 'RESET_CHECKBOXES'
    }
}

module.exports = {
    toggleQuizCheckbox,
    resetCheckboxes,
}
