import React, { FC } from 'react';
import RoutesConfig from '@routes/index';
import { RecoilRoot } from 'recoil';

const App: FC<Record<string, never>> = () => {
  return (
    <RecoilRoot>
      <RoutesConfig />
    </RecoilRoot>
  );
};

export default App;
