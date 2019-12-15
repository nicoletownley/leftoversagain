import React, {Component} from 'react'
import Perfume from './Perfume';
import './Gallery.css';




class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perfumes: [],
      images: ['2787', 'bvlgari', 'Chloe', 'clinique','kk', 'miumiu'],

    }
  }

  deletePerfume = (id) => {
    fetch('/api/item/delete/'+ id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(item => {
      const perfumeIndex = this.state.perfumes.findIndex(perfume => perfume._id === id);
      const perfumes = this.state.perfumes;
      perfumes.splice(perfumeIndex, 1);
      this.setState({perfumes: perfumes});
    })
    
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
          <Perfume perfume={perfume} url={this.state.images[i]} user={this.props.user} deletePerfume={this.deletePerfume} />
        ))}
      </div>
    )
  }


}

export default Gallery