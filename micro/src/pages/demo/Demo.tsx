import React, { useCallback, useState } from 'react';
import { Input, Rate } from 'antd';
import Error from '@/statics/error.png';
import cx from './Demo.less';
import useI18n from '@/hooks/useI18n';

const Demo: React.FC = () => {
  const i18n = useI18n();
  const [count, setCount] = useState(1);
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <h2 className={cx('title')}>{i18n.t('key')}</h2>
      <Input placeholder="Antd input test" />
      <Rate allowHalf defaultValue={2.5} />
      <button onClick={handleClick}>add count</button>
      <div>count:{count}</div>
      <div>
        <img src={Error} />
      </div>
    </div>
  );
};

export default Demo;
