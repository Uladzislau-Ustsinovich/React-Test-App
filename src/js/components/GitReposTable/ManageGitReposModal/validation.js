const countOfFields = 6;

export const checkFields = (props) => {
    let hasProblem = false;
    Object.keys(props).forEach(key => {
        if (fields[key].validation(props[key])) {
            alert(`Please fill ${key} field correctly`);
            hasProblem = true;
            return false
        }
    });
    return !(countOfFields !== Object.keys(props).length || hasProblem);
};

const fields = {
    _id: {
        validation(variable) {
            /* ¯\_(ツ)_/¯ */
        },
    },
    id: {
        validation(variable) {
            return validateNumber(variable);
        },
    },
    name: {
        validation(variable) {
            return validateString(variable);
        }
    },
    forks: {
        validation(variable) {
            return validateNumber(variable);
        }
    },
    watchers: {
        validation(variable) {
            return (validateNumber(variable) || variable < 0);
        }
    },
    issues: {
        validation(variable) {
            return validateNumber(variable);
        }
    }
};

const validateString = variable => !variable.trim();

const validateNumber = variable => isNaN(variable) || !variable.toString().trim();
