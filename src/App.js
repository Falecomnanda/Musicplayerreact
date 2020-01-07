import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        
      ]
    };
    this.player = null;
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

  playsong(e,i){
    e.preventDefault();
    this.player=document.querySelectorAll('audio')[i]
  }

  render() {
        return(
      <>
      <div className="list-group">
        {
          this.state.songs.length > 0 &&
          this.state.songs.map((song, i) => {
            return (
              <a key={i} href="/#" onClick={(e) => this.playsong(e,i)} className="list-group-item list-group-item-action">
              {song.name}
                <audio ref={(t)=>this.player=t}>
                  <source src={"https://assets.breatheco.de/apis/sound/" + song.url} type="audio/mp3"/>
                </audio>
              </a>
            )
          })
        }
        <span>
          <button type="button" className="btn btn-dark">antes</button>
          <button type="button" className="btn btn-dark" onClick={() => this.player.play()}><i className="far fa-play-circle"></i></button>
          <button type="button" className="btn btn-dark">despues</button>
        </span>
      </div>
      </>
    );
  }
}




export default App;
