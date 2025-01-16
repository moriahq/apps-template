import appsLint from '@giteeteam/apps-lint';

const extraIgnores = ['lib/']

export default [
  ...appsLint.map(c => {
    if (c.ignores) {
      c.ignores.push(...extraIgnores);
    }
    return c;
  }),
  // 可以自定义规则
  {
    rules: {},
  },
];
