import React from 'react';
import { Input, Rate } from 'antd';
import Error from '@/statics/error.png';
import cx from './Demo.less';
import { useSDK } from '@projectproxima/plugin-sdk';

const Demo: React.FC = () => {
  const sdk = useSDK();

  const handleClick = () => {
    sdk.sendAction('openIssuePanel', { issue: 11223 }).then(() => {
      console.log('打开回调');
    });
  };

  return (
    <div>
      <h2 className={cx('title')}>CSS Modules Test</h2>
      <Input placeholder="Antd input test" />
      <Rate allowHalf defaultValue={2.5} />
      <button onClick={handleClick}>openIssuePanel</button>
      <div>
        <img src={Error} />
      </div>
    </div>
  );
};

export default Demo;
