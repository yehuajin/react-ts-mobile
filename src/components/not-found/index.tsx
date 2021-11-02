import React, { FC, ReactNode } from 'react';
import style from './index.module.scss';

interface PropsObj {
  children?: ReactNode;
}
const NotFound: FC<PropsObj> = () => {
  return <div className={style.not_found}>没有该页面</div>;
};

export default NotFound;
