import style from './index.module.scss';
import React, { FC, ReactNode } from 'react';

interface props {
  children?: ReactNode;
}
const Home: FC<props> = (props) => {
  console.log(props);
  return <div className={style.color}>home</div>;
};

export default Home;
