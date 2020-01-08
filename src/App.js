import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [

      ]
    };
    this.player = null;
    this.pos = null;
  }


  componentDidMount() {
    console.log();
    this.getsongs('https://assets.breatheco.de/apis/sound/songs');

  }


  getsongs(url) {
    /*fetch(url)
      .then(function(resp)){
        console.log(resp);
        return resp.json()
      })
  
      .then(function(data){
        console.log (data);
      })
      .catch(function(error){
         console.log(error);
      })
*/
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          songs: data
        });

      })
      .catch(error => console.log(error));
  }

  playsong(e, i) {
    e.preventDefault();
    this.player = document.querySelectorAll('audio')[i];
    this.pos = i;
  }


  siguientesong(e) {
    e.preventDefault();
    this.player = document.querySelectorAll('audio')[this.pos+1];
    this.pos+=1;
  }

  anteriorsong(e) {
    e.preventDefault();
    this.player = document.querySelectorAll('audio')[this.pos-1];
    this.pos-=1;
  }
  

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-12 justify-content-center">
            <h1 className="text-center" >Click in your favorite music</h1>
              <div className="list-group">
                {
                  this.state.songs.length > 0 &&
                  this.state.songs.map((song, i) => {
                    return (
                      <a key={i} href="/#" onClick={(e) => this.playsong(e, i)} className="list-group-item list-group-item-action">
                        {song.name}
                        <audio ref={(t) => this.player = t}>
                          <source src={"https://assets.breatheco.de/apis/sound/" + song.url} type="audio/mp3" />
                        </audio>
                      </a>
                    )
                  })
                }
                {this.pos}
                <span>
                  <button type="button" className="btn btn-dark"onClick={(e) => this.anteriorsong(e)}><i className="far fa-arrow-alt-circle-left"></i></button>
                  <button type="button" className="btn btn-dark" onClick={() => this.player.play()}><i className="far fa-play-circle"></i></button>
                  <button type="button" className="btn btn-dark" onClick={() => this.player.pause()}><i className="far fa-pause-circle"></i></button>
                  <button type="button" className="btn btn-dark"onClick={(e) => this.siguientesong(e)}><i className="far fa-arrow-alt-circle-left"></i></button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}




export default App;
