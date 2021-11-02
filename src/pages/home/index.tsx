import style from './index.module.scss';
import React, { FC } from 'react';

const Home: FC<Record<string, never>> = (props) => {
  console.log(props);
  return <div className={`${style.color} center`}>home</div>;
};

export default Home;
