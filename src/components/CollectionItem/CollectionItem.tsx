import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

import './CollectionItem.styles.scss';

import { Item } from '../../redux/shop/Shop.data';
import CustomButton from '../CustomButton/CustomButton';
import { addItem } from '../../redux/cart/cart.actions';
import { RootActionTypes } from '../../redux/rootReducer';

type Props = {
  item: Item;
} & ReturnType<typeof mapDispatchToProps>;

const CollectionItem = ({ item, addItem }: Props) => {
  const { name, price, imageUrl } = item;
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton inverted onClick={() => addItem(item)}>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<RootActionTypes>) => ({
  addItem: (item: Item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
