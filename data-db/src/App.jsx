import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Card from "./components/Card";
import SideBar from "./components/Sidebar";
import CatInfo from "./components/CatInfo";

// API using: CatAPI - for breeds

function App() {
  const [list, setList] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sliderVal, setSliderVal] = useState(0);
  const [textVal, setTextVal] = useState("");

  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  useEffect(() => {
    const fetchAllCatData = async () => {
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`
        );
        const json = await response.json();
        setList(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllCatData();
  }, [API_KEY]);

  const modeOrigin = () => {
    let arr = filteredList === null ? list : filteredList;
    let freqCounter = {};
    arr.forEach((element) => {
      freqCounter[element["origin"]] =
        (freqCounter[element["origin"]] || 0) + 1;
    });

    let mode;
    let maxFreq = 0;
    for (const key in freqCounter) {
      if (freqCounter[key] > maxFreq) {
        mode = key;
        maxFreq = freqCounter[key];
      }
    }
    return mode;
  };

  const avg = (feature) => {
    let arr = filteredList === null ? list : filteredList;
    let ansList = [];
    if (arr.length === 0) {
      return -1;
    }
    arr.forEach((element) => {
      ansList.push(element[feature]);
    });
    const ans =
      ansList.reduce((acc, element) => acc + element, 0) / ansList.length;
    return ans;
  };

  const handleInputChangeText = (e) => {
    e.preventDefault();
    setTextVal(e.target.value);
    // setList(
    //   list.filter((element) => {
    //     const inputValue = e.target.value;
    //     const key = "origin";
    //     return element[key].toLowerCase() === inputValue.toLowerCase();
    //   })
    // );
  };

  const handleInputChangeRange = (e) => {
    e.preventDefault();
    setSliderVal(Number(e.target.value));
    // setList(
    //   list.filter((element) => {
    //     const inputValue = e.target.value;
    //     const key = "grooming";
    //     return element[key] === inputValue;
    //   })
    // );
  };

  const handleResetSlider = () => {
    setSliderVal(0);
  }

  const handleSubmit = () => {
    let ansList = [...list];
      console.log(textVal, sliderVal, typeof textVal, typeof sliderVal);
    if (textVal !== "") {
      ansList = ansList.filter(
        (element) =>
          (element["temperament"].split(/[ ,]+/)[0]).toLowerCase() ===
          textVal.toLowerCase()
      );
    }
    if (sliderVal !== 0) {
      ansList = ansList.filter(
        (element) => element["grooming"] === sliderVal
      );
    }

    setFilteredList(ansList);
  };

  return (
    <>
      {loading === false ? (
        <div className="master">
          <SideBar />
          <div className="hero">
            <div className="cards">
              <Card desc={modeOrigin()} category="Most Common Origin" />
              <Card desc={avg("energy_level").toFixed(2)} category="Avg Energy Level" extra="out of 5" />
              <Card
                desc={avg("affection_level").toFixed(2)}
                category="Avg Affection Level"
                extra="out of 5"
              />
            </div>
            <div className="data-div">
              <div className="search-tools">
                <input
                  type="text"
                  placeholder="Enter temperament..."
                  className="search-tool"
                  value={textVal}
                  onChange={handleInputChangeText}
                />
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={sliderVal}
                  className="search-tool"
                  onChange={handleInputChangeRange}
                />
                <button className="search-tool" onClick={handleResetSlider}>
                  <p>Reset Grooming Slider</p>
                </button>
                <button className="search-tool" onClick={handleSubmit}>
                  <p>Search</p>
                </button>
              </div>
              {list && (
                <div className="main-data">
                  <CatInfo key={0} name="Name" origin="Origin" lifespan="Lifespan" description="Description"/>
                  {filteredList === null ? (
                    <>
                      <h2>{`${list.length} total cats as of 2023.`}</h2>
                      <ul>
                        {list.map((element) => (
                          <CatInfo
                            key={element["name"]}
                            name={element["name"]}
                            origin={element["origin"]}
                            lifespan={element["life_span"]}
                            description={element["description"]}
                          />
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h2>{`${filteredList.length} cat(s) matched this query.`}</h2>
                      <ul>
                        {filteredList.map((element) => (
                          <CatInfo
                            key={element["name"]}
                            name={element["name"]}
                            origin={element["origin"]}
                            lifespan={element["life_span"]}
                            description={element["description"]}
                          />
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-div">
          <h1 className="loading-text">
            Loading the Cat Logs 💨
          </h1>
        </div>
      )}
    </>
  );
}

export default App;
