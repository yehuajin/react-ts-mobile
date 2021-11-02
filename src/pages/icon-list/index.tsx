import React, { FC } from 'react';
import css from './index.module.scss';
// const iconList = require('@assets/font/icon-fonts/icon.json');
import iconList from '@assets/font/icon-fonts/icon.json';
import base64 from 'base-64';
import utf8 from 'utf8';

interface IconObj {
  name: string;
  code: string;
  children?: IconObj[];
}
const Icon: FC<Record<string, never>> = () => {
  let icons = base64.decode(iconList.replace('data:application/json;base64,', ''));
  icons = utf8.decode(icons);
  const list: IconObj[] = JSON.parse(icons.replace(';', ''));

  return (
    <div className={css.content}>
      <div>icon列表</div>
      {list.map((item: IconObj) => {
        return (
          <div key={item.code}>
            {item.name}：
            <div className={css.item}>
              {item.children?.map((icon: IconObj) => {
                return (
                  <span key={icon.code}>
                    <i className={`xf-icon-${icon.code}`}></i>
                    <br />
                    {icon.name}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Icon;
