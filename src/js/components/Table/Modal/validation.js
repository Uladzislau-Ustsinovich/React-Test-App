
export const checkFields = ({id, name, forks, watchers, issues}) => {
    if (id in window || name in window || forks in window || watchers in window || issues in window) {
        alert("Please Fill All Required Field");
        return false
    }
    if (!id.trim() || !name.trim() || !forks.trim() || !watchers.trim() || !issues.trim()) {
        alert("Please Fill All Required Field");
        return false
    }
    if (isNaN(id) || isNaN(forks) || isNaN(watchers) || isNaN(issues)) {
        if (isNaN(id))
            alert("id is should be a number");
        if (isNaN(forks))
            alert("forks is should be a number");
        if (isNaN(watchers))
            alert("watchers is should be a number");
        if (isNaN(issues))
            alert("issues is should be a number");
        return false
    }
    return true
};