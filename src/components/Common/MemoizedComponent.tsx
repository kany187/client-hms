import React, { memo, ReactNode } from 'react';

interface MemoizedComponentProps {
  children: ReactNode;
  name?: string;
}

/**
 * Higher-order component for memoizing components to prevent unnecessary re-renders
 * Use this wrapper for components that receive stable props but might re-render frequently
 */
export const MemoizedComponent = memo<MemoizedComponentProps>(({ children, name }) => {
  return <>{children}</>;
});

MemoizedComponent.displayName = 'MemoizedComponent';

/**
 * HOC for creating memoized components
 */
export const withMemo = <P extends object>(
  Component: React.ComponentType<P>,
  name?: string
) => {
  const Memoized = memo(Component);
  Memoized.displayName = name || Component.displayName || Component.name;
  return Memoized;
};
