interface ConsistencySquareProps {
  completed: boolean;
  started: boolean;
  isToday: boolean;
}

export default function ConsistencySquare({
  completed,
  started,
  isToday,
}: ConsistencySquareProps) {
  if (completed) {
    return <div className="bg-primary size-5 rounded-md" />;
  }

  if (started) {
    return <div className="bg-primary/20 size-5 rounded-md" />;
  }

  if (isToday) {
    return <div className="border-primary size-5 rounded-md border-[1.6px]" />;
  }

  return <div className="border-border size-5 rounded-md border" />;
}
