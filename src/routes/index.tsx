// lazy和Suspense不支持服务端渲染需要使用@loadable/component
// import loadable from '@loadable/component'
import React, { FC, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, RouteProps } from 'react-router-dom';
import Loading from '@components/loading';
import NotFound from '@components/not-found';
import envConfig from '@config';
const Home = React.lazy(() => import('@pages/home'));
const IconList = React.lazy(() => import('@pages/icon-list'));

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/icon-list',
    exact: true,
    component: IconList,
  },
];

const Routes: FC = () => {
  return (
    <Router basename={envConfig.basename}>
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((route, index) => {
            const { path, exact, component } = route;
            const LazyCom = component;
            return (
              <Route
                key={index}
                path={path}
                exact={exact}
                render={(props) => {
                  // 这里也可以使用Switch
                  return <LazyCom {...props}> </LazyCom>;
                }}
              />
            );
          })}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;

// export default function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/about">
//           <About />
//         </Route>
//         <Route path="/topics">
//           <Topics />
//         </Route>
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//     </Router>
//   );
// }
