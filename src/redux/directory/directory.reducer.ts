import { DirectoryActions } from './directory.actions';

type SectionItem = {
  title: string;
  imageUrl: string;
  id: number;
  linkUrl: string;
  size?: string;
};

export type DirectoryState = {
  sections: SectionItem[];
};

const INITIAL_STATE: DirectoryState = {
  sections: [
    {
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      id: 1,
      linkUrl: 'shop/hats',
    },
    {
      title: 'jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
      id: 2,
      linkUrl: 'shop/jackets',
    },
    {
      title: 'sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
      id: 3,
      linkUrl: 'shop/sneakers',
    },
    {
      title: 'womens',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
      size: 'large',
      id: 4,
      linkUrl: 'shop/womens',
    },
    {
      title: 'mens',
      imageUrl: 'https://bit.ly/39Gwk2V',
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens',
    },
  ],
};

const directoryReducer = (
  state: DirectoryState = INITIAL_STATE,
  action: DirectoryActions
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
