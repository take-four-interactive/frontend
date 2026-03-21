import { ReservationStatus, STATUS_LABELS } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusStyles: Record<ReservationStatus, string> = {
  PENDING: 'bg-secondary/20 text-secondary-container',
  CONFIRMED: 'bg-open-green/10 text-open-green',
  CANCELLED: 'bg-muted text-muted-foreground',
};

export default function StatusBadge({ status }: { status: ReservationStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full font-body text-xs font-medium tracking-wide uppercase',
      statusStyles[status]
    )}>
      {STATUS_LABELS[status]}
    </span>
  );
}
