import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'classnames/bind';

import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

export default function FormInput({
  className,
  margin = 'normal',
  inline,
  ...props
}) {
  return (
    <FormControl
      className={cx('formInput', className, {
        formInputInline: inline,
      })}
      margin={margin}
      {...props}
    />
  );
}

FormInput.propTypes = {
  className: PropTypes.string,
  inline: PropTypes.bool,
  margin: PropTypes.oneOf('none', 'dense', 'normal'),
};
