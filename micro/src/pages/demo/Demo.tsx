import React from 'react';
import { Input, Rate } from 'antd';
import Error from '@/statics/error.png';
import cx from './Demo.less';
import createProximaSdk from '@projectproxima/proxima-sdk-js';

const Demo: React.FC = () => {
  const proxima = createProximaSdk();

  const itemId = '1';
  const handleClick = () => {
    proxima.execute('openItemViewScreen', itemId);
  };

  return (
    <div>
      <h2 className={cx('title')}>CSS Modules Test</h2>
      <Input placeholder="Antd input test" />
      <Rate allowHalf defaultValue={2.5} />
      <button onClick={handleClick}>openItemPanel</button>
      <div>
        <img src={Error} />
      </div>
    </div>
  );
};

export default Demo;
