import React, { Component } from 'react'

export default class MemeGenerator extends Component {
    constructor() {
        super()
        this.state ={
          topText: '',
          buttomText: '',
          randomImg: 'http://i.imgflip.com/1bij.jpg',
          allMemeImgs: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const {memes} = (await response.json()).data;

      this.setState({allMemeImgs: memes})
    }

    handleChange(event) {
      const {name, value} = event.target;
      this.setState({ [name]: value });
    }

    handleSubmit(event) {
      event.preventDefault();

      let rendomItem = this.state.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)];
      this.setState({ randomImg: rendomItem.url });
    }

    render() {
      return (
        <div>
          <form className="meme-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="topText"
              placeholder="Top Text"
              value={this.state.topText}
              onChange={this.handleChange}/>

            <input
              type="text"
              name="buttomText"
              placeholder="Buttom Text"
              value={this.state.buttomText}
              onChange={this.handleChange}/>

            <button>Gen</button>
          </form>
          <div className="meme">
            <img src={this.state.randomImg} alt=""/>
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.buttomText}</h2>
          </div>
        </div>
      )
    }
}
