import React, {Component} from 'react'
import Perfume from './Perfume';
import './Gallery.css';




class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perfumes: [{}, {}, {}, {}],
      images: ['2787', 'bvlgari', 'Chloe', 'clinique','kk', 'miumiu'],
      user: {}
    }
  }
  handleClick(e){
    e.preventDefault();
    console.log("I clicked the image");
  }
  componentDidMount() {
  
    fetch('/api/item')
      .then(res => res.json())
      .then(perfumes => {
        console.log(perfumes);
        this.setState({perfumes: perfumes});
      })
  }

  render() {
    return (
      <div class="pgallery">
        {this.state.perfumes.map((perfume, i) => (
          <Perfume perfume={perfume} url={this.state.images[i]} onClick={this.handleClick} />
        ))}
      </div>
    )
  }


}

export default Gallery