import axios from 'axios'
async function get(url, paramsObj) {
    try {
        return (await axios.get(
            url,
            {
                params: paramsObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

export {get}