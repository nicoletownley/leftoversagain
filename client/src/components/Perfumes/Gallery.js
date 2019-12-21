import React, {Component} from 'react'
import Perfume from './Perfume';
import './Gallery.css';

class Gallery extends Component {
  

  deletePerfume = (id) => {
    fetch('/api/item/delete/'+ id, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(item => {
      const perfumeIndex = this.props.perfumes.findIndex(perfume => perfume._id === id);
      const perfumes = this.props.perfumes;
      perfumes.splice(perfumeIndex, 1);
      this.props.setPerfumes(perfumes);
    
    })
    
  }
 
  render() {
    return (
      <div className= "pickMe">
      <div className="pgallery">
        {this.props.perfumes.map((perfume, i) => (
          <Perfume addToCart={this.props.addToCart} perfume={perfume} url={this.state.images[i]} user={this.props.user} deletePerfume={this.deletePerfume} />
        ))}
      </div>
      </div>
    )
  }


}

export default Gallery