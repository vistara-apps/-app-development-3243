import React from 'react';
import { cn } from '../../utils/cn';

const inputVariants = {
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  },
  variant: {
    default: 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500',
    error: 'border-error-300 focus:border-error-500 focus:ring-error-500',
    success: 'border-success-300 focus:border-success-500 focus:ring-success-500'
  }
};

const Input = React.forwardRef(({
  className,
  type = 'text',
  size = 'md',
  variant = 'default',
  error,
  success,
  leftIcon,
  rightIcon,
  label,
  helperText,
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const inputVariant = error ? 'error' : success ? 'success' : variant;
  
  const baseClasses = 'w-full rounded-lg border bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50';
  const sizeClasses = inputVariants.size[size];
  const variantClasses = inputVariants.variant[inputVariant];
  
  const hasLeftIcon = leftIcon;
  const hasRightIcon = rightIcon;
  
  const paddingClasses = cn(
    sizeClasses,
    hasLeftIcon && 'pl-10',
    hasRightIcon && 'pr-10'
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-secondary-400">{leftIcon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={cn(
            baseClasses,
            variantClasses,
            paddingClasses,
            className
          )}
          disabled={disabled}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-secondary-400">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <p className={cn(
          'mt-2 text-sm',
          error ? 'text-error-600' : 'text-secondary-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

