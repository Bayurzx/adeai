import React, { useState } from "react";
// import fontawesome

const ButtonAI = ({ whenClicked, changecolor = false }) => {
  const [loadbutton, setLoadbutton] = useState(false);
  const [message, setMessage] = useState('');
  const [scan, setScan] = useState('')

  const confirmAddress = {
    "Bored Ape Kennel Club": "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623",
    "Bored Ape Yatch Club": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "CLONE X - X TAKASHI MURAKAMI": "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
    "Cool Cats NFT": "0x1a92f7381b9f03921564a437210bb9396471050c",
    "Cool Pets NFT": "0x86c10d10eca1fca9daf87a279abccabe0063f247",
    "CryptoPunks": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    "CyberKongz": "0x57a204aa1042f6e66dd7730813f4024114d74f37",
    "Decentraland": "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
    "Doodles": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    "Gooniez Gang Official": "0x18cd9fda7d584401d04e30bf73fb0013efe65bb0",
    "mfers": "0x79fcdef22feed20eddacbb2587640e45491b757f",
    "Mutant Ape Yacht Club": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
  }

  const switchStatements = (res) => {
    if (!res) {
      setMessage("Make sure to insert a link or an image")
    } else {
      switch (Math.round(res.probability * 100)) {
        case 100:
          setMessage(`I can say, with 💯% certainty that, that is a ${res.tagName}! `)
          break;
        case 99:
          setMessage(`If I had a dollar for everytime I have seen a ${res.tagName} NFT, I would be in phase two of my world domination plan ψ(｀∇´)ψ `)
          break;
        case 98:
          setMessage(`That's him officer! Definitely claiming to be a ${res.tagName} (✿◡‿◡)`)
          break;
        case 97:
          setMessage(`Nothing to see here, just another ${res.tagName} NFT`)
          break;
        case 96:
          setMessage(`Did you say ${res.tagName}? It's likely your are right `)
          break; // NOTE: Values below 96 have a very low accuracy probability, so i decided to have fun 
        case 95:
          setMessage(`Chances are that, it might be the ${res.tagName}. Let's ask what Siri thinks *^____^* `)
          break;
        case 94:
          setMessage(`It may or may not be the original ${res.tagName} NFT, I never said I know it all... (～￣▽￣)～ `)
          break;
        case 93:
          setMessage(`Hey Cortana!, does this look like a ${res.tagName} to you? Please Hooman, wait a sec ლ(╹◡╹ლ) `)
          break;
        case 92:
          setMessage(`I'd be surprised, if that's a ${res.tagName}. `)
          break;
        case 91:
          setMessage(`I would have asked Alexa if this was a ${res.tagName}, But I doubt she knows either ༼ つ ◕_◕ ༽つ `)
          break;
        case 90:
        case 89:
          setMessage(`Is that a ${res.tagName}? ψ(｀∇´)ψ Officer! It's this one right here!!! `)
          break;
        case 88:
        case 87:
        case 86:
          setMessage(`Is that a ${res.tagName}? So tired... I haven't slept in F.O.R.E.V.E.R!!! `)
          break;
        case 85:
        case 84:
        case 83:
        case 82:
        case 81:
        case 80:
        case 79:
          setMessage(`I could tell you that's a ${res.tagName}, but we both know it isn't (#｀-_ゝ-) `)
          break;
        case 78:
        case 77:
        case 76:
        case 75:
        case 74:
        case 73:
        case 72:
        case 71:
          setMessage(`Ummm... is that a ${res.tagName}? ....    a dinosaur?     Ahh... Where did I keep my glasses `)
          break;
        case 70:
        case 69:
        case 68:
        case 67:
        case 66:
        case 65:
        case 64:
        case 63:
        case 62:
        case 61:
        case 60:
          setMessage(`I wonder if Captcha is still asking if humans are robots, what's up with that... Oh yeah, it's definitely not a ${res.tagName}. `)
          break;
        case 59:
        case 58:
        case 57:
        case 56:
        case 55:
        case 54:
        case 53:
        case 52:
          setMessage(`There is no way that is a ${res.tagName}! `);
          break;
        case 51:
        case 50:
        case 49:
        case 48:
        case 47:
        case 46:
        case 45:
        case 44:
          setMessage(`It seems there might be something wrong with my Iteration, It doesn't have your data in it... yet... ┗( T﹏T )┛ `);
          break;
        case 43:
        case 42:
        case 41:
        case 40:
        case 39:
        case 38:
        case 37:
        case 36:
        case 35:
        case 34:
        case 33:
          setMessage(`Roses are red, violets are blue, I might have to, recreate my iteration with you ...ಥ_ಥ `);
          break;
        case 11:
        case 10:
        case 9:
        case 8:
        case 7:
        case 6:
        case 5:
        case 4:
        case 3:
        case 2:
        case 1:
          setMessage(`Was this found in Tennessee? Because my prediction probability is below 10 as seen...  o(￣┰￣*)ゞ `);
          break;
        default:
          setMessage(`Sorry, I have no idea... I think it's time I learnt new things! `)

      }

    }
  }

  const fetchData = () => {
    setLoadbutton(true);

    // lets work with our values
    whenClicked().then(res => {
      setLoadbutton(false)

      // This shows message
      switchStatements(res)
      setScan(confirmAddress[res.tagName])
      setTimeout(() => {
        setMessage("")
        setScan('')

      }, 30000)

    })

  };

  return (
    <div className="text-center" style={{ marginTop: "20px" }}>
      <button type="button" className={`btn-outline-${changecolor ? "danger" : "success"} buttonloader`} onClick={fetchData} disabled={loadbutton}>
        {loadbutton && (
          <i
            className="fa fa-refresh fa-spin"
            style={{ marginRight: "5px" }}
          />
        )}
        {loadbutton && <span>Loading Data from AI</span>}
        {!loadbutton && <span>Send NFT to AI 🤖</span>}
      </button>
      <div>
        <div className="typewriter ml-2 col-xs-12">
          <div className="section_title">
            <h4 className="section-subtitle wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">{message}</h4>

          </div>
          {scan && <a style={{color: "orange"}} href={`https://etherscan.io/address/${scan}`} target="_blank" rel="noreferrer">Click here to see original</a> }

        </div>
      </div>
    </div>
  );
}

export default ButtonAI;
