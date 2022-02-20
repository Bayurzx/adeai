const fxUrl = "https://adeai.netlify.app/"

export const lastNum = (str) => {
    str = str.replace(/\D+/g, '')

    return +(str[str.length-1]);
}

export const twitterShare = (item, name) => {
    return `http://twitter.com/share?text=Check out my ${item} called ${name} at&url=${fxUrl}&hashtags=NFT,NFTCommunity,AdeNFTAI`
}

export const linkedInShare = () => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${fxUrl}`
}

export const facebookShare = () => {
    return `https://www.facebook.com/sharer/sharer.php?u=${fxUrl}`
}