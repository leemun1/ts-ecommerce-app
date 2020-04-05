import React from 'react';
import { connect } from 'react-redux';

import './Collection.styles.scss';

import CollectionItem from '../../components/CollectionItem/CollectionItem';
import { RootState } from '../../redux/rootReducer';
import { selectCollection } from '../../redux/shop/shop.selectors';

type Props = ReturnType<typeof mapStateToProps>;

const CollectionPage = ({ collection }: Props) => {
  if (!collection) return null;

  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: any) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
