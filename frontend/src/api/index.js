export const login = (username, password) => {
    return fetch('/api/user/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password, email) => {
    return fetch('/api/user/register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password,email: email })
    }).then(res => res.json())
};
