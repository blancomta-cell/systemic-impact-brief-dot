function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Card({ className, ...props }) {
  return <div className={cn('rounded-xl border border-white/10', className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn('', className)} {...props} />;
}
