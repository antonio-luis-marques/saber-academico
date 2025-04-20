import React, { forwardRef } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Button, { ButtonProps } from '@mui/material/Button';

// Wrapper para IconButton com suporte a ref
const IconButtonWithRef = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => (
  <IconButton {...props} ref={ref} />
));
IconButtonWithRef.displayName = 'IconButtonWithRef';

// Wrapper para Button com suporte a ref
const ButtonWithRef = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button {...props} ref={ref} />
));
ButtonWithRef.displayName = 'ButtonWithRef';

export { IconButtonWithRef, ButtonWithRef };