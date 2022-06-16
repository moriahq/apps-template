import NebulaUI, { renderApp, useState, Button, Text, Tabs, TabPane } from '@nebulare/ui';

const useCount = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(val => val + 1);
  };

  return { count, increaseCount };
};

const App = () => {
  const { count, increaseCount } = useCount();

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="tab1" key="1">
        <Text>count:{count}</Text>
        <Button type="primary" onClick={increaseCount}>
          点击增加count
        </Button>
      </TabPane>
      <TabPane tab="tab2" key="2">
        tab2
      </TabPane>
    </Tabs>
  );
};

export default renderApp(<App />);
