import { createRoot } from 'react-dom/client';
import App from './App';
import { ProximaSDK } from '@giteeteam/plugin-sdk';
import { getMessages } from '@/lib/locale';

const rootElement = '{{appKey}}';

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let root;

async function render(props) {
  const [locale, lngDict, antdLangPackage] = getMessages(props?.sdk?.context?.env?.LOCALES || 'zh');
  const antdLang = await Promise.resolve(antdLangPackage);
  const appProps = { ...props, locale, lngDict, antdLang };
  root = createRoot(document.getElementById(rootElement));
  root.render(<App {...appProps} />);
}

if (!window.__POWERED_BY_QIANKUN__) {
  const sdk = new ProximaSDK({ sdkServer: window.parent });
  render({ sdk });
}

export async function bootstrap(): Promise<void> {
  console.info('app bootstraped');
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function mount(props): Promise<void> {
  console.info('app mount ===>', props);
  window.QiankunProps = props;
  render(props);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function unmount(): Promise<void> {
  root.unmount();
}
