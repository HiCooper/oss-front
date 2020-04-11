import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

export default () => {
  return (
    <div style={styles.footer}>
      <div style={styles.links}>
        <span style={styles.link}>
          帮助
        </span>
        <span style={styles.link}>
          隐私
        </span>
        <span style={{
          ...styles.link,
          marginRight: '0',
        }}
        >
          条款
        </span>
      </div>
      <div style={styles.copyright}>
        <span style={styles.text}>Berry Cooper © 2019 版权所有</span>
        <a style={styles.a}
          title="Fork me on Github"
          href="https://github.com/HiCooper/oss-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined />
        </a>
      </div>
    </div>
  );
};

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 20,
  },
  links: {
    marginBottom: 8,
  },
  link: {
    fontSize: 13,
    marginRight: 40,
  },
  copyright: {
    fontSize: 13,
    lineHeight: 1.5,
    textAlign: 'right',
  },

  text: {
    marginRight: 8,
  },
  a: {
    color: 'rgb(6,6,6)',
  },
};
