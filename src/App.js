import axios from 'axios'
import './App.css';
import React, { useState } from 'react';

function App() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState(null)
  const [month, setMonth] = useState(null)


  const handleTrigger = () => {
    setLoading(true)
    console.log(year)
    if (year > 2019 || year < 1851) {
      alert("Enter a valid year")
    }
    else if (month > 12 || month < 1) {
      alert("Enter a Valid month")
    }

    else {
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=ZjSojUBcYaAxAKBWS5Tp06AGBcJzC2JT`)
        .then(e => {
          console.log(e.data.response.docs)
          setData(e.data.response.docs)
          setLoading(true)
          console.log("data is==>", data.multimedia[1])
        }).catch(err => console.log("error=>", err))
    }

  }

  return (
    <div className="body">

      <div className="container" style={{ paddingTop: 40 }}>
        <div className="row">
          <div className="col-md-4">
            <input type="number" className="input-group" onChange={(e) => { setYear(e.target.value) }} placeholder="Enter a year between 1851-2019" />
          </div>
          <div className="col-md-4">
            <input type="number" className="input-group" onChange={(e) => { setMonth(e.target.value) }} placeholder="Enter Month" />
          </div>
          <div className="col-md-4">
            <button className="btn btn-success" onClick={handleTrigger}>Find Articles</button>
          </div>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 40 }} >
        <div className="row">
          {
            loading ?
              data ?

                data.map((e) => {
                  return (
                    <>
                      {/* <div className="container"> */}
                      {/* <div className="row"> */}
                      <div className="col-md-3" style={{ maxHeight: "500px" }}>
                        <div class="card" >
                          <img class="card-img-top" src={e.multimedia.map(e => {
                            if (e.subtype === "thumbnail") {
                              return (`https://api.nytimes.com/svc/archive/v1/${year}/${month}` + e.url)
                            }
                          })} alt="Image is not available in api" />
                          <div class="card-body">
                            <h4 className="card-title">{e.headline.main}</h4>
                            <h6 class="card-text">{e.abstract}</h6>
                            <p class="card-text">{e.byline.original}</p>
                            <a href={e.web_url} class="btn btn-warning">Read Full Article</a>
                          </div>
                        </div>
                      </div>


                    </>
                  )
                })
                :
                <>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-4 text-center"><i class="fa fa-spinner fa-spin" style={{ fontSize: "300px" }}></i>
                        <br />
                    Loading your articles... Please wait</div>
                      <div className="col-md-4"></div>
                    </div>
                  </div>


                </>
              :

              null

          }

        </div>
      </div>


    </div>
  );
}

export default App;
