import React, { FC } from 'react';
import style from './index.module.scss';

const Loading: FC<Record<string, never>> = () => {
  return <div className={style.loading}>数据加载中...</div>;
};

export default Loading;
