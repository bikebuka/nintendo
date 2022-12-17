// Example POST method implementation:
import {apiBaseUrl} from "../../../environment/environment";

export async function postData(url = '', data = {}) {
    // Default options are marked with *
    let baseURl=apiBaseUrl+url;
    const response = await fetch( baseURl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(response.cookies)
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function getData(url = '') {
    // Default options are marked with *
    let baseURl=apiBaseUrl+url;
    const response = await fetch( baseURl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        credentials: 'include',
        mode:'no-cors',
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
