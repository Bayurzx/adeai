import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.pinata.cloud",
})

const getHeader = {
        headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
            "content-type": "application/json",
        },
    };


const getMultipartHeader = {
        headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_Key,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_API_Secret, "content-type": "multipart/form-data",
        },
    };


// pin all sort of things
export const pinFileToIPFS = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const url = `/pinning/pinFileToIPFS`;
    return instance.post(url, formData, getMultipartHeader)
}

export const pinJSONToIPFS = (json) => {
    const url = `/pinning/pinJSONToIPFS`;
    return instance.post(url, json, getHeader)

}

export const unPin = (hash) => {
    const url = `/pinning/unpin/${hash}`;
    return instance.delete(url, getHeader);
}

// get our json from hash to locate files
export const getJSONfromHash = (hash) => {
    return axios.get(`https://ipfs.infura.io/ipfs/${hash}`);
}