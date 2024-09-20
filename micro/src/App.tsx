import React, { useEffect, Suspense, useMemo } from 'react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import { PluginSDKContext } from '@giteeteam/plugin-sdk';

import I18n from '@/lib/i18n';

const rootElement = '{{appKey}}';

message.config({
  getContainer: () => document.getElementById(rootElement),
});

import routes from './routes';

interface QiankunContextProps {
  setGlobalState?: (data: { data: any }) => void;
  Parse?: any;
  onRefreshContext?: any;
}

export const QiankunContext = React.createContext({} as QiankunContextProps);

const GoPropsRoute = props => {
  const navigate = useNavigate();

  useEffect(() => {
    console.info('子应用接收route:', props?.route);
    // 跳转渲染指定的路由
    if (props?.route) {
      navigate(props?.route);
    }
  }, []);

  return null;
};

const App: React.FC<Record<string, any>> = props => {
  const { lngDict, locale, antdLang } = props;

  const qiankunContextValue: any = useMemo(
    () => ({
      ...props,
    }),
    [props],
  );

  return (
    <I18n lngDict={lngDict} locale={locale}>
      <PluginSDKContext.Provider value={qiankunContextValue.sdk}>
        <ConfigProvider
          prefixCls={process.env.appKey}
          getPopupContainer={() => document.getElementById(rootElement)}
          locale={antdLang?.default}
        >
          <MemoryRouter>
            <GoPropsRoute {...props} />
            <Routes>
              {routes.map(({ path, Component }) => (
                <Route
                  path={path}
                  element={
                    <Suspense fallback={null}>
                      <Component {...props} />
                    </Suspense>
                  }
                  key={path}
                />
              ))}
            </Routes>
          </MemoryRouter>
        </ConfigProvider>
      </PluginSDKContext.Provider>
    </I18n>
  );
};

export default App;
