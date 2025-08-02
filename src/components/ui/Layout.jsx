import React from 'react';
import { cn } from '../../utils/cn';

const Layout = ({ children, className }) => (
  <div className={cn('min-h-screen bg-secondary-50', className)}>
    {children}
  </div>
);

const Container = ({ 
  children, 
  className, 
  size = 'default',
  padding = 'default' 
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-screen-xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    default: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12'
  };

  return (
    <div className={cn(
      'mx-auto',
      sizeClasses[size],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};

const Section = ({ 
  children, 
  className,
  padding = 'default',
  background = 'transparent'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'py-8',
    default: 'py-12',
    lg: 'py-20'
  };

  const backgroundClasses = {
    transparent: '',
    white: 'bg-white',
    gray: 'bg-secondary-50',
    primary: 'bg-primary-50'
  };

  return (
    <section className={cn(
      paddingClasses[padding],
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  );
};

const Grid = ({ 
  children, 
  className,
  cols = 1,
  gap = 'default',
  responsive = true
}) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4',
    default: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  const responsiveClasses = responsive ? {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  } : {};

  return (
    <div className={cn(
      'grid',
      responsive && responsiveClasses[cols] ? responsiveClasses[cols] : colsClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

const Flex = ({ 
  children, 
  className,
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'default',
  wrap = false
}) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  return (
    <div className={cn(
      'flex',
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      gapClasses[gap],
      wrap && 'flex-wrap',
      className
    )}>
      {children}
    </div>
  );
};

export { Layout, Container, Section, Grid, Flex };
export default Layout;

