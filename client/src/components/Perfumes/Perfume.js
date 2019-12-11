import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

import bvlgari from '../../Images/bvlgari.jpg';
import Chloe from '../../Images/Chloe.JPG';
import clinique from '../../Images/clinique.jpg';
import kk from '../../Images/kk.jpg';
import miumiu from '../../Images/miumiu.jpg';

const Perfume = (props) => (
  <Card>
    <Image src={kk} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.perfume.name}</Card.Header>
      <Card.Meta>
        <span className='date'>Points {props.perfume.points}</span>
      </Card.Meta>
      <Card.Description>
      {props.perfume.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        {props.perfume.oz} Oz.
      </a>
    </Card.Content>
  </Card>
)

export default Perfume