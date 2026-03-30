import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const variantClasses = {
  default: 'bg-[#f5efe6] text-[#10131d] hover:bg-white',
  outline: 'border border-white/15 bg-white/5 text-[#f5efe6] hover:bg-white/10 hover:text-white',
};

const sizeClasses = {
  default: 'h-10 px-4 py-2 text-sm',
  lg: 'h-12 px-6 text-sm',
};

export function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd98e]/35 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
