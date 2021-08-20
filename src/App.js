import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



const particlesOption = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    },

    // interactivity: {
    //   detect_on: "canvas",
    //   events: {
    //     onhover: {
    //       enable: false,
    //       mode: "repulse"
    //     }
    //   }
    // }


  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();


    this.state = initialState;

  };

  // Load the user profile
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  // Testing Code
  // componentDidMount() {
  //   fetch("http://localhost:3000/")
  //     .then(response => response.json())
  //     .then(console.log);
  // }


  // Calculate the location of the face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceLocation = (box) => {
    this.setState({ box: box });
    console.log(box)
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(" https://pacific-forest-49051.herokuapp.com/imageUrl", {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://pacific-forest-49051.herokuapp.com/image", {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }

        this.displayFaceLocation(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  // "https://samples.clarifai.com/metro-north.jpg"
  render() {
    const { imageUrl, route, box, isSignedIn } = this.state;
    return (
      <div className="App" >
        <Particles className='particles' params={particlesOption} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}>
        </Navigation>

        { route === 'home' ? (
          <div>
            <Logo></Logo>
            <Rank name={this.state.user.name} entries={this.state.user.entries} ></Rank>
            <ImageLinkForm onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} ></ImageLinkForm>
            <FaceRecognition box={box} imageUrl={imageUrl}></FaceRecognition>
          </div>) : (
            route === 'signIn' ? <SignIn loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}></SignIn>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}></Register>)

        }


      </div>
    );
  }
}

export default App;
