const fetcher = {
    get: (url) => {
        return(
            fetch(url)
                .then(checkFetchStatus)
                .then(res => res.json())
        )
    },

    post: (path, body) => {
        return (
            fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(checkFetchStatus)
                .then(res => res.json())
        )
    }
};

function checkFetchStatus(response) {
    if (response.ok) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export default fetcher;