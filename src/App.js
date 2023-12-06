import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';



function App() {
  const [supportedLanguages, setSupportedLanguages] = useState([]);
  const [toLanguage, setToLanguage] = useState("auto");
  const [fromLanguage, setFromLanguage] = useState("auto");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");


  const handleTranslate = async (e) => {
    
    e.preventDefault();
    if (!toLanguage) {
      return alert("Please select an output language");
    }
    try {
      const response = await axios.post('https://google-translate113.p.rapidapi.com/api/v1/translator/text', {
        from: fromLanguage,
        to: toLanguage,
        text: input,
      }, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key':  process.env.REACT_APP_RapidAPIKey,
          'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
        },
      });
      setOutput(response.data.trans);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      try {
        const response = await axios.get('https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages', {
          headers: {
            'X-RapidAPI-Key': 'ce68af4862mshb228e286c61a2cep104196jsn0973c1ce235c',
            'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
          },
        });
        setSupportedLanguages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSupportedLanguages();

  }, []);

  return (
    <div className="container-fluid " id='container'>
      <nav className="navbar  bg-dark-subtle">
        <div className="container-fluid">
          <a className="navbar-brand " href="#container">
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Logo"
              className=" align-text-top fs-5"
            />
            <span> Translate</span>
          </a>
        </div>
      </nav>
      {/* <div className="row mt-3">
        <div className="col-12 text-center mb-4">
          <h1 className="fw-bold">Welcome to the Live Language Translator</h1>
        </div>
      </div> */}

      <div className="row mt-4">
        <div className="col-10 col-md-6 mx-auto">
          <div className="mb-3">
            <label htmlFor="fromLanguage" className="form-label fs-3 fw-semibold">Translate from</label>
            <select className="form-select rounded-pill" id="fromLanguage" onChange={(e) => setFromLanguage(e.target.value)}>
              {supportedLanguages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.language}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="inputText" className="form-label fw-bold">Enter text to translate</label>
            <textarea className="form-control" id="inputText" rows="5" onChange={(e) => setInput(e.target.value)}></textarea>
          </div>
        </div>

        <div className="col-10 col-md-6 mx-auto">
          <div className="mb-3">
            <label htmlFor="toLanguage" className="form-label fs-3 fw-semibold">Translate to</label>
            <select className="form-select rounded-pill" id="toLanguage" onChange={(e) => setToLanguage(e.target.value)}>
              {supportedLanguages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.language}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="outputText" className="form-label fw-bold">Translated text</label>
            <textarea className="form-control" id="outputText" rows="5" readOnly value={output}></textarea>
          </div>
        </div>

        <div className="col-12 text-center mt-3">
          <button type="button " onClick={handleTranslate} className="btn btn-secondary w-50">Translate</button>
        </div>
      </div>
    </div>
  );
}

export default App;
