import React from 'react';
import cx from 'classnames';

import s from './Title.css';

const Title = ({ size, className, children, uppercase }) => {
  const styles = cx({
    [s.root]: true,
    [className]: typeof className === 'string',
    [s.uppercase]: uppercase
  });
  const titles = [
    { size: 'xs', element: <h5 className={styles}>{children}</h5> },
    { size: 'sm', element: <h4 className={styles}>{children}</h4> },
    { size: 'md', element: <h3 className={styles}>{children}</h3> },
    { size: 'lg', element: <h2 className={styles}>{children}</h2> },
    { size: 'xl', element: <h1 className={styles}>{children}</h1> }
  ];

  return (
    titles.find(element => element.size === size).element
  );
};

export default Title;
